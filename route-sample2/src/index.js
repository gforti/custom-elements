import './index.css'

import './route-link.element.js'
import './route-display.element.js'
import './auto-sort/index.js'
import routerService from './router.service.js'

const headers = [
  { id: 'deliveryId', label: 'Delivery ID' },
  { id: 'date', label: 'Date' },
  { id: 'carrier', label: 'Carrier' },
  { id: 'status', label: 'Status' },
  { id: 'eta', label: 'ETA' },
  { id: 'temp', label: 'Temp Conditions' },
  { id: 'pallets', label: 'Pallets' },
  { id: 'site', label: 'Site' },
]

const taskData = [
  {
    carrier: 'UPS',
    date: '10/10/2018',
    deliveryId: 1,
    eta: '90 hours',
    id: 1,
    pallets: 10,
    requiredPosition: 1,
    site: 'London',
    status: 'On Time',
    temp: '60°'
  },
  {
    carrier: 'UPS',
    date: '10/10/2018',
    deliveryId: 2,
    eta: '90 hours',
    id: 2,
    pallets: 10,
    requiredPosition: 0,
    site: 'Moscow',
    status: 'On Time',
    temp: '60°'
  },
  {
    carrier: 'UPS',
    date: '10/10/2018',
    deliveryId: 3,
    eta: '90 hours',
    id: 3,
    pallets: 10,
    requiredPosition: 3,
    site: 'Madrid',
    status: 'On Time',
    temp: '60°'
  },
  {
    carrier: 'UPS',
    date: '10/10/2018',
    deliveryId: 4,
    eta: '90 hours',
    id: 4,
    pallets: 10,
    requiredPosition: 4,
    site: 'Canberra',
    status: 'On Time',
    temp: '60°'
  }
]

const one = (req, next) => {
  req.test = 'cool'
  next()
}

const two = (req, next) => {
  req.works = 'wow'
  req.load('test')
  next()
}

const three = (req, next) => {

  next()
}

const four = (req, next) => {
  req.load('test2')
  next()
}


const five = (req, next) => {
  document.querySelector('auto-sort').dataset.headers = JSON.stringify(headers)
  document.querySelector('auto-sort').dataset.rows = JSON.stringify(taskData)
  next()
}

const start = (req, next) => {
  if (req.search.get('page') === '1') {

    req.load('test2')
    five(req, next)
  } else {
    req.load('default')
  }
}

routerService
  .setPath('test/test', one, two, three)
  .setPath('test', three, one, four, five)
  .defaultPath(start)


const favicon = document.querySelector('#favicon').href

document.addEventListener('visibilitychange', () => {
  document.title = document.hidden ? 'Away' : 'Active'
  if (document.hidden)
    document.querySelector('#favicon').href = favicon
})


setInterval(() => {
  if (document.hidden)
    updateFavicon()
  else
    document.querySelector('#favicon').href = favicon
}, 1000)


function updateFavicon() {
  const can = document.createElement('canvas')
  can.width = '32'
  can.height = '32'
  let ctx = can.getContext('2d')
  let img = document.createElement('img')
  img.src = favicon
  img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0)


    ctx.save()
    ctx.beginPath()
    /*
       x, y, radius, sAngle, eAngle, counterclockwise
    *  x                   The x-coordinate of the center of the circle
    *  y                   The y-coordinate of the center of the circle
    *  r                   The radius of the circle
    *  sAngle              The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
    *  eAngle              The ending angle, in radians
    *  counterclockwise	Optional. Specifies whether the drawing should be counterclockwise or clockwise.
    *                      False is default, and indicates clockwise, while true indicates counter-clockwise.
    */
    ctx.arc(15, 15, 10, 0, 2 * Math.PI, false)
    ctx.fillStyle = 'red'
    ctx.fill()

    ctx.fillStyle = 'white'
    ctx.font = '12pt Helvetica'
    ctx.fillText('5', 10, 20)
    ctx.restore()

    document.querySelector('#favicon').href= can.toDataURL()
  })

}
