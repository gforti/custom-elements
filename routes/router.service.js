class RouterService {
    
    constructor() { 
         if(this.instance){
            return this.instance;
          }
        this._homePath = window.location.pathname.indexOf('.') > -1 ?
                         window.decodeURI(window.location.pathname).split('/').slice(0, -1).join('/') :
                         window.decodeURI(window.location.pathname)
        this._homePath = this._homePath.endsWith('/') ? this._homePath : this._homePath + '/'   
        this.instance = this;
    }

    get homePath() {
        return this._homePath
    }

    goto(path) {
        console.log(this.homePath)
        console.log(path)
        window.history.pushState(null, null, `${this.homePath}${path}`);
    }
}

