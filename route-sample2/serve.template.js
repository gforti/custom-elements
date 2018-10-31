const history = require('connect-history-api-fallback')
const express = require('express')
const opn = require('opn')

const app = express()
const port = process.env.port || 7600
/*
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
*/
app.use(history({
  rewrites: [
    { from: /.*\.html/, to: '' },
    { from: /^[\w\/]+$/, to: '/' },
  ],
  verbose: true,
}))
app.use(express.static(__dirname))
app.listen(port, () => {
  opn(`http://localhost:${port}`)
})
