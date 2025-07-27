const STORAGE = (function () {
	
	const postTodo = function(todoObj) {
		const todos = JSON.parse(localStorage.getItem("userTodos")) || [];
		todos.push(todoObj);
		localStorage.setItem("userTodos", JSON.stringify(todos));
	}
	const loadHomeTodos = function (){
		return (JSON.parse(localStorage.getItem("userTodos")));
	}	
	
	const removeTodo = function(id) {
		const todos = (JSON.parse(localStorage.getItem("userTodos")));	
		for (let i = 0; i < todos.length; i++) {
			if (todos[i].id = id){
				console.log(todos[i].id);
				todos.splice(i, 1);
				localStorage.setItem("userTodos", JSON.stringify(todos));
			};
		};
	};

	return {postTodo, loadHomeTodos, removeTodo};
})();

export default STORAGE;
