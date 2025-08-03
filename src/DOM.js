
import STORAGE from "./STORAGE.js"; 
import plusBoxUrl from "./assets/icons/plus-box.svg";

const DOM = (function(){


	const renderHome = function(){
		const mainContent = document.querySelector(".main-content");
		mainContent.innerHTML = "";
		const heading =  document.createElement("h1");
		heading.textContent = 'Home';
		heading.className = "content-heading";
		mainContent.append(heading);

		const homeTodos = STORAGE.loadHomeTodos() || []; 	
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
			addTodoDiv.setAttribute("role", "button");
			addTodoDiv.tabIndex = "0";
			addTodoDiv.setAttribute("popovertarget", "addForm");
			const textContainer = document.createElement("div");
			textContainer.textContent = "New Todo";
			const svgNS = "http://www.w3.org/2000/svg"
			const icon = document.createElementNS(svgNS, "svg");
			icon.setAttribute("viewBox", "0 0 24 24"); 
			const iconPath = document.createElementNS(svgNS, "path");
			iconPath.setAttribute("d", "M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z");
			icon.append(iconPath);
			addTodoDiv.append(icon, textContainer);
			const popover = document.querySelector('#addForm');
			addTodoDiv.addEventListener('click', () => {
					if (popover.classList.contains('open')) {
							popover.classList.remove('open');
							addTodoDiv.style.visibility = '';
					} else {
							const rect = addTodoDiv.getBoundingClientRect();
							popover.style.position = 'absolute';
							popover.style.top = `${rect.top + window.scrollY}px`;
							popover.style.left = `${rect.left + window.scrollX}px`;
							popover.style.width = `${rect.width}px`;
							popover.style.height = `${rect.height}px`;
							addTodoDiv.style.visibility = 'hidden';
							popover.classList.add('open');
					}
			});		
			mainContent.append(addTodoDiv);

		};
	};

	const renderToday = function(){
		const mainContent = document.querySelector(".main-content");
		mainContent.innerHTML = "";

		const heading =  document.createElement("h1");
		heading.textContent = 'Today';
		heading.className = "content-heading";
		mainContent.append(heading);
		const todayTodos = STORAGE.loadTodayTodos() || []; 	
		console.log(todayTodos);
		for (let i = 0; i < todayTodos.length; i++) {
			const parentTodoDiv = document.createElement("div");
			parentTodoDiv.id = `${todayTodos[i].id}`;
			parentTodoDiv.className = "todo-div";
			const titleDiv = document.createElement("div"); 
			titleDiv.textContent = `${todayTodos[i].title}`;
			titleDiv.className = "todo-name";
			const checkButton = document.createElement("button");
			checkButton.className = "check-button"
			const dateDiv = document.createElement("div");
			dateDiv.textContent = `${todayTodos[i].dueDate}`;
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

	}
	
	const renderWeek = function(){
		const mainContent = document.querySelector(".main-content");
		mainContent.innerHTML = "";

		const heading =  document.createElement("h1");
		heading.textContent = 'This Week';
		heading.className = "content-heading";
		mainContent.append(heading);
		const weekTodos = STORAGE.loadWeekTodos() || []; 	
		for (let i = 0; i < weekTodos.length; i++) {
			const parentTodoDiv = document.createElement("div");
			parentTodoDiv.id = `${weekTodos[i].id}`;
			parentTodoDiv.className = "todo-div";
			const titleDiv = document.createElement("div"); 
			titleDiv.textContent = `${weekTodos[i].title}`;
			titleDiv.className = "todo-name";
			const checkButton = document.createElement("button");
			checkButton.className = "check-button"
			const dateDiv = document.createElement("div");
			dateDiv.textContent = `${weekTodos[i].dueDate}`;
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

	};

	const renderProjectsSideBar = function(){
		const projectsContainer = document.querySelector(".projects-container")
		projectsContainer.innerHTML = "";
		const projects = STORAGE.loadProjects();
		for(let i = 0; i < projects.length; i++){
			const projectDiv = document.createElement("div")
			projectDiv.className = "nav-project-div";
			projectDiv.textContent = `${projects[i].name}`;
			projectDiv.addEventListener("click", function(){
				renderProjectTodos(`${projects[i].name}`);
				const allProjectTabs = document.querySelector(".projects-container").children; // only direct children
				for (const child of allProjectTabs) {
 					child.style.backgroundColor = "#EEEEEE";
				}
				homeTab.style.backgroundColor="#EEEEEE";
				todayTab.style.backgroundColor="#EEEEEE";
				weekTab.style.backgroundColor = "#EEEEEE";
				projectDiv.style.backgroundColor = "lightgrey"
			});
		projectsContainer.append(projectDiv);
		};
	};


	const renderProjectTodos = function(proj){
		const mainContent = document.querySelector(".main-content");
		mainContent.innerHTML = "";

		const heading =  document.createElement("h1");
		heading.textContent = `${proj}`;
		heading.className = "content-heading";
		mainContent.append(heading);
		const projTodos = STORAGE.loadProjectTodos(proj) || []; 	
		for (let i = 0; i < projTodos.length; i++) {
			const parentTodoDiv = document.createElement("div");
			parentTodoDiv.id = `${projTodos[i].id}`;
			parentTodoDiv.className = "todo-div";
			const titleDiv = document.createElement("div"); 
			titleDiv.textContent = `${projTodos[i].title}`;
			titleDiv.className = "todo-name";
			const checkButton = document.createElement("button");
			checkButton.className = "check-button"
			const dateDiv = document.createElement("div");
			dateDiv.textContent = `${projTodos[i].dueDate}`;
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
					STORAGE.removeProjectTodo(selectedTodo.id, proj);
				};
			});
		});

		if (document.querySelector(".add-button") === null) {
			const addTodoDiv = document.createElement("div");
			addTodoDiv.className = "add-button";
			addTodoDiv.setAttribute("role", "button");
			addTodoDiv.tabIndex = "0";
			addTodoDiv.setAttribute("popovertarget", "addForm");
			const textContainer = document.createElement("div");
			textContainer.textContent = "New Todo";
			const svgNS = "http://www.w3.org/2000/svg"
			const icon = document.createElementNS(svgNS, "svg");
			icon.setAttribute("viewBox", "0 0 24 24"); 
			const iconPath = document.createElementNS(svgNS, "path");
			iconPath.setAttribute("d", "M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z");
			icon.append(iconPath);
			addTodoDiv.append(icon, textContainer);
			const popover = document.querySelector('#projectAddForm');
			addTodoDiv.addEventListener('click', () => {
					if (popover.classList.contains('open')) {
							popover.classList.remove('open');
							addTodoDiv.style.visibility = '';
					} else {
							const rect = addTodoDiv.getBoundingClientRect();
							popover.style.position = 'absolute';
							popover.style.top = `${rect.top + window.scrollY}px`;
							popover.style.left = `${rect.left + window.scrollX}px`;
							popover.style.width = `${rect.width}px`;
							popover.style.height = `${rect.height}px`;
							addTodoDiv.style.visibility = 'hidden';
							popover.classList.add('open');
					}
			});		
			mainContent.append(addTodoDiv);
		};
	};

	return {renderProjectsSideBar, renderProjectTodos, renderHome, renderToday, renderWeek};
})();

export default DOM;
