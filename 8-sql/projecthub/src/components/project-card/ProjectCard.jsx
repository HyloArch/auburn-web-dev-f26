import "./ProjectCard.styles.css";

export default function ProjectCard({ project }) {
  return (
    <div className="project">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <a href={project.link}>View Projects</a>
    </div>
  );
}
