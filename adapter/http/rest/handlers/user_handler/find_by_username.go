package user_handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *userHandler) Find(ctx *gin.Context) {
	username := ctx.Query("username")

	user, err := h.userService.FindByUsername(ctx, username)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": err})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}
