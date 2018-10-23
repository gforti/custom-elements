import templateCache from './templates/templateCache.js'

class RouterService {

    constructor() { 
        
        if(this.instance){
            return this.instance
        }
        this.instance = this
        this.paths = new Map()
        this._homePath = window.location.pathname.indexOf('.') > -1 ?
                         window.decodeURI(window.location.pathname).split('/').slice(0, -1).join('/') :
                         window.decodeURI(window.location.pathname)
        this._homePath = this._homePath.endsWith('/') ? this._homePath : this._homePath + '/'
        
        this.historyChangeBind = this.historyChange.bind(this)
        window.addEventListener('route-clicked', this.historyChangeBind)
        
        this.routeDisplay = document.querySelector('route-display')

    }

    historyChange(e) {
                
        let cb = this.getPath(e.detail) 
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

    get homePath() {
        return this._homePath // `${window.location.origin}/`
    }

    goto(path, title='') {
        window.history.pushState({route: path}, title, `${this.homePath}${path}`)
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
    }

}

export default new RouterService()
