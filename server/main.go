package main

import (
	"todo_app/controller"
	"todo_app/db"
	"todo_app/repository"
	"todo_app/router"
	"todo_app/usecase"
)

func main()  {
	db := db.NewDB()
	taskRepository := repository.NewTaskRepository(db)
	taskUsecase := usecase.NewTaskUsecase(taskRepository)
	taskController := controller.NewTaskController(taskUsecase)
	e := router.NewRouter(taskController)
	e.Logger.Fatal(e.Start(":8080"))
}