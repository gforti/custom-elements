window.customElements.define('item-sort', class extends HTMLElement {

    generateTemplate() {

        const template = document.createElement('template')

        template.innerHTML = `
            <style>
                div {
                    min-height: 4em;
                    margin: 1em 0;
                    padding: 1em 7em 1em 1em;
                    display: flex;
                    position: relative;
                    align-items: center;
                    background-color: #ffc600;
                    box-shadow: 0 2px 3px rgba(0,0,0,0.7);
                    border-radius: 3px;
                    word-wrap: break-word;
                   
                }
        
                .task_elem_animate {
                    animation-duration: 1.1s;
                    animation-name: slide;
                  }
                  @keyframes slide {
                    from {
                      opacity: 0.2;                  
                      margin-left:-100vw;
                      margin-right:100vw;

                    }
                    to {
                      opacity: 1;
                      margin-left: 0vw;
                      margin-right: 0vw;

                    }
                  }

            </style>
            <div class="task_elem_animate"><slot></slot></div>            
        `
        return template
    }

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
        this.element = this.shadowRoot.querySelector('div')
        // this.functionBind = this.function.bind(this)
        /*
         * 
         * Todo: set tranform at div to simulate move.
         */
    }

    connectedCallback() {
        //console.log('Custom element added to page.')
        // this.element.addEventListener('click', this.functionBind)
        this.render()
    }
    
    disconnectedCallback() {
        // remove event listeners
        //console.log('Custom element removed from page.')
        this.element.classList.remove('task_elem_animate')
        // this.element.removeEventListener('click', this.functionBind)
    }

    adoptedCallback() {
        //console.log('Custom element moved to new page.')
    }

    static get observedAttributes() {
      return ['data-requiredPosition', 'data-ypos'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            if ( attr ==='data-ypos') {
                this.setTranslate(newValue)
            } else
                this.element.dataset.requiredPosition = newValue
            //this.render()
        }
        
    }

    render() {
       
    }
    
    setTranslate( yPos) {
        this.element.style.transform = `translate(0px, ${yPos}px)`;
    }
    
    /* function.bind() {
            this.dispatchEvent(new CustomEvent('{{name}}-click', { detail: this.element.value }))
        }
     */


});

