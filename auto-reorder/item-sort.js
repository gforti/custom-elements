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
                .elem_animate {
                    transition: transform 1s;
                }
                .task_elem_animate {
                    animation-duration: 1s;
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
            <div class="task_elem_animate elem_animate"><slot></slot></div>            
        `
        return template
    }

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
        this.element = this.shadowRoot.querySelector('div')        
    }
    
    get item(){
        return this.element
    }
    
    disconnectedCallback() {
        this.element.classList.remove('task_elem_animate')
    }

    static get observedAttributes() {
      return ['data-requiredPosition', 'data-ypos']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            if ( attr ==='data-ypos') {
                this.setTranslate(newValue)
            } else {
                this.element.dataset.requiredPosition = newValue
            }
        }        
    }
    
    setTranslate(yPos) {
        if ( yPos == 0) {
            this.element.classList.remove('elem_animate')
        } else {
            this.element.classList.add('elem_animate')
        }
        this.element.style.transform = `translate(0px, ${yPos}px)`;
    }

});

