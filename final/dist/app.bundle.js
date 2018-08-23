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

/***/ "./src eager recursive ^.*$":
/*!*****************************************!*\
  !*** ./src eager ^.*$ namespace object ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\".\": \"./src/index.js\",\n\t\"./\": \"./src/index.js\",\n\t\"./index\": \"./src/index.js\",\n\t\"./index.html\": \"./src/index.html\",\n\t\"./index.js\": \"./src/index.js\",\n\t\"./page.html\": \"./src/page.html.js\",\n\t\"./page.html.js\": \"./src/page.html.js\",\n\t\"./route-link.element\": \"./src/route-link.element.js\",\n\t\"./route-link.element.js\": \"./src/route-link.element.js\",\n\t\"./router.service\": \"./src/router.service.js\",\n\t\"./router.service.js\": \"./src/router.service.js\",\n\t\"./test.html\": \"./src/test.html\",\n\t\"./test.html.js\": \"./src/test.html.js\",\n\t\"./test2.html\": \"./src/test2.html.js\",\n\t\"./test2.html.js\": \"./src/test2.html.js\",\n\t\"./todo-item.element\": \"./src/todo-item.element.js\",\n\t\"./todo-item.element.js\": \"./src/todo-item.element.js\"\n};\nvar fakeMap = {\n\t\"./src/index.js\": 9,\n\t\"./src/todo-item.element.js\": 7,\n\t\"./src/index.html\": 7,\n\t\"./src/page.html.js\": 9,\n\t\"./src/route-link.element.js\": 7,\n\t\"./src/router.service.js\": 9,\n\t\"./src/test.html\": 7,\n\t\"./src/test.html.js\": 9,\n\t\"./src/test2.html.js\": 9\n};\n\nfunction webpackAsyncContext(req) {\n\treturn webpackAsyncContextResolve(req).then(function(id) {\n\t\treturn __webpack_require__.t(id, fakeMap[id])\n\t});\n}\nfunction webpackAsyncContextResolve(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(function() {\n\t\tvar id = map[req];\n\t\tif(!(id + 1)) { // check for number or string\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t}\n\t\treturn id;\n\t});\n}\nwebpackAsyncContext.keys = function webpackAsyncContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackAsyncContext.resolve = webpackAsyncContextResolve;\nwebpackAsyncContext.id = \"./src eager recursive ^.*$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack:///./src_eager_^.*$_namespace_object?");

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (1:0)\\nYou may need an appropriate loader to handle this file type.\\n> <!DOCTYPE html>\\n| <html>\\n|     <head>\");\n\n//# sourceURL=webpack:///./src/index.html?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _route_link_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./route-link.element.js */ \"./src/route-link.element.js\");\n/* harmony import */ var _route_link_element_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_route_link_element_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _todo_item_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo-item.element.js */ \"./src/todo-item.element.js\");\n/* harmony import */ var _todo_item_element_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_todo_item_element_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _router_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router.service.js */ \"./src/router.service.js\");\n\n\n\n\n\n\n\nasync function init() {\n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].app = document.querySelector('div')\n    \n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].setPath('test/test', 'test.html.js', test1)\n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].setPath('test/s2', 'test2.html.js', test2)\n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].setPath('?page=1', 'page.html.js', test3)\n}\n\ninit()\n\nfunction test1() {\n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].app.querySelector('todo-item').innerHTML = 'cool'\n}\n\nfunction test2() {\n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].app.querySelector('todo-item').innerHTML = 'two'\n}\n\nfunction test3() {\n    console.log('test 3')\n}\n\ndocument.querySelectorAll('route-link').forEach( link => link.addEventListener('route-clicked', async (e) => {\n    _router_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].goto(e.detail).load(e.detail)            \n}))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/page.html.js":
/*!**************************!*\
  !*** ./src/page.html.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ('<div>Page 1</div>');\n\n//# sourceURL=webpack:///./src/page.html.js?");

/***/ }),

