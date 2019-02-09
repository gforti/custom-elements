
window.customElements.define('route-display', class extends HTMLElement {

  constructor() {
    super()
    this.content = ''
  }

  insertContent(content) {
    if (this.content !== content) {
      this.content = content
      const doc = new DOMParser().parseFromString(this.content, 'text/html')
      const template = doc.querySelector('template')
      const style = doc.querySelector('style')
      this.innerHTML = template.innerHTML.toString()
      if(style) {
        this.insertAdjacentHTML('afterbegin', style.outerHTML)
      }
    }
  }

})
