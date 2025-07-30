import "./style.css";
import "./reset.css";
import { createTodo } from "./TODO.js";
import DOM from "./DOM.js";
import STORAGE from "./STORAGE.js";

DOM.renderHome();
const homeTab = document.querySelector("#homeTab");
homeTab.addEventListener("click", function() {
	DOM.renderHome();
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


document.querySelectorAll("input").forEach(input => {
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});



