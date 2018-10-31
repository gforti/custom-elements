import templateCache from './templateCache.js'

class RouterService {

  constructor() {

    if(this.instance) {
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
    return decodeURI(window.location.pathname)
  }

  getRoute() {
    let currentPath = this.getCurrentPath().slice(1)
    return [...this.paths.keys()]
      .map(this.fromBase64)
      .filter(r => r !== '/')
      .find(route => currentPath === route) || this.getCurrentPath()
  }

  historyChange() {
    const route = this.getRoute()
    let handlers = this.getPath(route)
    let req = {load: this.load.bind(this), search: new URLSearchParams(window.location.search)}
    const run = (callbacks) => {
      if (Array.isArray(callbacks) && callbacks.length) {
        const element = callbacks.shift()
        if(typeof element === 'function') {
          element(req, () => {
            run.call(this, callbacks)
          })
        }
      }
    }
    if (handlers) {
      run(handlers.slice())
    }
  }

  get basePath() {
    return this._basePath
  }

  goto(path, title='') {
    window.history.pushState(path, title, `${this.basePath}${path}`)
    window.dispatchEvent(new CustomEvent('route-clicked', { detail: path }))
    return this
  }

  toBase64(str) {
    return window.btoa(unescape(encodeURIComponent(str)))
  }

  fromBase64(str) {
    return decodeURIComponent(escape(window.atob(str)))
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


/*
     https://vanillajstoolkit.com/helpers/router/

     parsePathname = function (pattern, url) {

		// Variables
		var map = {};
		var keys = [];
		var matches = false;

		// If the URL is an exact match for the pattern, return it
		if (url === pattern || url + '/' === pattern) {
			return {
				id: pattern,
				params: {},
				url: url
			};
		}

		// Add a trailing slash to the URL if one is missing
		url = url.slice(-1) === '/' ? url : url + '/';

		// Push variables in the pattern to our key array and replace them with regex match grouping
		var newPattern = pattern.replace('(*)', '.+?').replace(/\(:.+?\)/g, function(match) {
			var key = match.slice(2, -1);
			keys.push(key);
			return '([^/]*)';
		});

		// Test the URL against the pattern.
		// If it's a match, pull the variables out into the map
		var test = url.replace(new RegExp('^' + newPattern + '/$'), function() {
			matches = true;
			for (var i = 0; i < keys.length; i++) {
				map[keys[i]] = arguments[i+1];
			}
		});

		// Return the data
		return {
			id: (matches ? pattern : null),
			params: map,
			url: url
		};
	};
     */
