import { useState } from "react";
import "./App.css";
import ProjectCard from "./components/project-card";
import ProjectForm from "./components/project-form";
import { useEffect } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  const [showProjectForm, setShowProjectForm] = useState(false);

  const addProject = (project) => {
    fetch("api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setProjects([...projects, data]);
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });
  };

  const fetchTest = async () => {
    fetch("api/projects")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setProjects(data);
      });
  };

  useEffect(() => {
    fetchTest();
  }, []);

  return (
    <>
      <h1>ProjectHub</h1>
      <h2>My Projects</h2>
      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      {!showProjectForm ? (
        <button onClick={() => setShowProjectForm(true)}>
          Create New Project
        </button>
      ) : (
        <ProjectForm
          onSubmit={addProject}
          close={() => setShowProjectForm(false)}
        />
      )}
    </>
  );
}

export default App;
