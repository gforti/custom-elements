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
        this.timer = null
        this.timer2 = null
        
        this.renderBind = this.render.bind(this)
        
        this.taskData = new Map();
        // this.functionBind = this.function.bind(this)
    }

    connectedCallback() {
        // console.log('Custom element added to page.')
        // this.element.addEventListener('click', this.functionBind)
        
        //this.slotNodes = [...this.element.querySelectorAll('item-sort')]
        
        //this.render()
    }
    
    disconnectedCallback() {
        // remove event listeners
        // console.log('Custom element removed from page.')
        // this.element.removeEventListener('click', this.functionBind)
    }

    adoptedCallback() {
        // console.log('Custom element moved to new page.')
    }

    static get observedAttributes() {
      return ['data-wow'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.setdata(newValue)
            //this.render()
        }
        //console.log(`${attr} was changed from ${oldValue} to ${newValue}!`)
    }
    
    isPositionsUnique(val) {
        
        let newData = JSON.parse(val)
        const tempMap = new Map(this.taskData.entries())
        
         newData.forEach( (elem) => { 
            tempMap.set(elem.id, elem)
         })
         
         let newPositions = [...tempMap.values()].reduce((accumulator, currentValue) => accumulator.concat(currentValue.required_position),[])
         
         if (new Set(newPositions).size !== newPositions.length) {
             // throw new Error(`Position  conflict with new data`)
             console.log('-------POSITION CONFLICT---------')
             return true
         }
        
         
        
        
        
        JSON.parse(val).forEach( (elem) => { 
           console.log(elem)
            const arr = [...this.taskData.values()].filter(task => task.id !== elem.id)
            const takenPosition = arr.findIndex( (task) => elem.required_position === ~~task.required_position )
            if ( takenPosition === -1)
                this.taskData.set(elem.id, elem)
        })
        
        
    }
    
    setdata(val) {
        
        if ( this.isPositionsUnique(val) ) return
        
        let frag = document.createDocumentFragment()
        JSON.parse(val).forEach( (elem) => {  
            const item = this.element.querySelector(`#task-${elem.id}`)
            if ( !item ) {
                let newItem = document.createElement('item-sort')
                newItem.innerHTML = elem.name
                newItem.setAttribute('id', `task-${elem.id}`)
                newItem.dataset.required_position = elem.required_position
                frag.appendChild(newItem);
            } else {                
                item.dataset.required_position = elem.required_position  
            }
          });
          
          this.element.appendChild(frag)          
          //this.slotNodes = [...this.element.querySelectorAll('item-sort')]
          //clearTimeout(this.timer)
          //clearTimeout(this.timer2)
          console.log('this.timer', this.timer)
          if ( null === this.timer && null === this.timer2){
              console.log('start render')
            this.timer = setTimeout(this.renderBind, 1100)
        }
    }

    async render() {
      
        this.slotNodes = [...this.element.querySelectorAll('item-sort')]
        let index = this.slotNodes.findIndex( (slot,i) => i !== ~~slot.dataset.required_position )
       
      
         if ( index > -1) {
            await this.moveTaskElem(index) 
            this.timer = setTimeout(this.renderBind, 1000)
            console.log('this.timer', this.timer)
         } else {
             this.timer = null
             this.timer2 = null
         }
  
    }
    
    moveTaskElem (position) {
        return  new Promise((resolve, reject) => {
          let taskElems = [...this.element.querySelectorAll('item-sort')]
          let newPos = ~~taskElems[position].dataset.required_position
          //taskElems[position].dataset.position = newPos

         
         console.log('from', position, 'to', newPos)
          const from = taskElems[position].getBoundingClientRect();
          const to = taskElems[newPos].getBoundingClientRect();
         


          const tweenAmount = 10;
          const animDelta = (to.top - from.top);

          let moves = new Array(tweenAmount).fill(0).map( (v, i) => animDelta*i/tweenAmount)

       


          this.moveit(resolve, moves, taskElems[position], taskElems[newPos])



      });
    }
        
        moveit(resolve, move, el, el2) {            
            let by1 = move.shift()
            el.dataset.ypos = by1
            el2.dataset.ypos = -by1
            
            if (move.length) {
                this.timer2 = setTimeout(this.moveit.bind(this), 50, resolve, move, el, el2)
            } else {
               console.log('----COMPLETED-----------------')               
                this.element.insertBefore(el2, el);
                el.dataset.ypos = 0
                el2.dataset.ypos = 0
                resolve(true);
            }
        }
              
            
    
    /* function.bind() {
            this.dispatchEvent(new CustomEvent('{{name}}-click', { detail: this.element.value }))
        }
     */


});