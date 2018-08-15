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
        window.addEventListener('popstate', (e)=> {
           console.log(e)
       })
    }

    get homePath() {
        return this._homePath // `${window.location.origin}/`
    }

    goto(path) {
        window.history.pushState(null, null, `${this.homePath}${path}`)
    }  
    
    setPath(path, file) {
        this.paths[path] = file
        return this
    }
    
    getPath(path) {
        return this.paths[path]
    }
    
    async load(elem, path) {
        let file = this.getPath(path)
        let data = await import(`${this.homePath}${file}`)
        console.log(data.default)
        if (elem) elem.innerHTML = data.default.toString()
        return data 
    }
    
}

export default new RouterService()
