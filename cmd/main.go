package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ronymmoura/seila/adapter/config"
	"github.com/ronymmoura/seila/adapter/http/rest"
	"github.com/ronymmoura/seila/adapter/postgres"
)

func main() {
	config, err := config.LoadConfig("./.env")
	if err != nil {
		fmt.Fprintf(os.Stderr, "error loading config: %v\n", err)
		os.Exit(1)
	}

	db, err := postgres.Connect(config.DatabaseUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	server := rest.NewServer(config, db)

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	select {
	case <-stop:
		fmt.Println("Shutting down...")
		os.Exit(0)
	case err := <-server.Errors:
		fmt.Printf("failed to start server: %s", err.Error())
		os.Exit(1)
	}

	shutdown, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	if err := server.HttpServer.Shutdown(shutdown); err != nil {
		fmt.Printf("failed to shutdown server: %s", err.Error())
		os.Exit(1)
	}
}
