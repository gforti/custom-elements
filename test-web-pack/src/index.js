import TodoController from './todo.controller.js';


document.addEventListener('DOMContentLoaded', async ()=>{
    await new TodoController().init()
})

        
        
       