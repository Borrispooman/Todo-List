
import STORAGE from "./STORAGE.js"; 

const DOM = (function(){


	const renderHome = function(){
		const mainContent = document.querySelector(".main-content");
		mainContent.innerHTML = "";
		const homeTodos = STORAGE.loadHomeTodos(); 	//this should return an empty list if theres no todos in local storage, then the "add-todo" button will be appended to the top.
		console.log(homeTodos);
		for (let i = 0; i < homeTodos.length; i++) {
			const parentTodoDiv = document.createElement("div");
			parentTodoDiv.id = `${homeTodos[i].id}`;
			parentTodoDiv.className = "todo-div";
			const titleDiv = document.createElement("div"); 
			titleDiv.textContent = `${homeTodos[i].title}`;
			const checkButton = document.createElement("button");
			checkButton.className = "check-button"
			const dateDiv = document.createElement("div");
			dateDiv.textContent = `${homeTodos[i].dueDate}`
			parentTodoDiv.append(titleDiv, checkButton, dateDiv);
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
			const addTodoDiv = document.createElement("button");
			addTodoDiv.classname = "add-button";
			addTodoDiv.textContent = "New Todo";
			addTodoDiv.onclick = function() {
				document.querySelector("dialog").showModal();
			};
			mainContent.append(addTodoDiv);
		};
	};
	
	return {renderHome};
})();

export default DOM;
