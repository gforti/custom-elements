const templateCache = new Map()
templateCache.set('default', '<p>Default Page</p><blockquote>Lets starts here</blockquote>')
templateCache.set('test', '<p>TODO write content</p><ul>    <li> testing1</li>    <li> testing2</li>    <li> testing3 `this` and \'this\'</li>    <li> new list item</li>    </ul>')
templateCache.set('test2', '<h1>KFC</h1><auto-sort></auto-sort>')
export default templateCache