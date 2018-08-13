import './route2/route-link.element.js';


document.querySelectorAll('route-link').forEach( link => link.addEventListener('route-clicked', async (e) => {
    routerService.goto(e.detail)
    let data = await routerService.load(e.detail)

    let obj = {testing : 'cool', param1: true, param2: 10, out : { in: 'in'} }     
    console.log('eval', parseTemplate(data, obj))                
    console.log('template', template`${data}`)                
    document.querySelector('div').innerHTML = parseTemplate(data, obj)
}))
