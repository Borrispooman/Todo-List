export function createProject(name){
	return{name, id:crypto.randomUUID()};
}
