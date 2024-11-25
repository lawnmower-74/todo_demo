package router

import (
	"todo_app/controller"

	"github.com/labstack/echo"
)

func NewRouter(tc controller.ITaskController) *echo.Echo {
	e := echo.New()
	e.GET("/", tc.GetAllTasks)
	e.POST("/", tc.CreateTask)
	e.PUT("/:taskId", tc.UpdateTask)
	e.DELETE("/:taskId", tc.DeleteTask)
	return e
}