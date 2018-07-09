(async () => {


     const template = document.createElement('template');

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
          :host span {
            font-size: 2.5rem;
            color: red;
          }
        </style>
          <h1>Hello Alligator!</h1>
          <div>
            <span></span>
          </div>

    `;

  class UserCard extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this.displayVal = this.shadowRoot.querySelector('span');

    }

    connectedCallback() {
        this.render()
    }

    // Getter to let component know what attributes
    // to watch for mutation
    static get observedAttributes() {
      return ['username'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      this[attr] = newValue
      console.log(`${attr} was changed from ${oldValue} to ${newValue}!`)
      this.render()
    }

    render() {

        this.displayVal.innerText = this.username;
        console.log(`PLANET ${this.username} RENDERED`)
    }

    disconnectedCallback() {
      // remove event listeners
    }

    get username() {
      return this.getAttribute('username');
    }

    set username(newValue) {
      this.setAttribute('username', newValue);
    }
  }

  customElements.define('user-card', UserCard);
})();
