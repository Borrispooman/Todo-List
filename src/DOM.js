
import STORAGE from "./STORAGE.js"; 
import plusBoxUrl from "./assets/icons/plus-box.svg";

const DOM = (function(){


	const renderHome = function(){
		const mainContent = document.querySelector(".main-content");
		mainContent.innerHTML = "";
		const homeTodos = STORAGE.loadHomeTodos() || []; 	//this should return an empty list if theres no todos in local storage, then the "add-todo" button will be appended to the top.
		console.log(homeTodos);
		for (let i = 0; i < homeTodos.length; i++) {
			const parentTodoDiv = document.createElement("div");
			parentTodoDiv.id = `${homeTodos[i].id}`;
			parentTodoDiv.className = "todo-div";
			const titleDiv = document.createElement("div"); 
			titleDiv.textContent = `${homeTodos[i].title}`;
			titleDiv.className = "todo-name";
			const checkButton = document.createElement("button");
			checkButton.className = "check-button"
			const dateDiv = document.createElement("div");
			dateDiv.textContent = `${homeTodos[i].dueDate}`;
			parentTodoDiv.append( checkButton, titleDiv, dateDiv);
			mainContent.append(parentTodoDiv);
		};		

		const checkButtons = document.querySelectorAll(".check-button");
		checkButtons.forEach((button) => {
			button.addEventListener("click", function(event) {
				const clickedButton = event.target;
  			const selectedTodo = clickedButton.parentElement;
				if (selectedTodo) {
					selectedTodo.remove();
					console.log(selectedTodo.id);
					STORAGE.removeTodo(`${selectedTodo.id}`);
				};
			});
		});
		
		if (document.querySelector(".add-button") === null) {
			const addTodoDiv = document.createElement("div");
			addTodoDiv.className = "add-button";
			const textContainer = document.createElement("div");
			textContainer.textContent = "New Todo";
			const svgNS = "http://www.w3.org/2000/svg"

			const icon = document.createElementNS(svgNS, "svg");
			icon.setAttribute("viewBox", "0 0 24 24"); 
			const iconPath = document.createElementNS(svgNS, "path");
			iconPath.setAttribute("d", "M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z");
			icon.append(iconPath);
			addTodoDiv.append(icon, textContainer);
			addTodoDiv.onclick = function() {
				document.querySelector("dialog").showModal();
			};
			mainContent.append(addTodoDiv);
		};
	};
	
	return {renderHome};
})();

export default DOM;
