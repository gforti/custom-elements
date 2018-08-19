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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fetch.service.js":
/*!******************************!*\
  !*** ./src/fetch.service.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return HttpFetch; });\nclass HttpFetch {\n\n    get(url) {\n        return this.customFetch(url, null, 'GET').then(response => response.json())\n    }\n\n    post(url, data) {\n        return this.customFetch(url, data, 'POST').then(response => response.json())\n    }\n\n    put(url, data) {\n        return this.customFetch(url, data, 'PUT').then(response => response.json())\n    }\n\n    delete(url) {\n        return this.customFetch(url, null, 'DELETE').then(response => response.json())\n    }\n\n    customFetch(url, data, verb) {\n        let myHeaders = new Headers()\n        myHeaders.set('Content-Type', 'application/json')\n        let myInit = {method: verb, headers: myHeaders, mode: 'cors', cache: 'default'}\n        if (data) {\n            myInit.body = JSON.stringify(data)\n        }\n        const myRequest = new Request(url, myInit)\n        return fetch(myRequest)\n                .then(response => {\n                    if (!response.ok)\n                        throw Error(response.statusText)\n                    return response\n                })\n    }\n}\n\n//# sourceURL=webpack:///./src/fetch.service.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.controller.js */ \"./src/todo.controller.js\");\n\n\n\ndocument.addEventListener('DOMContentLoaded', async ()=>{\n    await new _todo_controller_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().init()\n})\n\n        \n        \n       \n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/todo-item.element.js":
/*!**********************************!*\
  !*** ./src/todo-item.element.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function generateTemplate() {\n\n    const template = document.createElement('template');\n\n    template.innerHTML = `\n        <style>\n            :host .todo {\n                text-align: center;\n                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);\n                transition: 0.5s;\n                margin: 1rem;\n                padding: 1rem;\n                font-size: 1.5rem;\n                color: red;\n            }\n            :host .todo:hover {\n                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);\n                cursor: pointer;\n            }\n            :host .strike {\n                text-decoration: line-through !important;\n                color: silver;\n            }\n\n        </style>\n        <div class=\"todo\">\n            <slot></slot>\n        </div>\n\n    `;\n    return template;\n}\n\nclass TodoItem extends HTMLElement {\n\n    constructor() {\n      super();\n      const shadowRoot = this.attachShadow({ mode: 'open' });\n      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));\n      this.div = this.shadowRoot.querySelector('.todo')\n    }\n\n    connectedCallback() {\n        this.addEventListener('click', this.completed.bind(this))\n    }\n\n    disconnectedCallback() {\n        this.removeEventListener('click', this.completed.bind(this))\n    }\n\n    static get observedAttributes() {\n      return ['data-completed'];\n    }\n\n    attributeChangedCallback(attr, oldValue, newValue) {\n        if ( oldValue !== newValue) {\n            this.render()\n        }\n    }\n\n    completed() {\n        this.dataset.completed = this.dataset.completed === 'true' ? false : true\n        this.dispatchEvent(new CustomEvent('item-clicked'))\n    }\n\n    render() {\n        if ( this.dataset.completed === 'true' ) {\n            this.div.classList.add('strike')\n        } else {\n            this.div.classList.remove('strike')\n        }\n    }\n\n}\n\nwindow.customElements.define('todo-item', TodoItem);\n\n\n\n//# sourceURL=webpack:///./src/todo-item.element.js?");

/***/ }),

