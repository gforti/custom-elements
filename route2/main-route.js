import './route-link.element.js';
import './todo-item.element.js';
import routerService from './router.service.js';


routerService.setPath('test/test', './test.html.js')


document.querySelectorAll('route-link').forEach( link => link.addEventListener('route-clicked', async (e) => {
    routerService.goto(e.detail)
    let elem = document.querySelector('div')
    let data = await routerService.load(elem, e.detail)
    
    elem.querySelector('todo-item').innerHTML = 'cool'

        
}))
