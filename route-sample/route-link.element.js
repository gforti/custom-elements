window.customElements.define('route-link', class extends HTMLElement {

    constructor() {
        super()
        this.activateRouteBind = this.activateRoute.bind(this)
        this._homePath = window.location.pathname.indexOf('.') > -1 ?
                         window.decodeURI(window.location.pathname).split('/').slice(0, -1).join('/') :
                         window.decodeURI(window.location.pathname)
        this._homePath = this._homePath.endsWith('/') ? this._homePath : this._homePath + '/'
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
    
    activateRoute(e) {
        document.title = this.dataset.title
        window.history.replaceState({route: this.dataset.route}, this.dataset.title, `${this._homePath}${this.dataset.route}`) 
        window.dispatchEvent(new CustomEvent('route-clicked', { detail: this.dataset.route }))
    }
        

})