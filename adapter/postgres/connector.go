package postgres

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/ronymmoura/seila/adapter/config"
)

type DB struct {
	*sqlx.DB
}

func Connect(databaseUrl string) (*DB, error) {
	db, err := sqlx.Connect("postgres", databaseUrl)
	if err != nil {
		return nil, err
	}

	return &DB{db}, nil
}

func ConnectWithConfigPath(configPath string) (*DB, error) {
	config, err := config.LoadConfig(configPath)
	if err != nil {
		return nil, err
	}

	return Connect(config.DatabaseUrl)
}
