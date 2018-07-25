(async () => {

    function generateTemplate() {

        const template = document.createElement('template');

        template.innerHTML = `
            <style>
                :host TemplateClass {
                  font-size: 2.5rem;
                  color: var(--DemoElement-color, red);                  
                }

            </style>
            <article>
                <h1>TemplateClass</h1>
                <p></p>
                <button>Event</button>
            </article>
        `;
        return template;
    }

  class DemoElement extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.btnSubmit = this.shadowRoot.querySelector('button');
      this.textDisplay = this.shadowRoot.querySelector('p');
    }

    connectedCallback() {
        console.log('Custom element added to page.');
        this.btnSubmit.addEventListener('click', this.submitTodoItem.bind(this))
        this.render()
    }
    
    btnClick() {
             console.log('this.todoInput.value', this.todoInput)
        this.dispatchEvent(new CustomEvent('ev-TemplateClass', { detail: this.todoInput.value }))
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
