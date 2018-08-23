import './route-link.element.js';
import './todo-item.element.js';
import routerService from './router.service.js';




async function init() {
    routerService.app = document.querySelector('div')
    
    routerService.setPath('test/test', 'test.html.js', test1)
    routerService.setPath('test/s2', 'test2.html.js', test2)
    routerService.setPath('?page=1', 'page.html.js', test3)
}

init()

function test1() {
    routerService.app.querySelector('todo-item').innerHTML = 'cool'
}

function test2() {
    routerService.app.querySelector('todo-item').innerHTML = 'two'
}

function test3() {
    console.log('test 3')
}

document.querySelectorAll('route-link').forEach( link => link.addEventListener('route-clicked', async (e) => {
    routerService.goto(e.detail).load(e.detail)            
}))