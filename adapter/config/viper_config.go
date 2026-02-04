package config

import (
	"fmt"

	"github.com/spf13/viper"
)

type Config struct {
	Environment string `mapstructure:"ENVIRONMENT"`
	ServerPort  int    `mapstructure:"SERVER_PORT"`

	DatabaseHost     string `mapstructure:"DATABASE_HOST"`
	DatabaseName     string `mapstructure:"DATABASE_NAME"`
	DatabaseUser     string `mapstructure:"DATABASE_USER"`
	DatabasePassword string `mapstructure:"DATABASE_PASSWORD"`
	DatabasePort     int    `mapstructure:"DATABASE_PORT"`

	DatabaseUrl string
}

func LoadConfig(path string) (config *Config, err error) {
	viper.SetConfigType("dotenv")
	viper.SetConfigFile(path)

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return nil, fmt.Errorf("error loading config: %v", err)
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		return nil, fmt.Errorf("error parsing config: %v", err)
	}

	config.DatabaseUrl = fmt.Sprintf(
		"postgres://%s:%s@%s:%d/%s?sslmode=disable",
		config.DatabaseUser,
		config.DatabasePassword,
		config.DatabaseHost,
		config.DatabasePort,
		config.DatabaseName,
	)

	return
}
