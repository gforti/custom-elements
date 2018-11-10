import './arrivals.css'
import { RouterService } from '../route/index.js'
import { TemplateService } from '../services/index.js'

let waiting

TemplateService.subscribe(payload => {

  const tableData = payload.map((row) =>
    `<tr><td>${row.id}</td></tr>`
  ).join('')

  const tbody = document.querySelector('tbody')
  if (tbody) {
    tbody.innerHTML = tableData
  }

  waiting = setTimeout(()=>{
    document.querySelector('content-loader').dataset.loading = 'false'
  }, 5000)

})

const arrivalsCtrl = (req, next) => {
  req.load('arrivals')
  req.exit(()=>{
    clearTimeout(waiting)
  })
  TemplateService.getList()
  next()
}

RouterService
  .setPath('/arrivals/:id?', arrivalsCtrl)
