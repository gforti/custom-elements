import templateCache from './templates/templateCache.js'

class RouterService {

    constructor() { 
        
        if(this.instance){
            return this.instance
        }
        this.instance = this
        this.paths = new Map()
        this._basePath = window.location.origin
        
        this.historyChangeBind = this.historyChange.bind(this)
        window.addEventListener('route-clicked', this.historyChangeBind)
        window.addEventListener('popstate', this.historyChangeBind)        
        this.routeDisplay = document.querySelector('route-display')
        
        const path = this.getCurrentPath()
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.goto.bind(this, path))
        } else {
            this.goto(path)
        }
        
    }

    getCurrentPath() {
        return decodeURI(window.location.pathname + window.location.search)
    }
    
    getRoute() {
        let currentPath = this.getCurrentPath().slice( 1 )
        return [...this.paths.keys()]
          .map(this.fromBase64)
          .filter(r => r !== '/')
          .find(route => currentPath === route) || this.getCurrentPath()
    }
    
    historyChange(e) {
        const route = this.getRoute() //e ? e.detail || e.state || '/' : '/'        
        let cb = this.getPath(route) 
        let req = {load: this.load.bind(this), search: new URLSearchParams(window.location.search)}
        const run = (callbacks) => {            
            if ( Array.isArray(callbacks) && callbacks.length ) {              
                const element = callbacks.shift()                
                if(typeof element === 'function') {
                    element(req, () => {
                        run.call(this, callbacks)
                    })
                }
            }
        }
        if (cb) {
            run(cb.slice())
        }
    }

    get basePath() {
        return this._basePath // `${window.location.origin}/`
    }

    goto(path, title='') {
        window.history.pushState( path, title, `${this.basePath}${path}`)
        window.dispatchEvent(new CustomEvent('route-clicked', { detail: path }))
        return this
    } 
    
    toBase64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }    
    
    fromBase64(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
 
    setPath(path, ...callbacks) {
        this.paths.set(this.toBase64(path), callbacks)
        return this
    }

    getPath(path) {
        return this.paths.get(this.toBase64(path))
    }
 
    load(content) {
         if (document.body.contains(this.routeDisplay)) {
             this.routeDisplay.dataset.content = templateCache.get(content)
         }
         return this
    }
}

export default new RouterService()
