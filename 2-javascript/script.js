const projectsContainer = document.querySelector("#projects-container");

const newProjectButton = document.querySelector("#new-project-button");
const newProjectForm = document.querySelector("#new-project-form");
const cancelProjectButton = document.querySelector("#cancel-project");

let projects = [
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
    description: "Manage the planning and development of my personal projects.",
    link: "",
  },
];

function renderProjects() {
  projectsContainer.innerHTML = "";

  projects.map((project) => {
    projectsContainer.innerHTML += `
      <div class="project">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <a href="${project.link}">View Project</a>
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

newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(newProjectForm);

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

  projects.push({
    name,
    description,
    link,
  });

  newProjectForm.reset();

  newProjectButton.hidden = false;
  newProjectForm.hidden = true;

  renderProjects();
});

renderProjects();
