import routerService from './router.service.js';

export const path = 'test/test'
export let template = 'test.template.html'
export function callback() {
    routerService.app.querySelector('todo-item').innerHTML = 'cool'
}

