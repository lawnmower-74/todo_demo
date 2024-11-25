package main

import (
	"fmt"
	"todo_app/db"
	"todo_app/model"
)

func main() {
	dbConn := db.NewDB()
	defer fmt.Println("Successfully Migrated")
	defer db.CloseDB(dbConn)
	dbConn.AutoMigrate(&model.Task{})
}