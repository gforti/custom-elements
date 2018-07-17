class RouterService extends HttpFetch {
    
    constructor() { 
        super()
        if(this.instance){
            return this.instance
        }
        this.instance = this
        this._homePath = window.location.pathname.indexOf('.') > -1 ?
                         window.decodeURI(window.location.pathname).split('/').slice(0, -1).join('/') :
                         window.decodeURI(window.location.pathname)
        this._homePath = this._homePath.endsWith('/') ? this._homePath : this._homePath + '/'        
    }

    get homePath() {
        return this._homePath
    }

    goto(path) {
        console.log(this.homePath)
        console.log(path)
        window.history.pushState(null, null, `${this.homePath}${path}`)
    }
    
    async load(path) {
        let file = '', folder = `${this.homePath}temp/` 
        switch(path) {
            case 'test':
                file = 'test.html'
            break;
            case 'test/1/cool':
                file = 'test1.html'
            break;
            case 'test/s2':
                file = 'test1.html'
            break;
        }
        let data = await this.customFetch(`${folder}${file}`, null, 'GET').then(response => response.text())
        console.log(data)
        return data
    }
}

