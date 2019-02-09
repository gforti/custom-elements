window.customElements.define('virtual-list', class extends HTMLElement {

  constructor() {
    super()
    this.isKeyDown = false
  }

  generateTemplate() {
    return `
      <style>
      virtual-list .v-container {
        contain: strict;
        height: 14rem;
        overflow-y: auto;
        position: relative;
        will-change: scroll-position;
      }
      virtual-list .v-list {
        cursor: pointer;
        height: 100%;
        left: 0;
        max-height: 100vh;
        max-width: 100vw;
        position: absolute;
        top: 0;
        width: 100%;
      }
      virtual-list .v-item {
        display: block;
        font-size: large;
        padding: 1rem;
      }
      virtual-list .v-item.selected {
          background-color: #eee;
        }
      virtual-list .v-push {
        box-sizing: border-box;
        opacity: 0;
        width: 1px;
      }
      </style>
      <div class="v-container">
        <div class="v-push"></div>
        <div class="v-list"></div>
      </div>
    `
  }

  connectedCallback() {
    this.innerHTML = this.generateTemplate()
    this.container = this.querySelector('div.v-container')
    this.list = this.container.querySelector('div.v-list')
    this.push = this.container.querySelector('div.v-push')
    this.listItems = []
    this.displayAmt = 4 // Add dataset to adjust the height

    this.adjustScrollBind = this.debounce.bind(this, this.adjustScroll.bind(this))
    this.container.addEventListener('scroll', this.adjustScrollBind)
  }

  vItemDown() {
    this.isKeyDown = true
    const selectedDiv = this.list.querySelector('div.selected')
    if (selectedDiv) {
      if (selectedDiv.nextElementSibling && selectedDiv.nextElementSibling.nextElementSibling) {
        selectedDiv.classList.remove('selected')
        selectedDiv.nextElementSibling.classList.add('selected')
      } else if (this.listItems.length >= this.displayAmt && !selectedDiv.nextElementSibling) {
        selectedDiv.classList.remove('selected')
        selectedDiv.previousElementSibling.classList.add('selected')
      } else {
        this.container.scrollTop += this.itemHeight
        this.adjustScroll()
      }
    } else {
      this.viewPortItems[0].classList.add('selected')
    }
  }

  vItemUp() {
    this.isKeyDown = true
    const selectedDiv = this.list.querySelector('div.selected')
    if (selectedDiv) {
      if (this.lastTopItem === 0 && selectedDiv.previousElementSibling && !selectedDiv.previousElementSibling.previousElementSibling) {
        selectedDiv.classList.remove('selected')
        this.viewPortItems[0].classList.add('selected')
        this.container.scrollTop = 0
      } else if (selectedDiv.previousElementSibling && selectedDiv.previousElementSibling.previousElementSibling) {
        selectedDiv.classList.remove('selected')
        selectedDiv.previousElementSibling.classList.add('selected')
      } else if (!selectedDiv.previousElementSibling && this.lastTopItem !== 0) {
        selectedDiv.classList.remove('selected')
        this.viewPortItems[1].classList.add('selected')
      } else {
        this.container.scrollTop -= this.itemHeight
        this.adjustScroll()
      }
    } else {
      this.viewPortItems[0].classList.add('selected')
    }
  }

  triggerSelected() {
    const selectedDiv = this.list.querySelector('div.selected')
    if (selectedDiv) {
      this.dispatchEvent(new CustomEvent('v-item-selected', { detail: selectedDiv.innerText }))
    }
  }

  render(listItems) {
    if (!Array.isArray(listItems) || JSON.stringify(listItems) === JSON.stringify(this.listItems)) {
      return
    }
    this.listItems = listItems
    this.itemHeight = this.discoverElementHeight()
    this.listItemsLength = this.listItems.length
    this.totalHeight = this.itemHeight * this.listItems.length
    this.push.style.height = `${this.totalHeight}px`
    const listViewAmt = Math.min(this.displayAmt, this.listItemsLength)
    this.container.style.height = `${this.itemHeight * listViewAmt}px`
    const listAmtEnd = this.listItems.length - listViewAmt
    this.scrollMax = this.itemHeight * (listAmtEnd)

    this.list.innerHTML = ''
    this.viewPortItems = []
    const viewportList = this.listItems.slice(0, listViewAmt + 1)
    viewportList.forEach(listItem => {
      const div = document.createElement('div')
      div.innerHTML = listItem
      div.classList.add('v-item')
      div.addEventListener('click', this.triggerSelected.bind(this))
      div.addEventListener('mouseover', () => {
        if (!this.isKeyDown) {
          this.viewPortItems.forEach(viewDiv => { viewDiv.classList.remove('selected') })
          div.classList.add('selected')
        }
      })
      div.addEventListener('mouseout', () => {
        if (!this.isKeyDown) {
          div.classList.remove('selected')
        }
      })
      div.addEventListener('mousemove', () => {
        this.isKeyDown = false
      })
      this.list.appendChild(div)
      this.viewPortItems.push(div)
    })
    this.viewPortItemsLength = this.viewPortItems.length
    this.adjustList()
    this.container.scrollTop = 0
    this.lastTopItem = 0
  }

  debounce(func) {
    window.requestAnimationFrame(func)
  }

  disconnectedCallback() {
    this.container.removeEventListener('scroll', this.adjustScrollBind)
  }

  adjustScroll() {
    if (!this.listItems.length) {
      return
    }
    let scrollTop = this.container.scrollTop
    const topItem = Math.floor(scrollTop / this.itemHeight)

    if (topItem !== this.lastTopItem) {
      let translateY = scrollTop
      const viewportItems = this.listItems.slice(topItem, topItem + this.viewPortItemsLength)
      this.viewPortItems.forEach((div, i) => {
        div.style.display = (typeof viewportItems[i] === 'undefined') ? 'none' : 'block'
        div.innerHTML = viewportItems[i]
      })

      if (topItem <= this.lastTopItem) {
        translateY -= this.itemHeight
      }

      this.adjustList(translateY)
    }
    if (topItem === 0) {
      this.adjustList()
    }
    if (this.atScrollEnd()) {
      this.adjustList(this.scrollMax)
    }
    this.lastTopItem = topItem
  }

  adjustList(pos = 0) {
    this.list.style.transform = `translateY(${pos}px)`
  }

  atScrollEnd() {
    return !!(this.container.scrollTop > this.totalHeight)
  }

  discoverElementHeight() {
    const div = document.createElement('div')
    div.innerHTML = '123'
    div.classList.add('v-item')
    div.style.visibility = 'hidden'
    this.list.appendChild(div)
    const height = Math.ceil(div.getBoundingClientRect().height)
    this.list.removeChild(div)
    return height
  }

})
