import { useState } from "react";
import "./App.css";
import ProjectCard from "./components/project-card";
import ProjectForm from "./components/project-form/ProjectForm";

function App() {
  const [projects, setProjects] = useState([
    {
      name: "Weather App",
      description: "A weather application built with React.",
      link: "https://weather.com",
    },
    {
      name: "Game Tracker",
      description: "Track the games I've played.",
      link: "/games",
    },
    {
      name: "Project Manager",
      description:
        "Manage the planning and development of my personal projects.",
      link: "",
    },
  ]);

  const [showProjectForm, setShowProjectForm] = useState(false);

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

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
