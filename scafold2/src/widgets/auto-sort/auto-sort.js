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
    return ['data-headers']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr === 'data-headers') {
        this.setHeaders()
      }
    }
  }

  setDataRows() {
    const newData = JSON.parse(this.dataset.rows)

    newData.forEach(elem => {
      this.rowData.set(elem.id, elem)
    })
  }

  insertStyle() {
    const style = `
    <style type="text/css" id="auto-sort">
      auto-sort {
        color: #52545b;
        font-family: sans-serif;
      }

      row-sort,
      auto-sort #header {
        column-gap: 0.4rem;
        display: grid;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
      }

      row-sort {
        border-bottom: 1px solid #ddd;
        padding: 0.2rem 0;
      }

      auto-sort row-sort:last-child {
        border-bottom-width: 0;
      }

      col-sort {
        align-self: center;
        padding: 0.5rem 0;
        word-break: break-all;
      }

      auto-sort row-sort:nth-child(odd) {
        background-color: #fff;
      }

      auto-sort row-sort:nth-child(even) {
        background-color: #fff;
      }

      auto-sort #header {
        border-bottom: 2px solid #ddd;
        font-weight: 600;
      }

      auto-sort #header col-sort {
        border-right: 0 solid #d9d9d9;
        font-size: 0.84rem;
        padding-left: 0;
        text-transform: uppercase;
        white-space: nowrap;
      }

      auto-sort #header col-sort:last-child {
        border-right-width: 0;
      }

      .row-sort-exit-transition {
        opacity: 0;
        transition: opacity 0.2s;
      }

      .row-sort-animate {
        animation-duration: 0.4s;
        animation-name: fade;
      }

      .row-sort-new-animate {
        animation-duration: 0.2s;
        animation-name: slide;
      }

      .col-sort-animate {
        animation-duration: 0.6s;
        animation-name: color;
      }

      @keyframes slide {
        from {
          opacity: 0.2;
          margin-left: -100vw;
          margin-right: 100vw;
        }

        to {
          opacity: 1;
          margin-left: 0;
          margin-right: 0;
        }
      }

      @keyframes fade {
        from {
          opacity: 0.2;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes color {
        from {
          background-color: #357bfe;
        }

        to {
          background-color: transparent;
        }
      }

      @media screen and (max-width: 640px) {
        row-sort {
          border-bottom: 1px solid #ddd;
          display: grid;
          grid-auto-flow: row;
          grid-auto-rows: 0;
          padding: 0;
        }

        row-sort:last-child {
          border-bottom-width: 0;
        }

        auto-sort div#header {
          left: -9999em;
          position: absolute;
          top: -9999em;
        }

        row-sort col-sort {
          display: flex;
          flex-direction: column;
          padding-left: 3rem;
        }

        row-sort col-sort::before {
          content: attr(data-col-label);
          font-weight: bold;
          text-transform: uppercase;
        }

        row-sort col-sort + col-sort {
          margin-top: 0;
        }

        auto-sort row-sort:nth-child(even) {
          background-color: #f4f4f4;
        }
      }
    </style>`
    const elem = document.head || this.parentElement || this
    if (!elem.querySelector('#auto-sort')) {
      elem.insertAdjacentHTML('afterbegin', style)
    }
  }

  connectedCallback() {
    this.insertStyle()
    const header = this.querySelector('#header')
    if (!header) {
      const row = document.createElement('div')
      row.setAttribute('id', 'header')
      this.prepend(row)
    }
  }

  async updateRows(newRowData) {
    return new Promise(async resolve => {

      const diffMap = new Map()

      newRowData.forEach(elem => {
        diffMap.set(elem.id, elem)
      })

      let difference = [...this.rowData.keys()].filter(id => !diffMap.has(id))

      const promises = difference.map(this.removeRow.bind(this))
      await Promise.all(promises)

      resolve(true)
    })
  }

  async insertRowSort() {
    return new Promise(async resolve => {
      const promises = [...this.rowData.values()].map(this.insertNewRow.bind(this))
      await Promise.all(promises)
      resolve(true)
    })
  }


  insertNewRow(elem) {
    return new Promise(resolve => {

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
    headerData.forEach(elem => {
      this.headerData.set(elem.id, elem.label)
      const col = document.createElement('col-sort')
      col.dataset.display = elem.label
      col.dataset.label = elem.id
      header.appendChild(col)
    })

    this.updateCols()
  }

  updateCols() {
    this.rowData.forEach(elem => {
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

  async render(newRowData) {

    if (!this.headerData.size && !Array.isArray(newRowData)) {
      return
    }

    newRowData.forEach(elem => {
      this.rowData.set(elem.id, elem)
    })

    await this.updateRows(newRowData)
    await this.insertRowSort()

    this.rowData.forEach(elem => {
      const row = this.querySelector(`[id="row-${elem.id}"]`)
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
    return new Promise(resolve => {
      const el = this.children.namedItem(id)
      const el2 = this.children.item(i + 1)
      if (el && el2 && !el.isSameNode(el2)) {
        el2.insertAdjacentElement('beforebegin', el)
      }
      resolve(true)
    })
  }

  async removeRow(id) {
    return new Promise(resolve => {
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
