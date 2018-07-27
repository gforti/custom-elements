import './custom-message.element.js';

document.querySelectorAll('custom-message').forEach( (elem) => {
    elem.addEventListener('delete-clicked', ()=>{
        console.log('delete clicked')
    })
})
        
        
       