package handlers

import "github.com/gin-gonic/gin"

type Handler interface {
	Register(e *gin.Engine)
}

type HandlerFunc func(*gin.Engine)

func RegisterHandlers(e *gin.Engine, handlers ...HandlerFunc) {
	for _, h := range handlers {
		h(e)
	}
}
