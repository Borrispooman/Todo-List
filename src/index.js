import "./style.css";
import "./reset.css";
import { createTodo } from "./TODO.js";
import DOM from "./DOM.js";

const homeTab = document.querySelector("#homeTab");
homeTab.addEventListener("click", function() {
	DOM.renderHome();
});

console.log("hello, world");

const newTodo = createTodo("jirk off", "masturbate only once a week", "Daily", "Mild");
console.log(newTodo);
