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
        let req = {load: this.load.bind(this)}
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

    goto(path) {
        window.history.pushState({route: path}, null, `${this.homePath}${path}`)
        return this
    }  
    
    setPath(path, ...callbacks) {
        this.paths.set(path, callbacks)
        return this
    }
    
    getPath(path) {
        return this.paths.get(path)
    }
    
    set app(elem) {
        if (document.body.contains(elem))
            this._app = elem
        else
            throw new Error('elem does not exist')
    }
    
    get app(){
        return this._app
    }
    
    load(content) {
         if (document.body.contains(this.routeDisplay)) {
             this.routeDisplay.dataset.content = content
         }            
    }
    
}

export default new RouterService()
