import './route-link.element.js';
import './todo-item.element.js';
import routerService from './router.service.js';




async function init() {
    routerService.app = document.querySelector('div')
    
    routerService.setPath('test/test', 'test.template.html', test1)
    .setPath('test/s2', 'test2.template.html', test2)
    .setPath('?page=1', 'page.template.html', test3)
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