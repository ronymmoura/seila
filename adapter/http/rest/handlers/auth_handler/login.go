package auth_handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// @BasePath /api/v1

// Auth godoc
// @Summary Aute
// @Schemes
// @Description Authenticate
// @Tags auth
// @Accept json
// @Produce json
// @Success 200 {string} Login
// @Router /auth/login [POST]
func (h *authHandler) Login(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, "OK")
}
