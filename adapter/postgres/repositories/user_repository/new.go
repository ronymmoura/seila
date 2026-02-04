package user_repository

import (
	"github.com/ronymmoura/seila/adapter/postgres"
	"github.com/ronymmoura/seila/domain/repositories"
)

type userRepositoryPG struct {
	db *postgres.DB
}

func NewUserRepositoryPG(db *postgres.DB) repositories.UserRepository {
	return &userRepositoryPG{db: db}
}
