
const STORAGE = (function () {
	
	const postTodo = function(todoObj) {
		const todos = JSON.parse(localStorage.getItem("userTodos")) || [];
		todos.push(todoObj);
		localStorage.setItem("userTodos", JSON.stringify(todos));
	}
	const loadHomeTodos = function (){
		return (JSON.parse(localStorage.getItem("userTodos")));
	}	
	const loadTodayTodos = function (){
		const allTodos =JSON.parse(localStorage.getItem("userTodos"))
		const todayTodos = [];
		const dateUnformatted = new Date();
		const todayYear = dateUnformatted.getFullYear();
		const todayMonth = dateUnformatted.getMonth();
		const todayDate = dateUnformatted.getDate();
		const todayDateFormatted = new Date(todayYear, todayMonth, todayDate);
		console.log(todayYear);
		for(let i = 0; i < allTodos.length; i++){
			
			const dueDateString = allTodos[i].dueDate;
			const [year, month, day] = dueDateString.split("-").map(Number);
			const dueDateFormatted =  new Date(year, month - 1, day);
			console.log(todayDateFormatted.toDateString() === dueDateFormatted.toDateString());
			console.log(`today: ${todayDateFormatted} dueDate: ${dueDateFormatted}`);
			if(todayDateFormatted.toDateString() === dueDateFormatted.toDateString()){
				todayTodos.push(allTodos[i]);
			};
		};
		return(todayTodos);
	};

	const loadWeekTodos = function(){
		const allTodos =JSON.parse(localStorage.getItem("userTodos"))
		const weekTodos = [];
		Date.prototype.getWeek = function() {
		  var date = new Date(this.getTime());
  		date.setHours(0, 0, 0, 0);
  		// Thursday in current week decides the year.
  		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  		// January 4 is always in week 1.
  		var week1 = new Date(date.getFullYear(), 0, 4);
  		// Adjust to Thursday in week 1 and count number of weeks from date to week1.
  		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000  - 3 + (week1.getDay() + 6) % 7) / 7);
		}
		const todayDate = new Date();
			for(let i = 0; i < allTodos.length; i++){
			
				const dueDateString = allTodos[i].dueDate;
				const dueDateFormatted =  new Date(dueDateString);
				if(todayDate.getWeek() === dueDateFormatted.getWeek()){
					weekTodos.push(allTodos[i]);
				};
		};
		return (weekTodos); 
	};
		
		
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

	return {postTodo, loadHomeTodos, loadWeekTodos, removeTodo, loadTodayTodos};
})();

export default STORAGE;
