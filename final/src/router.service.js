class RouterService {
    
    constructor() { 
        
        if(this.instance){
            return this.instance
        }
        this.instance = this
        this.paths = {}
        this._homePath = window.location.pathname.indexOf('.') > -1 ?
                         window.decodeURI(window.location.pathname).split('/').slice(0, -1).join('/') :
                         window.decodeURI(window.location.pathname)
        this._homePath = this._homePath.endsWith('/') ? this._homePath : this._homePath + '/'
              
    }

    get homePath() {
        return this._homePath // `${window.location.origin}/`
    }

    goto(path) {
        window.history.pushState(null, null, `${this.homePath}${path}`)
        return this
    }  
    
    async setPath(path, file, callback) {
        let html = await import(/* webpackMode: "eager" */ `${file}`)
        this.paths[path] = {html: file.default.toString(), callback}
        return this
    }
    
    getPath(path) {
        return this.paths[path]
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
    
    load(path) {
        let pathInfo = this.getPath(path)
        if (document.body.contains(this.app) && pathInfo.html ) this.app.innerHTML = pathInfo.html
        if ( typeof pathInfo.callback === 'function') pathInfo.callback(path)
        return this 
    }
    
}

export default new RouterService()
