package user_handler

import (
	"github.com/gin-gonic/gin"
	handler "github.com/ronymmoura/seila/adapter/http/rest/handlers"
	"github.com/ronymmoura/seila/domain/services"
)

type userHandler struct {
	userService services.UserService
}

func NewUserHandler(userService services.UserService) handler.Handler {
	return &userHandler{userService: userService}
}

func (h *userHandler) Register(e *gin.Engine) {
	e.GET("/user/find", h.Find)
}
