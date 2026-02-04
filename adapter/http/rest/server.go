package rest

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ronymmoura/seila/adapter/config"
	"github.com/ronymmoura/seila/adapter/http/rest/handlers"
	"github.com/ronymmoura/seila/adapter/http/rest/handlers/auth_handler"
	"github.com/ronymmoura/seila/adapter/http/rest/handlers/user_handler"
	"github.com/ronymmoura/seila/adapter/postgres"
	"github.com/ronymmoura/seila/adapter/postgres/repositories/user_repository"
	"github.com/ronymmoura/seila/application/services/auth_service"
	"github.com/ronymmoura/seila/application/services/user_service"
)

type RestServer struct {
	Config     *config.Config
	Router     *gin.Engine
	HttpServer *http.Server
	Errors     chan error
	Port       int
}

func NewServer(config *config.Config, db *postgres.DB) *RestServer {
	router := gin.Default()

	router.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": "404 Not Found",
		})
	})

	router.GET("/healthz", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "OK")
	})

	userRepository := user_repository.NewUserRepositoryPG(db)
	userService := user_service.NewUserService(userRepository)

	authService := auth_service.NewAuthService()

	handlers.RegisterHandlers(
		router,
		user_handler.NewUserHandler(userService).Register,
		auth_handler.NewAuthHandler(authService).Register,
	)

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", config.ServerPort),
		Handler: router,
	}

	errs := make(chan error, 1)

	go func() {
		fmt.Printf("Starting server on port %d\n", config.ServerPort)
		errs <- srv.ListenAndServe()
	}()

	return &RestServer{
		Port:       config.ServerPort,
		Router:     router,
		HttpServer: srv,
		Errors:     errs,
		Config:     config,
	}
}
