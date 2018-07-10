(async () => {

    function generateTemplate() {

        const template = document.createElement('template');

        function getRandomColor() {
            let letters = '0123456789ABCDEF', color = '#', i = 6;
            while (i--) color += letters[Math.floor(Math.random() * 16)];
            return color;
          }

        template.innerHTML = `
            <style>
                :host .card-header {
                  font-size: 2.5rem;
                  color: hotpink;
                  font-family: monospace;
                  text-align: center;
                  text-decoration: pink solid underline;
                  text-decoration-skip: ink;
                }
                :host .card-body  {
                  font-size: 2.5rem;
                  color: ${getRandomColor()};
                }
                :host .card {
                    text-align: center;        
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                    margin: 1rem;
                    padding: 1rem;
                }
                :host .card:hover {
                    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
                }

            </style>
            <div class="card">
                <header class="card-header">
                    <span class="id"></span>
                </header>
                <section class="card-body">
                    <span class="title"></span>
                    <input name="email" />
                </section>
                <footer class="card-footer">
                    <span class="completed"></span>
                </footer>
            </div>

        `;
        return template;
    }

  class UserCard extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.displayTitle = this.shadowRoot.querySelector('.title');
      this.displayId = this.shadowRoot.querySelector('.id');
      this.displaycompleted = this.shadowRoot.querySelector('.completed');
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
      return ['data-id', 'data-title', 'data-completed'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.render()
        }
      console.log(`${attr} was changed from ${oldValue} to ${newValue}!`)

    }

    render() {
        this.displayTitle.innerText = this.title;
        this.displayId.innerText = this.id;
        this.displaycompleted.innerText = this.completed;
    }

    disconnectedCallback() {
      // remove event listeners
        console.log('Custom square element removed from page.');
      }

    get title() {
      return this.getAttribute('data-title');
    }
    set title(newValue) {
      this.setAttribute('data-title', newValue);
    }
    
    get id() {
      return this.getAttribute('data-id');
    }
    set id(newValue) {
      this.setAttribute('data-id', newValue);
    }
    
    get completed() {
      return this.getAttribute('data-completed');
    }
    set completed(newValue) {
      this.setAttribute('data-completed', newValue);
    }
  }

  window.customElements.define('user-card', UserCard);
})();
