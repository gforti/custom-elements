import './route-link.element.js';
import './todo-item.element.js';
import routerService from './router.service.js';


document.addEventListener('DOMContentLoaded', init)

async function init() {
    routerService.app = document.querySelector('div#main')
    
    routerService.setPath('./test.controller.js')
    //.setPath('test/s2', 'test2.template.html', test2)
    //.setPath('?page=1', 'page.template.html', test3)
}


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