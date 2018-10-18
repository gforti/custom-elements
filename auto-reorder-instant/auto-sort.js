window.customElements.define('auto-sort', class extends HTMLElement {

    constructor() {
        super()
        this.rows = []
        this.rowData = new Map()
        this.headerData = new Map()
    }

    static get observedAttributes() {
      return ['data-items', 'data-headers']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            if ( attr === 'data-items') {               
                this.setItemData(newValue)  
            }
            if ( attr === 'data-headers')
                this.setHeaders(newValue)
        }
    }
    
    
    connectedCallback() {        
        const header = this.querySelector('#header')
        if (!header) {
            const row = document.createElement('div')
            row.setAttribute('id', `header`)
            this.prepend(row)
        }
    }
    
    async updateRows() {
        return new Promise(async (resolve, reject) => {
            let newData = JSON.parse(this.dataset.items)
            const diffMap = new Map()

            newData.forEach( (elem) => {
                diffMap.set(elem.id, elem)
            })

            let difference = [...this.rowData.keys()].filter(id => !diffMap.has(id))
                 
            const promises = difference.map(this.removeRow.bind(this))
            await Promise.all(promises)
            
            resolve(true)
        })
    }

    async insertRowSort() {
        return new Promise(async (resolve, reject) => {
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
            // promise all based on animation end
           setTimeout(resolve, 150)
        })
        
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
                    col.dataset.display = elem[id] || ''
                    col.removeAttribute('class');
                    col.classList.add(id)
                })
            } 
        })
    }

    async setItemData(val) {
     
        let newData = JSON.parse(val)       
        newData.forEach( (elem) => {
            this.rowData.set(elem.id, elem)
        })
         
        await this.updateRows()
        await this.insertRowSort()
        this.updateCols()
        
        this.rowData.forEach( (elem) => {
            const item = this.querySelector(`#row-${elem.id}`)
            if ( item ) {
                item.dataset.requiredPosition = elem.requiredPosition
            }
        })

       this.render()
        
    }

    async render() {

        this.rows = [...this.querySelectorAll('row-sort')]
        const positions = this.rows.reduce((acc, row) => acc.set(row.id, ~~row.dataset.requiredPosition), new Map())
        const correctPositions = Array.from(positions).slice().sort((a, b)=> a[1] - b[1])
        
        const promises = correctPositions.map(this.moveRowElem.bind(this))
        await Promise.all(promises)
        
    }

    moveRowElem(arr, i) {
        const [id, pos] = arr
    
        return  new Promise((resolve, reject) => {
            const el = this.children.namedItem(id)
            const el2 = this.children.item(i)            
            if ( el && el2 && el !== el2) {
               el2.insertAdjacentElement('afterend', el)
            } 
            resolve(true)            
      })
    }
    
    async removeRow(id) {
        return  new Promise((resolve, reject) => { 
            this.rowData.delete(id)
            const row = this.children.namedItem(`row-${id}`)
            if ( row ) {
                row.addEventListener('transitionend', (e) => {
                    row.remove()
                    resolve(true)
                })
                row.classList.add('row-sort-exit-transition')                
            } else {
                resolve(true)
            }
        })
    }

})