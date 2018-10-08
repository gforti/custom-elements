/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src lazy recursive":
/*!***********************************!*\
  !*** ./src lazy namespace object ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(function() {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = function() { return []; };\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nmodule.exports = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src lazy recursive\";\n\n//# sourceURL=webpack:///./src_lazy_namespace_object?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _route_link_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./route-link.element.js */ \"./src/route-link.element.js\");\n/* harmony import */ var _route_link_element_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_route_link_element_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _todo_item_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo-item.element.js */ \"./src/todo-item.element.js\");\n/* harmony import */ var _todo_item_element_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_todo_item_element_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _router_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router.service.js */ \"./src/router.service.js\");\n\n\n\n\n\n\n\nasync function init() {\n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].app = document.querySelector('div#main')\n    \n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].setPath('./test.controller.js')\n    //.setPath('test/s2', 'test2.template.html', test2)\n    //.setPath('?page=1', 'page.template.html', test3)\n}\n\ninit()\n\nfunction test1() {\n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].app.querySelector('todo-item').innerHTML = 'cool'\n}\n\nfunction test2() {\n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].app.querySelector('todo-item').innerHTML = 'two'\n}\n\nfunction test3() {\n    console.log('test 3')\n}\n\ndocument.querySelectorAll('route-link').forEach( link => link.addEventListener('route-clicked', async (e) => {\n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].goto(e.detail).load(e.detail)            \n}))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/route-link.element.js":
/*!***********************************!*\
  !*** ./src/route-link.element.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n * <script src=\"password-reveal.element.js\" defer></script>\n * <route-link data-page=\"\"></route-link>\n */\nfunction generateTemplate() {\n\n    const template = document.createElement('template');\n\n    template.innerHTML = `\n        <a><slot><slot></a>\n    `;\n    return template;\n}\n\nclass RouteLink extends HTMLElement {\n\n    constructor() {\n      super()\n      const shadowRoot = this.attachShadow({ mode: 'open' })\n      shadowRoot.appendChild(generateTemplate().content.cloneNode(true))\n      this.link = this.shadowRoot.querySelector('a')\n      this.activateRouteBind = this.activateRoute.bind(this)\n    }\n\n    connectedCallback() {\n        this.link.addEventListener('click', this.activateRouteBind)\n        this.render()\n    }\n    \n    activateRoute(e) {\n        this.dispatchEvent(new CustomEvent('route-clicked', { detail: this.page }))        \n        e.preventDefault()        \n    }\n    \n    disconnectedCallback() {\n        this.link.removeEventListener('click', this.activateRouteBind)\n    }\n\n   static get observedAttributes() {\n      return ['data-page'];\n    }\n\n    attributeChangedCallback(attr, oldValue, newValue) {\n        if ( oldValue !== newValue) {\n            this.render()\n        }\n    }\n\n    render() {\n        this.link.href = this.page\n    }\n    \n    get page() {\n      return this.dataset.page;\n    }\n    set page(value) {\n      this.dataset.page = value;\n    }\n\n}\n\n  window.customElements.define('route-link', RouteLink);\n\n\n//# sourceURL=webpack:///./src/route-link.element.js?");

/***/ }),

