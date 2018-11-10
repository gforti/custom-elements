const templateCache = new Map()
templateCache.set('arrivals', '<h1>Arrivals</h1><blockquote><big>5 Next Incoming</big></blockquote><content-loader data-loading="true">  <table class="test-table">    <thead>      <tr>        <th>Shipment</th>      </tr>    </thead>    <tbody></tbody>  </table></content-loader>')
templateCache.set('default', '<h1>Home</h1><blockquote><big>Page</big></blockquote>')
export default templateCache