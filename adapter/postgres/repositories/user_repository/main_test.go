package user_repository_test

import (
	"os"
	"testing"

	"github.com/ronymmoura/seila/adapter/postgres"
	"github.com/ronymmoura/seila/adapter/postgres/repositories/user_repository"
	"github.com/ronymmoura/seila/domain/repositories"
)

var repository repositories.UserRepository

func TestMain(m *testing.M) {
	conn, _ := postgres.ConnectWithConfigPath("../../../../.env.test")
	repository = user_repository.NewUserRepositoryPG(conn)
	os.Exit(m.Run())
}
