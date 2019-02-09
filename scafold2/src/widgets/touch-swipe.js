window.customElements.define('touch-swipe', class extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(this._generateTemplate().content.cloneNode(true))
    this._onStartBind = this._onStart.bind(this)
    this._onEndBind = this._onEnd.bind(this)
    this._threshold = 30
    this._coords = {
      endX: 0,
      endY: 0,
      startX: 0,
      startY: 0,
    }
  }

  _generateTemplate() {
    const template = document.createElement('template')
    template.innerHTML = '<slot></slot>'
    return template
  }

  connectedCallback() {
    this._slotElement = this.firstElementChild
    if (this._slotElement) {
      this._slotElement.addEventListener('touchstart', this._onStartBind)
      this._slotElement.addEventListener('touchend', this._onEndBind)
    }
  }

  disconnectedCallback() {
    if (this._slotElement) {
      this._slotElement.removeEventListener('touchstart', this._onStartBind)
      this._slotElement.removeEventListener('touchend', this._onEndBind)
    }
  }

  _onStart(event) {
    this._coords.startX = event.changedTouches[0].clientX
    this._coords.startY = event.changedTouches[0].clientY
  }

  _onEnd(event) {
    this._coords.endX = event.changedTouches[0].clientX
    this._coords.endY = event.changedTouches[0].clientY
    this._dispatch()
  }

  _getEventName() {
    const threshold = this._threshold
    const { startX, startY, endX, endY } = this._coords

    if (endX < startX && Math.abs(endY - startY) < threshold) {
      return 'left'
    }
    if (endX > startX && Math.abs(endX - startX) > threshold) {
      return 'right'
    }
    if (endY < startY && Math.abs(endX - startX) < threshold) {
      return 'up'
    }
    if (endY > startY && Math.abs(endY - startY) > threshold) {
      return 'down'
    }
    if (endY === startY && endX === startX) {
      return 'tap'
    }
    return ''
  }

  _dispatch() {
    const eventName = this._getEventName()
    if (!eventName || !this._slotElement) {
      return
    }
    this._slotElement.dispatchEvent(new CustomEvent('touch-swipe', { detail: eventName }))
  }

})
