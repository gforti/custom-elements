function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host .todo {
                text-align: center;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.5s;
                margin: 1rem;
                padding: 1rem;
                font-size: 1.5rem;
                color: red;
            }
            :host .todo:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
                cursor: pointer;
            }
            :host .strike {
                text-decoration: line-through !important;
                color: silver;
            }

        </style>
        <div class="todo">
            <slot></slot>
        </div>

    `;
    return template;
}

class TodoItem extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.div = this.shadowRoot.querySelector('.todo')
    }

    connectedCallback() {
        this.addEventListener('click', this.completed.bind(this))
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.completed.bind(this))
    }

    static get observedAttributes() {
      return ['data-completed'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.render()
        }
    }

    completed() {
        this.dataset.completed = this.dataset.completed === 'true' ? false : true
        this.dispatchEvent(new CustomEvent('item-clicked'))
    }

    render() {
        if ( this.dataset.completed === 'true' ) {
            this.div.classList.add('strike')
        } else {
            this.div.classList.remove('strike')
        }
    }

}

window.customElements.define('todo-item', TodoItem);

