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
                :host h1 {
                  font-size: 2.5rem;
                  color: hotpink;
                  font-family: monospace;
                  text-align: center;
                  text-decoration: pink solid underline;
                  text-decoration-skip: ink;
                }
                :host .title  {
                  font-size: 2.5rem;
                  color: ${getRandomColor()};
                }
                :host div {
                  text-align: center;
                }
            </style>
            <h1>Hello Alligator!</h1>
            <div>
                <span class="title"></span>
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
      return ['username'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this[attr] = newValue
            this.render()
        }
      console.log(`${attr} was changed from ${oldValue} to ${newValue}!`)

    }

    render() {
        this.displayTitle.innerText = this.title;
    }

    disconnectedCallback() {
      // remove event listeners
        console.log('Custom square element removed from page.');
      }

    get title() {
      return this.getAttribute('title');
    }

    set title(newValue) {
      this.setAttribute('title', newValue);
    }
  }

  window.customElements.define('user-card', UserCard);
})();
