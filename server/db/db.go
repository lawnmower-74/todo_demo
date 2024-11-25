package db

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewDB() *gorm.DB {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln(err)
	}
	dns := fmt.Sprintf(
		"%s:%s@tcp(db_container)/%s?charset=utf8mb4&parseTime=True&loc=Local", 
		os.Getenv("MYSQL_USER"),
		os.Getenv("MYSQL_PASSWORD"), 
		os.Getenv("MYSQL_DATABASE"),
	)
	db, err := gorm.Open(mysql.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("DB Connected")
	return db
}

func CloseDB(db *gorm.DB) {
	sqlDB, _ := db.DB()
	if err := sqlDB.Close(); err != nil {
		log.Fatalln(err)
	}
}