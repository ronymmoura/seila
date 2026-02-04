package auth_handler

import (
	"github.com/gin-gonic/gin"
	"github.com/ronymmoura/seila/adapter/http/rest/handlers"
	"github.com/ronymmoura/seila/domain/services"
)

type authHandler struct {
	authService services.AuthService
}

func NewAuthHandler(authService services.AuthService) handlers.Handler {
	return &authHandler{authService: authService}
}

func (h *authHandler) Register(e *gin.Engine) {
	e.POST("/auth/login", h.Login)
}
