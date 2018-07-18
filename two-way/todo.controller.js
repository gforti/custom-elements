
class TodoController {
    
   async init() { 
        const todoService = new TodoService()
        await todoService.fetchTodos()
        console.log(todoService.getTodos())
        console.log('ready!');
        let todo = document.querySelector('todo-list')
        todo.listRender(todoService.getTodos())

        todo.addEventListener('add-todo', (e)=> {
            console.log(e.detail)
            todoService.addTodo(e.detail)
            todo.listRender(todoService.getTodos())
        })
   }
}