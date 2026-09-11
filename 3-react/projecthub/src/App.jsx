import "./App.css";
import ProjectCard from "./components/project-card";

function App() {
  const projects = [
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
  ];

  return (
    <>
      <h1>ProjectHub</h1>
      <h2>My Projects</h2>
      <div className="projects">
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
      <button>Create New Project</button>
    </>
  );
}

export default App;
