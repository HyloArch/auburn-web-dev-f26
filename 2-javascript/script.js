const projectsContainer = document.querySelector("#projects-container");

const newProjectButton = document.querySelector("#new-project-button");
const newProjectForm = document.querySelector("#new-project-form");
const projectNameInput = document.querySelector("#project-name");
const projectDescriptionInput = document.querySelector("#project-description");
const createProjectButton = document.querySelector("#create-project");
const cancelProjectButton = document.querySelector("#cancel-project");

let projects = [
  {
    name: "Weather App",
    description: "A weather application built with React.",
  },
  {
    name: "Game Tracker",
    description: "Track the games I've played.",
  },
  {
    name: "Project Manager",
    description: "Manage the planning and development of my personal projects.",
  },
];

function renderProjects() {
  projectsContainer.innerHTML = "";

  projects.map((project) => {
    projectsContainer.innerHTML += `
      <div class="project">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <button>View Project</button>
      </div>
    `;
  });
}

newProjectButton.addEventListener("click", () => {
  newProjectButton.hidden = true;
  newProjectForm.hidden = false;
});

cancelProjectButton.addEventListener("click", () => {
  newProjectButton.hidden = false;
  newProjectForm.hidden = true;
});

createProjectButton.addEventListener("click", () => {
  if (projectNameInput.value == "") {
    alert("Project name can't be blank!");
    return;
  }
  if (projectDescriptionInput.value == "") {
    alert("Project description can't be blank!");
    return;
  }

  projects.push({
    name: projectNameInput.value,
    description: projectDescriptionInput.value,
  });

  projectNameInput.value = "";
  projectDescriptionInput.value = "";

  newProjectButton.hidden = false;
  newProjectForm.hidden = true;

  renderProjects();
});

renderProjects();
