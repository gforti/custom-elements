window.customElements.define('auto-sort', class extends HTMLElement {

    generateTemplate() {

        const template = document.createElement('template')

        template.innerHTML = `
            <style>
                article {
                position: relative;
                padding: 0 1em;
              }

            </style>
            <article>
            </article>
        `
        return template
    }

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
        this.element = this.shadowRoot.querySelector('article')
        this.slotNodes = []
        // this.functionBind = this.function.bind(this)
    }

    connectedCallback() {
        console.log('Custom element added to page.')
        // this.element.addEventListener('click', this.functionBind)
        
        //this.slotNodes = [...this.element.querySelectorAll('item-sort')]
        
        //this.render()
    }
    
    disconnectedCallback() {
        // remove event listeners
        console.log('Custom element removed from page.')
        // this.element.removeEventListener('click', this.functionBind)
    }

    adoptedCallback() {
        console.log('Custom element moved to new page.')
    }

    static get observedAttributes() {
      return ['data-wow'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.setdata(newValue)
            //this.render()
        }
        console.log(`${attr} was changed from ${oldValue} to ${newValue}!`)
    }
    
    
    setdata(val) {
        console.log('dats set', val)
        console.log(JSON.parse(val))
        let frag = document.createDocumentFragment()
        JSON.parse(val).forEach( function(elem) {  
            let newItem = document.createElement('item-sort')
            newItem.innerHTML = elem.name
            newItem.dataset.required_position = elem.required_position
            frag.appendChild(newItem);
          });
          this.element.appendChild(frag)
          
          this.slotNodes = [...this.element.querySelectorAll('item-sort')]
          this.render()
    }

    async render() {
        
        if( !this.slotNodes.length) {

            console.log('stop')
            return
        }
        let task = this.slotNodes.pop()
        let index = this.slotNodes.length

         if ( index !== ~~task.dataset.required_position) {
             await this.moveTaskElem(index) 
            this.slotNodes = [...this.element.querySelectorAll('item-sort')]
         }

         setTimeout(this.render.bind(this), 100)
             
    }
    
    moveTaskElem (position) {
            return  new Promise((resolve, reject) => {
              let taskElems = [...this.element.querySelectorAll('item-sort')]
              let newPos = ~~taskElems[position].dataset.required_position
              taskElems[position].dataset.position = newPos

              console.log('position', position, 'newPos', newPos)

              const from = taskElems[position].getBoundingClientRect();
              const to = taskElems[newPos].getBoundingClientRect();
              console.log('from', from)
              console.log('to', to)


              const tweenAmount = 10;
              const animDelta = (to.top - from.top);

              let moves = new Array(tweenAmount).fill(0).map( (v, i) => animDelta*i/tweenAmount)

              console.log('moves', moves)

              
              this.moveit(resolve, moves, taskElems[position], taskElems[newPos])



          });
        }
        
        moveit(resolve, move, el, el2) {
                  let by1 = move.shift()
                  this.setTranslate( by1, el)
                  this.setTranslate( -by1, el2)
                  if (move.length) {
                      setTimeout(this.moveit.bind(this), 50, resolve, move, el, el2)
                  } else {
                      console.log('complete')
                      this.element.insertBefore(el, el2);
                      this.setTranslate( 0, el)
                      this.setTranslate( 0, el2)
                      resolve(true);
                  }
              }
              
               setTranslate( yPos, el) {
                el.style.transform = `translate(0px, ${yPos}px)`;
            }
    
    /* function.bind() {
            this.dispatchEvent(new CustomEvent('{{name}}-click', { detail: this.element.value }))
        }
     */


});