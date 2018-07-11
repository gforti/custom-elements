(async () => {

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
                :host .todo-body  {
                  font-size: 2.5rem;
                  color: red;
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
                <section class="todo-body">                    
                </section>                
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
      this.todoListDisplay = this.shadowRoot.querySelector('.todo-body');
    }

    connectedCallback() {
        console.log('Custom square element added to page.');
        this.render()
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

    // Getter to let component know what attributes
    // to watch for mutation
    static get observedAttributes() {
      return ['data-userid', 'data-title', 'data-completed'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.render()
        }
      console.log(`${attr} was changed from ${oldValue} to ${newValue}!`)

    }

    render() {
        
        this.todoListDisplay.innerText = this.userid;
    }
    
    listRender(todos) {       
        
        this.todoListDisplay.innerHTML = `${todos.map(title => `<todo-item>${title}</todo-item>`).join(' ')}`
    }

    disconnectedCallback() {
      // remove event listeners
        console.log('Custom square element removed from page.');
      }
      
    set prop(value) {
        console.log('setting prop')
        this.props = value
    }
    
    get prop() {
        return this.props
    }

    get title() {
      return this.dataset.title;
    }
    set title(value) {
      this.dataset.title = value;
    }
    
    get userid() {
      return this.dataset.userid;
    }
    set userid(value) {
      this.dataset.userid = value;
    }
    
    get completed() {
      return this.dataset.completed;
    }
    set completed(value) {
      this.dataset.completed = value;
    }
  }

  window.customElements.define('todo-list', TodoList);
})();
