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

document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
	console.log(event.target);
	var formData = new FormData(event.target);
	const newTodo = createTodo(formData.get("title"), formData.get("description"), formData.get("date"), formData.get("priority") );
	STORAGE.postTodo(newTodo);
	const popover = document.querySelector('#addForm');
	popover.hidePopover();	
	DOM.renderHome();
	console.log(STORAGE.loadHomeTodos());
});

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});


console.log("hello, world");

const newTodo = createTodo("jirk off", "masturbate only once a week", "Daily", "Mild");
console.log(newTodo);
