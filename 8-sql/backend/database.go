package main

import (
	"database/sql"
	"log"
)

func openDB() *sql.DB {
	db, err := sql.Open("sqlite", "projecthub.db")
	if err != nil {
		log.Fatal(err)
	}

	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}

	const schema = `
		CREATE TABLE IF NOT EXISTS projects (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT DEFAULT '',
			link TEXT DEFAULT ''
		);
	`

	if _, err := db.Exec(schema); err != nil {
		log.Fatal(err)
	}

	return db
}
