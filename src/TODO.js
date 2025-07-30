export function createTodo(title,  dueDate,) {
	return {title,  dueDate, id:crypto.randomUUID()};
};
