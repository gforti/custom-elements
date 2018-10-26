import templateCache from './templates/templateCache.js'

class RouterService {

    constructor() { 
        
        if(this.instance){
            return this.instance
        }
        this.instance = this
        this.paths = new Map()
        this._basePath = window.location.pathname.indexOf('.') > -1 ?
                         window.decodeURI(window.location.pathname).split('/').slice(0, -1).join('/') :
                         window.decodeURI(window.location.pathname)
        this._basePath = this._basePath.endsWith('/') ? this._basePath : this._basePath + '/'
        if ( this._basePath === '/') {
            this._basePath = ''
        }
        
        this.historyChangeBind = this.historyChange.bind(this)
        window.addEventListener('route-clicked', this.historyChangeBind)
        window.addEventListener('popstate', this.historyChangeBind)        
        this.routeDisplay = document.querySelector('route-display')
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.goto.bind(this, '/'))
        } else {
            this.goto('/')
        }
        
    }

    historyChange(e) {
        const route =   e ? e.detail || e.state || '/' : '/' 
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
        console.log(`${this.basePath}${path}`)
        window.history.pushState( path, title, `${this.basePath}${path}`)
        window.dispatchEvent(new CustomEvent('route-clicked', { detail: path }))
        return this
    }  
 
    setPath(path, ...callbacks) {
        this.paths.set(path, callbacks)
        return this
    }

    getPath(path) {
        return this.paths.get(path)
    }
 
    load(content) {
         if (document.body.contains(this.routeDisplay)) {
             this.routeDisplay.dataset.content = templateCache.get(content)
         }
         return this
    }
}

export default new RouterService()
