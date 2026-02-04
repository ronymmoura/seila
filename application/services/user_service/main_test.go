package user_service_test

import (
	"os"
	"testing"

	"github.com/ronymmoura/seila/adapter/postgres"
	"github.com/ronymmoura/seila/adapter/postgres/repositories/user_repository"
	"github.com/ronymmoura/seila/application/services/user_service"
	"github.com/ronymmoura/seila/domain/services"
)

var userService services.UserService

func TestMain(m *testing.M) {
	conn, _ := postgres.ConnectWithConfigPath("../../../.env.test")
	userRepository := user_repository.NewUserRepositoryPG(conn)
	userService = user_service.NewUserService(userRepository)
	os.Exit(m.Run())
}
