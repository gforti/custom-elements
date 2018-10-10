window.customElements.define('auto-sort', class extends HTMLElement {

    generateTemplate() {

        const template = document.createElement('template')

        template.innerHTML = `
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
        this.timer = null      
        this.renderBind = this.render.bind(this)        
        this.taskData = new Map();
    }

    static get observedAttributes() {
      return ['data-items']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.setdata(newValue)            
        }
    }
    
    isPositionsUnique(val) {
        
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
    
    setdata(val) {
        try {
            this.isPositionsUnique(val)
        } catch(e) {
            return
        }
        
        let frag = document.createDocumentFragment()
        JSON.parse(val).forEach( (elem) => {  
            const item = this.element.querySelector(`#task-${elem.id}`)
            if ( !item ) {
                let newItem = document.createElement('item-sort')
                newItem.innerHTML = elem.name
                newItem.setAttribute('id', `task-${elem.id}`)
                newItem.dataset.required_position = elem.required_position
                frag.appendChild(newItem)
            } else {                
                item.dataset.required_position = elem.required_position  
            }
          });
          
          this.element.appendChild(frag)          
        
          if (null === this.timer){
            this.timer = requestAnimationFrame(this.renderBind)
        }
    }

    async render() {
      
        this.slotNodes = [...this.element.querySelectorAll('item-sort')]
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
            const taskElems = [...this.element.querySelectorAll('item-sort')]
            let el = taskElems[position]
            const newPos = ~~el.dataset.required_position
            let el2 = taskElems[newPos]

            const from = el.getBoundingClientRect()
            const to = el2.getBoundingClientRect()         
            const animDelta = (to.top - from.top)

            const complete = (e) => {              
              el.dataset.ypos = 0
              el2.dataset.ypos = 0
              this.element.insertBefore(el2, el)
              el.item.removeEventListener("transitionend", complete)
              resolve(true);
            }
          
            el.item.addEventListener("transitionend", complete)
        
            el.dataset.ypos = animDelta
            el2.dataset.ypos = -animDelta
      });
    }
              
});