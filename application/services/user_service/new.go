package user_service

import (
	"github.com/ronymmoura/seila/domain/repositories"
	"github.com/ronymmoura/seila/domain/services"
)

type userServiceImpl struct {
	userRepository repositories.UserRepository
}

func NewUserService(userRepository repositories.UserRepository) services.UserService {
	return &userServiceImpl{userRepository: userRepository}
}
