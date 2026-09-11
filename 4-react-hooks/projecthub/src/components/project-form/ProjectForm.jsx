import "./ProjectForm.styles.css";

export default function ProjectForm({ onSubmit, close }) {
  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    if (name == "") {
      alert("Project name can't be blank!");
      return;
    }
    const description = formData.get("description");
    if (description == "") {
      alert("Project description can't be blank!");
      return;
    }
    const link = formData.get("link");
    if (link == "") {
      alert("Project link can't be blank!");
      return;
    }

    onSubmit({
      name,
      description,
      link,
    });
    close();
  };

  return (
    <form className="project" onSubmit={submit}>
      <h3>New Project</h3>
      <div className="form-row">
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" />
      </div>
      <div className="form-row">
        <label htmlFor="description">Description: </label>
        <textarea name="description"></textarea>
      </div>
      <div className="form-row">
        <label htmlFor="link">Link: </label>
        <input type="text" name="link" />
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
