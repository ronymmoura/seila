package user_service_test

import (
	"context"
	"testing"

	"github.com/ronymmoura/seila/adapter/postgres/repositories/user_repository"
	"github.com/stretchr/testify/require"
)

func TestUserService_FindByUsername(t *testing.T) {
	user, err := userService.FindByUsername(context.Background(), "ronymmoura")
	require.NoError(t, err)
	require.NotEmpty(t, user)
	require.Equal(t, "ronymmoura", user.Username)
	require.Equal(t, "ronymmoura@gmail.com", user.Email)
}

func TestUserService_FindByUsernameNotFound(t *testing.T) {
	user, err := userService.FindByUsername(context.Background(), "a")
	require.Error(t, err)
	require.Empty(t, user)
	require.ErrorIs(t, err, user_repository.ErrUserNotFound)
}
