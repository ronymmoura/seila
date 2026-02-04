package auth_service

import "github.com/ronymmoura/seila/domain/services"

type authServiceImpl struct {
}

func NewAuthService() services.AuthService {
	return &authServiceImpl{}
}
