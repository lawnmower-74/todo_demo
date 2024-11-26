package router

import (
	"os"
	"todo_app/controller"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func NewRouter(tc controller.ITaskController) *echo.Echo {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", os.Getenv("FE_URL")},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept,
			echo.HeaderAccessControlAllowHeaders, echo.HeaderXCSRFToken},
		AllowMethods:     []string{"GET", "PUT", "POST", "DELETE"},
		AllowCredentials: true,
	}))
	e.GET("/", tc.GetAllTasks)
	e.POST("/", tc.CreateTask)
	e.PUT("/:taskId", tc.UpdateTask)
	e.DELETE("/:taskId", tc.DeleteTask)
	return e
}