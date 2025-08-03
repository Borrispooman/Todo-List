import "./style.css";
import "./reset.css";
import { createTodo } from "./TODO.js";
import {createProject } from "./PROJECT.js";
import DOM from "./DOM.js";
import STORAGE from "./STORAGE.js";

DOM.renderHome();
DOM.renderProjectsSideBar();
const homeTab = document.getElementById("homeTab");
const todayTab = document.getElementById("todayTab");
const weekTab = document.getElementById("weekTab"); 

homeTab.addEventListener("click", function() {
	DOM.renderHome();
	homeTab.style.backgroundColor="lightgrey";
	todayTab.style.backgroundColor="#EEEEEE";
	weekTab.style.backgroundColor = "#EEEEEE";
	const allProjectTabs = document.querySelector(".projects-container").children; // only direct children
		for (const child of allProjectTabs) {
			child.style.backgroundColor = "#EEEEEE";
		}

});
todayTab.addEventListener("click", function() {
	DOM.renderToday();
	todayTab.style.backgroundColor="lightgrey";
	homeTab.style.backgroundColor = "#EEEEEE";
	weekTab.style.backgroundColor = "#EEEEEE";
	const allProjectTabs = document.querySelector(".projects-container").children; // only direct children
		for (const child of allProjectTabs) {
			child.style.backgroundColor = "#EEEEEE";
		}

});
weekTab.addEventListener("click", function() {
	DOM.renderWeek();
	todayTab.style.backgroundColor="#EEEEEE";
	homeTab.style.backgroundColor = "#EEEEEE";
	weekTab.style.backgroundColor = "lightgrey";
	const allProjectTabs = document.querySelector(".projects-container").children; // only direct children
		for (const child of allProjectTabs) {
			child.style.backgroundColor = "#EEEEEE";
		}

});

document.querySelector("#addForm form").addEventListener("submit", event => {
  event.preventDefault();
	var formData = new FormData(event.target);
	const newTodo = createTodo(formData.get("title"),  formData.get("date") );
	STORAGE.postTodo(newTodo);

  const popover = document.querySelector('#addForm');
  const addTodoDiv = document.querySelector('.add-button'); // your trigger
	addTodoDiv.style.visibility = '';
	popover.classList.remove("open");
	DOM.renderHome();
});

document.querySelector(".cancel").addEventListener("click", e => {
	e.preventDefault()
	const popover = document.querySelector('#addForm');
	popover.classList.remove("open");
	DOM.renderHome();
});

document.querySelector("#projectAddForm form").addEventListener("submit", event => {
  event.preventDefault();
	var formData = new FormData(event.target);
	const newTodo = createTodo(formData.get("title"),  formData.get("date") );
	STORAGE.postProjectTodo(newTodo, document.querySelector(".main-content h1").textContent);
  const popover = document.querySelector('#projectAddForm');
  const addTodoDiv = document.querySelector('.add-button'); // your trigger
	addTodoDiv.style.visibility = '';
	popover.classList.remove("open");
	DOM.renderProjectTodos(document.querySelector(".main-content h1").textContent);
	console.log("from submit");
});

document.querySelector(".new-project").addEventListener("click", function(){
	console.log("i've been clicked");
	const popover = document.querySelector("#newProjectForm")
	const newProjectBtn = document.querySelector(".new-project")
	const rect = newProjectBtn.getBoundingClientRect();
		popover.style.position = 'absolute';
		popover.style.top = `${rect.top + window.scrollY + 8}px`;
		popover.style.left = `${rect.left + window.scrollX}px`;
		newProjectBtn.style.visibility = 'hidden';
		popover.classList.add('open');
});

document.querySelector("#newProjectForm form").addEventListener("submit", event => {
  event.preventDefault();
	var formData = new FormData(event.target);
	const newProject = createProject(formData.get("projName"))
	STORAGE.postNewProject(newProject);
	const popover = document.querySelector("#newProjectForm")
	const newProjectBtn = document.querySelector(".new-project")
	popover.classList.remove("open");
	newProjectBtn.style.visibility = '';
	DOM.renderProjectsSideBar();
});

document.querySelector(".new-proj-cancel").addEventListener("click", function(){
	const popover = document.querySelector("#newProjectForm")
	const newProjectBtn = document.querySelector(".new-project")
	popover.classList.remove("open");
	newProjectBtn.style.visibility = '';
});

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});



