import './col-sort.js'
import './row-sort.js'

window.customElements.define('auto-sort', class extends HTMLElement {

  constructor() {
    super()
    this.rows = []
    this.rowData = new Map()
    this.headerData = new Map()
  }

  static get observedAttributes() {
    return ['data-rows', 'data-headers']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr === 'data-rows') {
        this.render()
      }
      if (attr === 'data-headers') {
        this.setHeaders()
      }
    }
  }

  connectedCallback() {
    const header = this.querySelector('#header')
    if (!header) {
      const row = document.createElement('div')
      row.setAttribute('id', 'header')
      this.prepend(row)
    }
  }

  async updateRows() {
    return new Promise(async (resolve) => {
      const newData = JSON.parse(this.dataset.rows)

      const diffMap = new Map()

      newData.forEach((elem) => {
        diffMap.set(elem.id, elem)
      })

      let difference = [...this.rowData.keys()].filter(id => !diffMap.has(id))

      const promises = difference.map(this.removeRow.bind(this))
      await Promise.all(promises)

      resolve(true)
    })
  }

  async insertRowSort() {
    return new Promise(async (resolve) => {
      const promises = [...this.rowData.values()].map(this.insertNewRow.bind(this))
      await Promise.all(promises)
      resolve(true)
    })
  }


  insertNewRow(elem) {
    return new Promise((resolve) => {

      const row = this.children.namedItem(`row-${elem.id}`)
      if (!row) {
        const rowSort = document.createElement('row-sort')
        this.headerData.forEach((label, id) => {
          const col = document.createElement('col-sort')
          col.dataset.display = elem[id] || ''
          col.dataset.col = id
          col.dataset.colLabel = label
          rowSort.appendChild(col)
        })
        rowSort.setAttribute('id', `row-${elem.id}`)
        rowSort.dataset.requiredPosition = elem.requiredPosition

        const complete = () => {
          rowSort.removeEventListener('animationend', complete)
          resolve(true)
        }
        rowSort.addEventListener('animationend', complete)
        this.appendChild(rowSort)
      } else {
        resolve(true)
      }

    })

  }

  setHeaders() {

    const headerData = JSON.parse(this.dataset.headers)

    this.headerData = new Map()
    const header = this.querySelector('#header')
    header.innerHTML = ''
    headerData.forEach((elem) => {
      this.headerData.set(elem.id, elem.label)
      const col = document.createElement('col-sort')
      col.dataset.display = elem.label
      header.appendChild(col)
    })

    this.updateCols()
  }

  updateCols() {
    this.rowData.forEach((elem) => {
      const row = this.children.namedItem(`row-${elem.id}`)
      if (row) {
        this.adjustCols(elem.id)
        let cols = [...row.querySelectorAll('col-sort')]
        this.headerData.forEach((label, id) => {
          const col = cols.shift()
          if (col) {
            col.dataset.display = elem[id] || ''
            col.dataset.col = id
            col.dataset.colLabel = label
          }
        })
      }
    })
  }

  adjustCols(id) {
    const row = this.children.namedItem(`row-${id}`)
    if (row) {
      let cols = row.children.length
      let headerLen = this.headerData.size

      if (cols > headerLen) {
        while (cols > headerLen) {
          cols--
          const col = row.children.item(cols)
          col.remove()

        }
      }
      if (cols < headerLen) {
        while (cols < headerLen) {
          row.appendChild(document.createElement('col-sort'))
          cols++
        }
      }
    }

  }

  async render() {

    if (!this.headerData.size) return
    const newData = JSON.parse(this.dataset.rows)

    newData.forEach((elem) => {
      this.rowData.set(elem.id, elem)
    })

    await this.updateRows()
    await this.insertRowSort()

    this.rowData.forEach((elem) => {
      const row = this.querySelector(`#row-${elem.id}`)
      if (row) {
        row.dataset.requiredPosition = elem.requiredPosition
      }
    })

    this.rows = [...this.querySelectorAll('row-sort')]
    const positions = this.rows.reduce((acc, row) => acc.set(row.id, ~~row.dataset.requiredPosition), new Map())
    const correctPositions = Array.from(positions).slice().sort((a, b) => a[1] - b[1])

    const promises = correctPositions.map(this.moveRowElem.bind(this))
    await Promise.all(promises)
    this.updateCols()
    this.dispatchEvent(new CustomEvent('rows-added'))
  }

  moveRowElem(arr, i) {
    const [id] = arr
    return new Promise((resolve) => {
      const el = this.children.namedItem(id)
      const el2 = this.children.item(i + 1)
      if (el && el2 && !el.isSameNode(el2)) {
        el2.insertAdjacentElement('beforebegin', el)
      }
      resolve(true)
    })
  }

  async removeRow(id) {
    return new Promise((resolve) => {
      this.rowData.delete(id)
      const row = this.children.namedItem(`row-${id}`)
      if (row) {
        row.addEventListener('transitionend', () => {
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
