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
      return ['data-items', 'data-headers', 'data-remove']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            if ( attr === 'data-items')
                this.setItemData(newValue)  
            if ( attr === 'data-headers')
                this.setHeaders(newValue)
        }
    }
  
    validatePositions(val) {
        
        let newData = JSON.parse(val)
        const tempMap = new Map(this.rowData.entries())
        
         newData.forEach( (elem) => { 
            tempMap.set(elem.id, elem)
         })
         
         let newPositions = [...tempMap.values()].reduce((acc, cv) => acc.concat(cv.requiredPosition),[])
         let setPos = new Set(newPositions)
         if (setPos.size !== newPositions.length) {
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
            const item = this.querySelector(`#row-${elem.id}`)
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

        this.appendChild(frag)
        
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
        const header = this.querySelector('#header')
        if (header) {
            this.replaceChild(row, header);
        } else {
            this.prepend(row)
        }
        
        this.updateCols()
    }

    updateCols() {
        this.rowData.forEach( (elem) => {  
            const row = this.querySelector(`#row-${elem.id}`)
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
            console.log(e)
            return
        }
        
        this.updateCols()
        
        this.rowData.forEach( (elem) => {
            const item = this.querySelector(`#row-${elem.id}`)
            if ( item ) {
                item.dataset.requiredPosition = elem.requiredPosition
            } 
        })

          if (null === this.timer){
            this.timer = requestAnimationFrame(this.renderBind)
        }
    }

    async render() {

        this.rows = [...this.querySelectorAll('row-sort')]
        const positions = this.rows.reduce((acc, row) => acc.concat(~~row.dataset.requiredPosition), [])
        const correctPositions = positions.slice().sort()        
        const index = positions.findIndex( (slot,i) => slot !== correctPositions[i] )        
       // Still need to consider just moving to the spot not switch
        if ( index > -1) {
            const changeto = correctPositions.findIndex( (slot,i) => slot === positions[index] )
           await this.moveTaskElem(index, changeto) 
           this.timer = requestAnimationFrame(this.renderBind)
        } else {
            this.timer = null
        }

    }

    moveTaskElem(position, newPos) {
        return  new Promise((resolve, reject) => {
            const taskElems = [...this.querySelectorAll('row-sort')]
            let el = taskElems[position]
            if (!el) resolve(false)
            let el2 = taskElems[newPos]
            if (!el2) resolve(false)

            const from = el.getBoundingClientRect()
            const to = el2.getBoundingClientRect()
            const animDelta = (to.top - from.top)

            const complete = (e) => {
              this.insertBefore(el2, el)
              el.dataset.ypos = 0
              el2.dataset.ypos = 0
              el.removeEventListener("transitionend", complete)
              resolve(true);
            }
          
            el.addEventListener("transitionend", complete)

            el.dataset.ypos = animDelta
            el2.dataset.ypos = -animDelta
      })
    }
    
    removeRow(id) {
        return  new Promise((resolve, reject) => {
            this.rowData.delete(id)
            const row = this.querySelector(`#row-${id}`)
            if ( row ) {
                row.classList.add('row-sort-exit-animate')
                row.addEventListener("transitionend", (e) => {
                    row.remove()
                    resolve(true)
                })
            } else {
                resolve(true)
            }
        })
    }

})