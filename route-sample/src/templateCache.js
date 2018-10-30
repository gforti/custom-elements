const templateCache = new Map()
templateCache.set('default', '<p>Default Page</p>')
templateCache.set('test', '<p>TODO write content</p><ul>    <li> testing1</li>    <li> testing2</li>    <li> testing3 `this` and \'this\'</li>    </ul>')
templateCache.set('test2', '<auto-sort></auto-sort>')
export default templateCache