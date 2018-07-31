
    /*
     * <script src="password-reveal.element.js" defer></script>
     * <password-reveal></password-reveal>
     */
    function generateTemplate() {

        const template = document.createElement('template');

        template.innerHTML = `
            <style>
                :host input.password {                    
                    width: 250px;
                    padding: .5em .25em;
                    margin: 0 0 1em;
                    font-size: 1.2em;
                    border: 2px solid #000;
                    outline: none;
                    padding-right: 4rem;
                }
                :host .hide-show {
                  width: 295px;
                  margin: -3.62em 0 0 1.5%;
                  position: relative;
                  z-index: 5;
                }
                :host .hide-show span {
                  width: 34px;
                  background: #1fd100;
                  font-size: 1em;
                  padding: .5em;
                  float: right;
                  border-radius: 5px;
                  cursor: pointer;
                  text-align: center;
                }
            </style>            
            <input class="password" required type="password" value="testing" />
            <div class="hide-show">
              <span>Show</span>
            </div>
            
        `;
        return template;
    }

  class PasswordReveal extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.showHide = this.shadowRoot.querySelector('.hide-show span')
      this.input = this.shadowRoot.querySelector('input')
    }

    connectedCallback() {
        console.log('Custom element added to page.');
        this.showHide.addEventListener('click', this.tooglePassword.bind(this))
        this.render()
    }

    adoptedCallback() {
        console.log('Custom element moved to new page.');
    }

    static get observedAttributes() {
      return [];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.render()
        }
        console.log(`${attr} was changed from ${oldValue} to ${newValue}!`)
    }

    disconnectedCallback() {
      // remove event listeners
        console.log('Custom element removed from page.');
    }

      render() {
    }
    
    tooglePassword() {
        this.input.type = this.input.type === 'password' ? 'text' : 'password'
        this.showHide.innerText = this.input.type === 'password' ? 'Show' : 'Hide'
    }
    
    get inputElement() {
        return this.input
    }

  }

  window.customElements.define('password-reveal', PasswordReveal);