/***/ "./src/todo-list.element.js":
/*!**********************************!*\
  !*** ./src/todo-list.element.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function generateTemplate() {\n\n    const template = document.createElement('template');\n\n    template.innerHTML = `\n        <style>\n            :host .todo-title {\n              font-size: 2.5rem;\n              color: hotpink;\n              font-family: monospace;\n              text-align: center;\n              text-decoration: pink solid underline;\n              text-decoration-skip: ink;\n            }\n            :host .todo {\n                text-align: center;        \n                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);\n                transition: 0.3s;\n                margin: 1rem;\n                padding: 1rem;\n            }\n            :host .todo:hover {\n                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);\n            }\n\n        </style>\n        <div class=\"todo\">\n            <header class=\"todo-header\">\n                Todo: <input name=\"todo\" /> <button>Add</button>\n            </header>                               \n        </div>\n\n    `;\n    return template;\n}\n\nclass TodoList extends HTMLElement {\n    constructor() {\n      super();\n      const shadowRoot = this.attachShadow({ mode: 'open' });\n      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));\n      this.todoInput = this.shadowRoot.querySelector('input[name=\"todo\"]');\n      this.btnSubmit = this.shadowRoot.querySelector('button');\n    }\n\n    connectedCallback() {\n        this.btnSubmit.addEventListener('click', this.submitTodoItem.bind(this))\n    }\n    \n    disconnectedCallback() {\n        this.btnSubmit.removeEventListener('click', this.submitTodoItem.bind(this))\n    }\n    \n    submitTodoItem() {\n        this.dispatchEvent(new CustomEvent('add-todo', { detail: this.todoInput.value }))\n    }\n      \n}\n\nwindow.customElements.define('todo-list', TodoList);\n\n\n\n//# sourceURL=webpack:///./src/todo-list.element.js?");

/***/ }),

/***/ "./src/todo.controller.js":
/*!********************************!*\
  !*** ./src/todo.controller.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TodoController; });\n/* harmony import */ var _todo_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.service.js */ \"./src/todo.service.js\");\n/* harmony import */ var _todo_item_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo-item.element.js */ \"./src/todo-item.element.js\");\n/* harmony import */ var _todo_item_element_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_todo_item_element_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _todo_list_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo-list.element.js */ \"./src/todo-list.element.js\");\n/* harmony import */ var _todo_list_element_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_todo_list_element_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nclass TodoController {\n        \n    constructor() {\n        this.todoService = new _todo_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n        this.todoListDisplay = document.querySelector('section')\n    }\n    \n   async init() { \n        await this.todoService.fetchTodos()\n        let todoList = document.querySelector('todo-list')        \n\n        todoList.addEventListener('add-todo', (e)=> {\n            console.log(e.detail)\n            this.todoService.addTodo({\"title\": e.detail, \"completed\" : false})\n            this.addToDisplay()\n        })\n        \n        this.listdisplay()\n   }\n   \n   listdisplay() {\n       const todos = this.todoService.getTodos()\n       this.todoListDisplay.innerHTML = `${todos.map(todo => `<todo-item data-completed=\"${todo.completed}\">${todo.title}</todo-item>`).join(' ')}`\n       \n       document.querySelectorAll('todo-item').forEach( (item, index) => {\n           item.addEventListener('item-clicked', (e) => {\n               this.todoService.updateItem({\"completed\": e.target.dataset.completed}, index)\n           })\n       })   \n    }\n        \n   addToDisplay() {\n       const todo = this.todoService.getTodos().slice(-1).pop()\n       const index = this.todoService.getTodos().length - 1\n       this.todoListDisplay.innerHTML += `<todo-item data-completed=\"${todo.completed}\">${todo.title}</todo-item>`\n       \n       document.querySelector('todo-item:last-child').addEventListener('item-clicked', (e) => {\n            this.todoService.updateItem({\"completed\": e.target.dataset.completed}, index)           \n       })\n   }\n}\n\n//# sourceURL=webpack:///./src/todo.controller.js?");

/***/ }),

/***/ "./src/todo.service.js":
/*!*****************************!*\
  !*** ./src/todo.service.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TodoService; });\n/* harmony import */ var _fetch_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch.service.js */ \"./src/fetch.service.js\");\n\n\nclass TodoService extends _fetch_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    \n    constructor() { \n        super()\n         if(this.instance){\n            return this.instance;\n          }\n        this.todo = [] \n        this.instance = this;\n    }\n\n    addTodo(item) {\n        if ( Array.isArray(item) ) {\n            item.forEach( todo => {\n                this.todo.push(todo)\n            })            \n        } else {\n            this.todo.push(item)\n        }\n    }\n\n    getTodos() {\n        return this.todo\n    }\n    \n    async fetchTodos() {\n        let data = await this.get('todo.json')\n        this.addTodo(data)\n    }\n    \n    updateItem(obj, index) {\n        Object.entries(obj).forEach( ([key, value]) => {\n                if ( this.todo[index].hasOwnProperty(key) )\n                    this.todo[index][key] = value\n            })\n        \n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/todo.service.js?");

/***/ })

/******/ });