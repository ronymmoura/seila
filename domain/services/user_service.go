package services

import (
	"context"

	"github.com/ronymmoura/seila/domain/models"
)

type UserService interface {
	FindByUsername(ctx context.Context, username string) (*models.User, error)
}
