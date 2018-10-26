window.customElements.define('route-link', class extends HTMLElement {

    constructor() {
        super()
        this.activateRouteBind = this.activateRoute.bind(this)
        this._basePath = window.location.pathname.indexOf('.') > -1 ?
                         window.decodeURI(window.location.pathname).split('/').slice(0, -1).join('/') :
                         window.decodeURI(window.location.pathname)
        this._basePath = this._basePath.endsWith('/') ? this._basePath : this._basePath + '/'
    }
    
    static get observedAttributes() {
      return ['data-title']
    }
    
    connectedCallback() {       
        this.addEventListener('click', this.activateRouteBind)
         
    }
    
    disconnectedCallback() {
        this.removeEventListener('click', this.activateRouteBind)
    }
        

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
                     
        }        
    }    
    
    activateRoute() {
        document.title = this.dataset.title
        window.history.pushState(this.dataset.route, this.dataset.title, `${this._basePath}${this.dataset.route}`) 
        window.dispatchEvent(new CustomEvent('route-clicked', { detail: this.dataset.route }))
    }
        

})