/***/ "./src/router.service.js":
/*!*******************************!*\
  !*** ./src/router.service.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass RouterService {\n    \n    constructor() { \n        \n        if(this.instance){\n            return this.instance\n        }\n        this.instance = this\n        this.paths = {}\n        this._homePath = window.location.pathname.indexOf('.') > -1 ?\n                         window.decodeURI(window.location.pathname).split('/').slice(0, -1).join('/') :\n                         window.decodeURI(window.location.pathname)\n        this._homePath = this._homePath.endsWith('/') ? this._homePath : this._homePath + '/'\n              \n    }\n\n    get homePath() {\n        return this._homePath // `${window.location.origin}/`\n    }\n\n    goto(path) {\n        window.history.pushState(null, null, `${this.homePath}${path}`)\n        return this\n    }  \n    \n    async setPath(controller) {\n        let {path, template, callback} = await __webpack_require__(\"./src lazy recursive\")(controller)       \n        this.customFetch( `${template}`).then( (html) => {\n            this.paths[path] = {html, callback}\n        })           \n        return this\n    }\n    \n    getPath(path) {\n        return this.paths[path]\n    }\n    \n    set app(elem) {\n        if (document.body.contains(elem))\n            this._app = elem\n        else\n            throw new Error('elem does not exist')\n    }\n    \n    get app(){\n        return this._app\n    }\n    \n    load(path) {\n        let pathInfo = this.getPath(path)\n        if (document.body.contains(this.app) && pathInfo.html ) {\n            let newApp = this.app.cloneNode(false)\n            newApp.innerHTML = pathInfo.html\n            this.app.parentNode.replaceChild(newApp, this.app)\n            this.app = newApp\n        }\n        if ( typeof pathInfo.callback === 'function') pathInfo.callback(path)\n        return this \n    }\n    \n    customFetch(url) {\n        let myInit = {method: 'GET', mode: 'cors', cache: 'default'}        \n        const myRequest = new Request(url, myInit)\n        return fetch(myRequest)\n                .then(response => {\n                    if (!response.ok)\n                        throw Error(response.statusText)\n                    return response.text()\n                })\n    }\n    \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new RouterService());\n\n\n//# sourceURL=webpack:///./src/router.service.js?");

/***/ }),

/***/ "./src/test.controller.js":
/*!********************************!*\
  !*** ./src/test.controller.js ***!
  \********************************/
/*! exports provided: path, template, callback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"path\", function() { return path; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"template\", function() { return template; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"callback\", function() { return callback; });\n/* harmony import */ var _router_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.service.js */ \"./src/router.service.js\");\n\n\nconst path = 'test/test'\nlet template = 'test.template.html'\nfunction callback() {\n    _router_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].app.querySelector('todo-item').innerHTML = 'cool'\n}\n\n\n\n//# sourceURL=webpack:///./src/test.controller.js?");

/***/ }),

/***/ "./src/todo-item.element.js":
/*!**********************************!*\
  !*** ./src/todo-item.element.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n    function generateTemplate() {\n\n        const template = document.createElement('template');\n\n        template.innerHTML = `\n            <style>                \n                :host .todo {\n                    text-align: center;        \n                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);\n                    transition: 0.3s;\n                    margin: 1rem;\n                    padding: 1rem;\n                    font-size: 2.5rem;\n                    color: red;\n                }\n                :host .todo:hover {\n                    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);\n                }\n\n            </style>\n            <div class=\"todo\">\n                <slot></slot>\n            </div>\n\n        `;\n        return template;\n    }\n\n  class TodoItem extends HTMLElement {\n      \n    constructor() {\n      super();\n      const shadowRoot = this.attachShadow({ mode: 'open' });\n      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));\n    }\n   \n  }\n\n  window.customElements.define('todo-item', TodoItem);\n\n\n\n//# sourceURL=webpack:///./src/todo-item.element.js?");

/***/ }),

/***/ 0:
/*!************************************************************************************************************************************!*\
  !*** multi ./src/index.js ./src/route-link.element.js ./src/router.service.js ./src/test.controller.js ./src/todo-item.element.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n__webpack_require__(/*! ./src/route-link.element.js */\"./src/route-link.element.js\");\n__webpack_require__(/*! ./src/router.service.js */\"./src/router.service.js\");\n__webpack_require__(/*! ./src/test.controller.js */\"./src/test.controller.js\");\nmodule.exports = __webpack_require__(/*! ./src/todo-item.element.js */\"./src/todo-item.element.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js_./src/route-link.element.js_./src/router.service.js_./src/test.controller.js_./src/todo-item.element.js?");

/***/ })

/******/ });