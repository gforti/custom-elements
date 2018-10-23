const fs = require('fs')
const path = require('path')

const DIR = 'src/templates'

let dirCont = fs.readdirSync( DIR )
let files = dirCont.filter( ( file ) => /.*\.(htm?|html)/ig.test(file))

let html = 'const templateCache = new Map();\n'

files.forEach( (file) => {
    const contents = fs.readFileSync( path.resolve(DIR, file), 'utf8');
    
    html += `templateCache.set('${path.parse(file).name}', \`${escapeHTMLConent(contents)}\`);\n`
    
})

html += 'export default templateCache'

function escapeHTMLConent(html) {
    return html.split("\n").join("").trim().replace(/`/gi, '\\`')
}



fs.writeFile(path.resolve(DIR, 'templateCache.js'), html, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
})