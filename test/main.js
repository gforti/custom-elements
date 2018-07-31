import './password-reveal.element.js';

let passwordElem = document.querySelector('password-reveal')
passwordElem.addEventListener('click', (e)=>{
    console.log(e)
    console.log(passwordElem.inputElement.type)
})

console.log(passwordElem.inputElement.name)
passwordElem.inputElement.name = "cool"
console.log(passwordElem.inputElement.name)

passwordElem.inputElement.addEventListener('input', function(){
    console.log(this.value)
})
        
// passwordElem.inputElement.value = ''