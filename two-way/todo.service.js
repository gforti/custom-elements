class TodoService extends HttpFetch {
    
    constructor() { 
        super()
         if(this.instance){
            return this.instance;
          }
        this.todo = [] 
        this.instance = this;
    }

    addTodo(item) {
        if ( Array.isArray(item) ) {
            item.forEach( todo => {
                this.todo.push(todo.title)
            })            
        } else {
            this.todo.push(item)
        }
    }

    getTodos() {
        return this.todo
    }
    
    async fetchTodos() {
        let data = await this.get('todo.json')
        this.addTodo(data)
    }
}

