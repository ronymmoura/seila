package repositories

import (
	"context"

	"github.com/ronymmoura/seila/domain/models"
)

type UserRepository interface {
	FindByUsername(ctx context.Context, username string) (*models.User, error)
}
