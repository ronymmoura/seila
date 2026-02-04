package user_repository

import (
	"context"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
	"github.com/ronymmoura/seila/domain/models"
)

var ErrUserNotFound = fmt.Errorf("User not found.")

const query = "SELECT id, username, email FROM users WHERE username = $1"

func (r *userRepositoryPG) FindByUsername(ctx context.Context, username string) (*models.User, error) {
	row := &models.User{}
	if err := r.db.Get(row, query, username); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserNotFound
		}

		return nil, err
	}
	return row, nil
}
