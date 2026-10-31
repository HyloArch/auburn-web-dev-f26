package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	_ "modernc.org/sqlite"
)

type Project struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Link        string `json:"link"`
}

type Env struct {
	db *sql.DB
}

func (e *Env) getProjects(w http.ResponseWriter, _ *http.Request) {
	rows, err := e.db.Query(
		"SELECT id, name, description, link FROM projects;",
	)
	if err != nil {
		http.Error(w, "Could not fetch projects", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	projects := []Project{}

	for rows.Next() {
		var project Project

		if err := rows.Scan(
			&project.ID,
			&project.Name,
			&project.Description,
			&project.Link,
		); err != nil {
			http.Error(w, "Could not read projects", http.StatusInternalServerError)
			return
		}

		projects = append(projects, project)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Could not read projects", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(projects); err != nil {
		log.Printf("encoding projects: %v", err)
	}
}

func (e *Env) getProjectsByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Project IDs must be an integer", http.StatusBadRequest)
		return
	}

	rows, err := e.db.Query(
		"SELECT id, name, description, link FROM projects WHERE id = (?);",
		id,
	)
	if err != nil {
		http.Error(w, "Could not fetch project", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var project Project

	if rows.Next() {
		if err := rows.Scan(
			&project.ID,
			&project.Name,
			&project.Description,
			&project.Link,
		); err != nil {
			http.Error(w, "Could not read project", http.StatusInternalServerError)
			return
		}
	} else {
		if err := rows.Err(); err != nil {
			http.Error(w, "Could not read project", http.StatusInternalServerError)
		} else {
			http.Error(w, "Project not found", http.StatusNotFound)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(project); err != nil {
		log.Printf("encoding projects: %v", err)
	}
}

func (e *Env) postProjects(w http.ResponseWriter, r *http.Request) {
	var project Project
	if err := json.NewDecoder(r.Body).Decode(&project); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(project.Name) == "" {
		http.Error(w, "Project Name must be provided", http.StatusBadRequest)
		return
	}

	result, err := e.db.Exec(
		"INSERT INTO projects (name, description, link) VALUES (?, ?, ?);",
		project.Name,
		project.Description,
		project.Link,
	)
	if err != nil {
		http.Error(w, "Could not create project", http.StatusInternalServerError)
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		http.Error(w, "Could not retrieve project ID", http.StatusInternalServerError)
		return
	}

	project.ID = int(id)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(project); err != nil {
		log.Printf("encoding projects: %v", err)
	}
}

func (e *Env) deleteProjectsByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Project IDs must be an integer", http.StatusBadRequest)
		return
	}

	_, err = e.db.Exec(
		"DELETE FROM projects WHERE id = (?);",
		id,
	)
	if err != nil {
		http.Error(w, "Could not delete project", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func main() {
	db := openDB()
	defer db.Close()

	env := &Env{db: db}

	http.HandleFunc("GET /projects", env.getProjects)
	http.HandleFunc("POST /projects", env.postProjects)
	http.HandleFunc("GET /projects/{id}", env.getProjectsByID)
	http.HandleFunc("DELETE /projects/{id}", env.deleteProjectsByID)

	log.Printf("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
