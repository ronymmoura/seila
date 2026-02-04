package user_service

import (
	"context"

	"github.com/ronymmoura/seila/domain/models"
)

func (s *userServiceImpl) FindByUsername(ctx context.Context, username string) (*models.User, error) {
	user, err := s.userRepository.FindByUsername(ctx, username)
	if err != nil {
		return nil, err
	}
	return user, nil
}
