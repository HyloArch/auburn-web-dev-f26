package main

import (
	"encoding/json"
	"log"
	"net/http"
	"slices"
	"strconv"
)

type Project struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Link        string `json:"link"`
}

var projects = []Project{
	{ID: 1, Name: "Weather App", Description: "A weather application built with React.", Link: "https://weather.com"},
	{ID: 2, Name: "Game Tracker", Description: "Track the games I've played.", Link: "/games"},
	{ID: 3, Name: "Project Manager", Description: "Manage the planning and development of my personal projects.", Link: ""},
}
var nextID = 4

func getProjects(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(projects); err != nil {
		log.Printf("encoding projects: %v", err)
	}
}

func getProjectsByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Project IDs must be an integer", http.StatusBadRequest)
	}

	index := slices.IndexFunc(projects, func(p Project) bool { return p.ID == id })
	if index == -1 {
		http.Error(w, "Project ID not found", http.StatusNotFound)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(projects[index]); err != nil {
		log.Printf("encoding project: %v", err)
	}
}

func postProjects(w http.ResponseWriter, r *http.Request) {
	var project Project
	if err := json.NewDecoder(r.Body).Decode(&project); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if project.Name == "" {
		http.Error(w, "Project Name must be provided", http.StatusBadRequest)
		return
	}

	project.ID = nextID
	nextID++

	projects = append(projects, project)

	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(project); err != nil {
		log.Printf("encoding projects: %v", err)
	}
}

func main() {
	http.HandleFunc("GET /projects", getProjects)
	http.HandleFunc("POST /projects", postProjects)
	http.HandleFunc("GET /projects/{id}", getProjectsByID)

	log.Printf("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
