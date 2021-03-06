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
    
    setPath(path, file, callback) {
        this.paths[path] = {file, callback}
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
    
    async load(path) {
        let pathInfo = this.getPath(path)
        let data = await import(`${this.homePath}${pathInfo.file}`)
        // console.log(data.default)
        if (document.body.contains(this.app)) this.app.innerHTML = data.default.toString()
        if ( typeof pathInfo.callback === 'function') pathInfo.callback(path)
        return data 
    }
    
}

export default new RouterService()
