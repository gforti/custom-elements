
window.customElements.define('route-display', class extends HTMLElement {

  constructor() {
    super()
    this.content = ''
  }

  insertContent(content) {
    if (this.content !== content) {
      this.content = content
      const doc = new DOMParser().parseFromString(this.content, 'text/html')
      this.innerHTML = doc.body.innerHTML.toString()
    }
  }

})
