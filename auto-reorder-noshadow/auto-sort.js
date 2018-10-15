window.customElements.define('auto-sort', class extends HTMLElement {

    generateTemplate() {

        const template = document.createElement('template')

        template.innerHTML = `
            <style>
            row-sort {
                width: 100%;
                   }

                 col-sort {
                    flex: 1;
                    padding: .1rem;
                } 
            row-sort:nth-child(odd) {
                background-color: #eee;
            }

            row-sort:nth-child(even) {
                background-color:#fff;
            }
            </style>
            <article>
            </article>
        `
        return template
    }

    constructor() {
        super()
        //this.attachShadow({ mode: 'open' })
        //this.shadowRoot.appendChild(this.generateTemplate().content.cloneNode(true))
        //this.element = this.shadowRoot.querySelector('article')
        this.slotNodes = []
        this.timer = null      
        this.renderBind = this.render.bind(this)        
        this.taskData = new Map();
    }

    static get observedAttributes() {
      return ['data-items']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.setItemData(newValue)            
        }
    }
    
    get items(){
        return this
    }
    
    validatePositions(val) {
        
        let newData = JSON.parse(val)
        const tempMap = new Map(this.taskData.entries())
        
         newData.forEach( (elem) => { 
            tempMap.set(elem.id, elem)
         })
         
         let newPositions = [...tempMap.values()].reduce((accumulator, currentValue) => accumulator.concat(currentValue.required_position),[])
         let setPos = new Set(newPositions)
         const allPositionsExist = newPositions.every((v) => v < newPositions.length)
         if (!allPositionsExist || setPos.size !== newPositions.length) {
            throw new Error(`Position  conflict with new data`)
            return false
         }
         
        newData.forEach( (elem) => { 
            this.taskData.set(elem.id, elem)
        })
        return true
    }
    
    insertItemSort() {
        
    }
    
    setItemData(val) {
        try {
            this.validatePositions(val)
        } catch(e) {
            return
        }
        
        JSON.parse(val).forEach( (elem) => {  
            const item = this.items.querySelector(`#task-${elem.id}`)
            if ( item ) {
                item.dataset.required_position = elem.required_position
                /*let newItem = document.createElement('item-sort')
                newItem.innerHTML = elem.name
                newItem.setAttribute('id', `task-${elem.id}`)
                newItem.dataset.required_position = elem.required_position
                this.element.appendChild(newItem)*/
            } 
          });
                  
          if (null === this.timer){
            this.timer = requestAnimationFrame(this.renderBind)
        }
    }

    async render() {
      
        this.slotNodes = [...this.items.querySelectorAll('row-sort')]
        let index = this.slotNodes.findIndex( (slot,i) => i !== ~~slot.dataset.required_position )
       
         if ( index > -1) {
            await this.moveTaskElem(index) 
            this.timer = requestAnimationFrame(this.renderBind)
         } else {
             this.timer = null
         }
  
    }
    
    moveTaskElem(position) {
        return  new Promise((resolve, reject) => {
            const taskElems = [...this.items.querySelectorAll('row-sort')]
            let el = taskElems[position]
            if (!el) resolve(false)
            const newPos = ~~el.dataset.required_position
            let el2 = taskElems[newPos]
            if (!el2) resolve(false)

            const from = el.getBoundingClientRect()
            const to = el2.getBoundingClientRect()         
            const animDelta = (to.top - from.top)

            const complete = (e) => {              
              
              this.items.insertBefore(el2, el)
              el.dataset.ypos = 0
              el2.dataset.ypos = 0
              el.item.removeEventListener("transitionend", complete)
              resolve(true);
            }
          
            el.item.addEventListener("transitionend", complete)
        
            el.dataset.ypos = animDelta
            el2.dataset.ypos = -animDelta
      });
    }
              
});