function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host .todo-title {
              font-size: 2.5rem;
              color: hotpink;
              font-family: monospace;
              text-align: center;
              text-decoration: pink solid underline;
              text-decoration-skip: ink;
            }
            :host .todo {
                text-align: center;        
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                margin: 1rem;
                padding: 1rem;
            }
            :host .todo:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }

        </style>
        <div class="todo">
            <header class="todo-header">
                Todo: <input name="todo" /> <button>Add</button>
            </header>                               
        </div>

    `;
    return template;
}

class TodoList extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.todoInput = this.shadowRoot.querySelector('input[name="todo"]');
      this.btnSubmit = this.shadowRoot.querySelector('button');
    }

    connectedCallback() {
        this.btnSubmit.addEventListener('click', this.submitTodoItem.bind(this))
    }
    
    disconnectedCallback() {
        this.btnSubmit.removeEventListener('click', this.submitTodoItem.bind(this))
    }
    
    submitTodoItem() {
        this.dispatchEvent(new CustomEvent('add-todo', { detail: this.todoInput.value }))
    }
      
}

window.customElements.define('todo-list', TodoList);

