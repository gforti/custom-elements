window.customElements.define('auto-sort', class extends HTMLElement {

    constructor() {
        super()        
        this.rows = []
        this.timer = null      
        this.renderBind = this.render.bind(this)        
        this.rowData = new Map()
        this.headerData = new Map()
    }

    static get observedAttributes() {
      return ['data-items', 'data-headers']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            if ( attr === 'data-items')
                this.setItemData(newValue)  
            if ( attr === 'data-headers')
                this.setHeaders(newValue)
        }
    }
    
    get autoSort(){
        return this
    }
  
    validatePositions(val) {
        
        let newData = JSON.parse(val)
        const tempMap = new Map(this.rowData.entries())
        
         newData.forEach( (elem) => { 
            tempMap.set(elem.id, elem)
         })
         
         let newPositions = [...tempMap.values()].reduce((accumulator, currentValue) => accumulator.concat(currentValue.requiredPosition),[])
         let setPos = new Set(newPositions)
         const allPositionsExist = newPositions.every((v) => v < newPositions.length)
         if (!allPositionsExist || setPos.size !== newPositions.length) {
            throw new Error(`Position  conflict with new data`)
            return false
         }
         
        newData.forEach( (elem) => { 
            this.rowData.set(elem.id, elem)
        })
        
        this.insertRowSort()
        return true
    }
    
    insertRowSort() {
               
        let frag = document.createDocumentFragment()
        this.rowData.forEach( (elem) => {
            const item = this.autoSort.querySelector(`#row-${elem.id}`)
            if ( !item ) {
                let rowSort = document.createElement('row-sort')
                this.headerData.forEach( (label, id) => {
                    const col = document.createElement('col-sort')                   
                    col.dataset.display = elem[id] || ''
                    col.classList.add(id)
                    rowSort.appendChild(col)
                })
                rowSort.setAttribute('id', `row-${elem.id}`)
                rowSort.dataset.requiredPosition = elem.requiredPosition
                frag.appendChild(rowSort)
            }            
            
        })
                 
        this.autoSort.appendChild(frag)        
        
    }
    
    setHeaders(val) {
        let headerData = []
        try {
            headerData = JSON.parse(val)  
        } catch(e){
            return
        }
        
        this.headerData = new Map()
        const row = document.createElement('div')
        row.setAttribute('id', `header`)
        headerData.forEach( (elem) => { 
            this.headerData.set(elem.id, elem.label)
            const col = document.createElement('col-sort')
            col.dataset.display = elem.label
            row.appendChild(col)
        });
        const header = this.autoSort.querySelector('#header')
        if (header) {
            this.autoSort.replaceChild(row, header);
        } else {
            this.autoSort.prepend(row)
        }
        
        this.updateCols()
    }
    
    updateCols() {
        this.rowData.forEach( (elem) => {  
            const row = this.autoSort.querySelector(`#row-${elem.id}`)            
            if ( row ) {
                let cols = [...row.querySelectorAll('col-sort')]                
                this.headerData.forEach( (label, id) => {
                    let col = cols.shift()
                    col.dataset.display = elem[id]  || ''
                    col.removeAttribute('class');
                    col.classList.add(id)
                })                
            } 
        })
    }
    
    setItemData(val) {
        try {
            this.validatePositions(val)
        } catch(e) {
            return
        }
        
        this.updateCols()
        
        this.rowData.forEach( (elem) => {  
            const item = this.autoSort.querySelector(`#row-${elem.id}`)
            if ( item ) {
                item.dataset.requiredPosition = elem.requiredPosition                
            } 
        })
                  
          if (null === this.timer){
            this.timer = requestAnimationFrame(this.renderBind)
        }
    }

    async render() {
      
        this.rows = [...this.autoSort.querySelectorAll('row-sort')]
        let index = this.rows.findIndex( (slot,i) => i !== ~~slot.dataset.requiredPosition )
       
         if ( index > -1) {
            await this.moveTaskElem(index) 
            this.timer = requestAnimationFrame(this.renderBind)
         } else {
             this.timer = null
         }
  
    }
    
    moveTaskElem(position) {
        return  new Promise((resolve, reject) => {
            const taskElems = [...this.autoSort.querySelectorAll('row-sort')]
            let el = taskElems[position]
            if (!el) resolve(false)
            const newPos = ~~el.dataset.requiredPosition
            let el2 = taskElems[newPos]
            if (!el2) resolve(false)

            const from = el.getBoundingClientRect()
            const to = el2.getBoundingClientRect()         
            const animDelta = (to.top - from.top)

            const complete = (e) => {              
              
              this.autoSort.insertBefore(el2, el)
              el.dataset.ypos = 0
              el2.dataset.ypos = 0
              el.removeEventListener("transitionend", complete)
              resolve(true);
            }
          
            el.addEventListener("transitionend", complete)
        
            el.dataset.ypos = animDelta
            el2.dataset.ypos = -animDelta
      });
    }
              
});