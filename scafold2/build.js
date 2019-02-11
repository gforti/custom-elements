const { readFile, readdir, stat, writeFile } = require('fs')
const { parse, resolve } = require('path')
const { promisify } = require('util')
const DIR = 'src'

const readFileProms = promisify(readFile)
const readdirProms = promisify(readdir)
const writeFileProms = promisify(writeFile)
const statProms = promisify(stat)

main().catch(error => {
  console.error(error)
  process.exit(error)
})

async function main() {

  const files = await getFiles(DIR)
  let html = ['const HtmlCache = new Map()']

  const caches = await Promise.all(files.map(async (file) => {
    const contents = await readFileProms(resolve(DIR, file), 'utf8')
    return `HtmlCache.set('${parse(file).name}', '${escapeHTMLContent(contents)}')`
  }))

  html = html.concat(caches)
  html.push('export default HtmlCache')

  await writeFileProms(resolve(DIR, 'html-cache.js'), html.join('\n'))

  console.log('\x1b[32m The file was saved! \x1b[0m')
  process.exit(0)
}

function escapeHTMLContent(html) {
  return html.split('\n').join('').trim().replace(/'/gi, '\\\'')
}

async function getFiles(dir) {
  const subDirs = await readdirProms(dir)
  const files = await Promise.all(subDirs.map(async (subDirs) => {
    const res = resolve(dir, subDirs)
    return (await statProms(res)).isDirectory() ? getFiles(res) : res
  }))
  return files
    .reduce((a, f) => a.concat(f), [])
    .filter((file) => /.*\.(htm?|html)/ig.test(file))
    .filter((file) => !file.includes('index.html'))
}
