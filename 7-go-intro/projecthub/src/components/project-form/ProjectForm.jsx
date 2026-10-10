import { useState } from "react";
import "./ProjectForm.styles.css";

export default function ProjectForm({ onSubmit, close }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const project = {
      name,
      description,
      link,
    };

    onSubmit(project);

    setName("");
    setDescription("");
    setLink("");

    close();
  };

  return (
    <form className="project" onSubmit={handleSubmit}>
      <h3>New Project</h3>
      <div className="form-row">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>
      <div className="form-row">
        <label htmlFor="link">Link: </label>
        <input
          type="text"
          name="link"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
        <button type="reset" onClick={close}>
          Cancel
        </button>
      </div>
    </form>
  );
}