/***/ "./src/route-link.element.js":
/*!***********************************!*\
  !*** ./src/route-link.element.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n * <script src=\"password-reveal.element.js\" defer></script>\n * <route-link data-page=\"\"></route-link>\n */\nfunction generateTemplate() {\n\n    const template = document.createElement('template');\n\n    template.innerHTML = `\n        <a><slot><slot></a>\n    `;\n    return template;\n}\n\nclass RouteLink extends HTMLElement {\n\n    constructor() {\n      super()\n      const shadowRoot = this.attachShadow({ mode: 'open' })\n      shadowRoot.appendChild(generateTemplate().content.cloneNode(true))\n      this.link = this.shadowRoot.querySelector('a')\n    }\n\n    connectedCallback() {\n        this.link.addEventListener('click', this.activateRoute.bind(this))\n        this.render()\n    }\n    \n    activateRoute(e) {\n        this.dispatchEvent(new CustomEvent('route-clicked', { detail: this.page }))        \n        e.preventDefault()        \n    }\n    \n    disconnectedCallback() {\n        this.link.removeEventListener('click', this.activateRoute.bind(this))\n    }\n\n   static get observedAttributes() {\n      return ['data-page'];\n    }\n\n    attributeChangedCallback(attr, oldValue, newValue) {\n        if ( oldValue !== newValue) {\n            this.render()\n        }\n    }\n\n    render() {\n        this.link.href = this.page\n    }\n    \n    get page() {\n      return this.dataset.page;\n    }\n    set page(value) {\n      this.dataset.page = value;\n    }\n\n}\n\n  window.customElements.define('route-link', RouteLink);\n\n\n//# sourceURL=webpack:///./src/route-link.element.js?");

/***/ }),

/***/ "./src/router.service.js":
/*!*******************************!*\
  !*** ./src/router.service.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass RouterService {\n    \n    constructor() { \n        \n        if(this.instance){\n            return this.instance\n        }\n        this.instance = this\n        this.paths = {}\n        this._homePath = window.location.pathname.indexOf('.') > -1 ?\n                         window.decodeURI(window.location.pathname).split('/').slice(0, -1).join('/') :\n                         window.decodeURI(window.location.pathname)\n        this._homePath = this._homePath.endsWith('/') ? this._homePath : this._homePath + '/'\n              \n    }\n\n    get homePath() {\n        return this._homePath // `${window.location.origin}/`\n    }\n\n    goto(path) {\n        window.history.pushState(null, null, `${this.homePath}${path}`)\n        return this\n    }  \n    \n    async setPath(path, file, callback) {\n        let html = await __webpack_require__(\"./src eager recursive ^.*$\")(`${file}`)\n        this.paths[path] = {html: file.default.toString(), callback}\n        return this\n    }\n    \n    getPath(path) {\n        return this.paths[path]\n    }\n    \n    set app(elem) {\n        if (document.body.contains(elem))\n            this._app = elem\n        else\n            throw new Error('elem does not exist')\n    }\n    \n    get app(){\n        return this._app\n    }\n    \n    load(path) {\n        let pathInfo = this.getPath(path)\n        if (document.body.contains(this.app) && pathInfo.html ) this.app.innerHTML = pathInfo.html\n        if ( typeof pathInfo.callback === 'function') pathInfo.callback(path)\n        return this \n    }\n    \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new RouterService());\n\n\n//# sourceURL=webpack:///./src/router.service.js?");

/***/ }),

/***/ "./src/test.html":
/*!***********************!*\
  !*** ./src/test.html ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (1:0)\\nYou may need an appropriate loader to handle this file type.\\n> <todo-item>Testing test</todo-item>\");\n\n//# sourceURL=webpack:///./src/test.html?");

/***/ }),

/***/ "./src/test.html.js":
/*!**************************!*\
  !*** ./src/test.html.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ('<todo-item></todo-item>');\n\n//# sourceURL=webpack:///./src/test.html.js?");

/***/ }),

/***/ "./src/test2.html.js":
/*!***************************!*\
  !*** ./src/test2.html.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ('<todo-item>Testing 2</todo-item>');\n\n//# sourceURL=webpack:///./src/test2.html.js?");

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
/*!*********************************************************************************************************************************************************************!*\
  !*** multi ./src/index.js ./src/page.html.js ./src/route-link.element.js ./src/router.service.js ./src/test.html.js ./src/test2.html.js ./src/todo-item.element.js ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n__webpack_require__(/*! ./src/page.html.js */\"./src/page.html.js\");\n__webpack_require__(/*! ./src/route-link.element.js */\"./src/route-link.element.js\");\n__webpack_require__(/*! ./src/router.service.js */\"./src/router.service.js\");\n__webpack_require__(/*! ./src/test.html.js */\"./src/test.html.js\");\n__webpack_require__(/*! ./src/test2.html.js */\"./src/test2.html.js\");\nmodule.exports = __webpack_require__(/*! ./src/todo-item.element.js */\"./src/todo-item.element.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js_./src/page.html.js_./src/route-link.element.js_./src/router.service.js_./src/test.html.js_./src/test2.html.js_./src/todo-item.element.js?");

/***/ })

/******/ });