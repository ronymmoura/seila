include .env

MAKEFILE_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
DB_URL := postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?sslmode=disable

dev: 
	docker-compose up -d app-dev

setup: create-db migrate-up

test:
	docker exec -it seila-app-dev-1 go test ./...

test-coverage: |
	docker exec -it seila-app-dev-1 go test -cover -coverprofile=c.out ./...
	docker exec -it seila-app-dev-1 go tool cover -html=c.out -o coverage.html

server:
	go run ./main.go

# DB
reset-db: drop-db setup seed

seed:
	docker exec -it seila-app-1 go run ./cmd/seed/seed.go

create-db:
	docker exec -it seila-postgres-1 createdb --username=${DATABASE_USER} --owner=${DATABASE_USER} ${DATABASE_NAME}

drop-db:
	docker exec -it postgres dropdb ${DATABASE_NAME}

migration-new:
	docker run --rm -v $(MAKEFILE_DIR):/src -w /src --network host migrate/migrate create -ext sql -dir=adapter/postgres/migrations -seq $(name)

migrate-up:
	docker run --rm -v $(MAKEFILE_DIR):/src -w /src --network host migrate/migrate -path=adapter/postgres/migrations/ -database="$(DB_URL)" up

migrate-up1:
	docker run --rm -v $(MAKEFILE_DIR):/src -w /src --network host migrate/migrate -path=adapter/postgres/migrations/ -database="$(DB_URL)" up 1
	
migrate-down:
	docker run --rm -v $(MAKEFILE_DIR):/src -w /src --network host migrate/migrate -path=adapter/postgres/migrations/ -database="$(DB_URL)" down -all
	
migrate-down1:
	docker run --rm -v $(MAKEFILE_DIR):/src -w /src --network host migrate/migrate -path=adapter/postgres/migrations/ -database="$(DB_URL)" down 1

# TOOLS
ngrok:
	ngrok http http://localhost:3000

.PHONY:
	reset-db create-db drop-db migration-new migrate-up migrate-down migrate-up1 migrate-down1 
	ngrok
