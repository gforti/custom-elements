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
          id: 1,
          deliveryId: 1,
          date: '10/10/2018',
          carrier: 'UPS',
          status: 'On Time',
          eta: '90 hours',
          temp: '60°',
          pallets: 10,
          site: 'London',
          requiredPosition: 1
        },
        {
          id: 2,
          deliveryId: 2,
          date: '10/10/2018',
          carrier: 'UPS',
          status: 'On Time',
          eta: '90 hours',
          temp: '60°',
          pallets: 10,
          site: 'Moscow',
          requiredPosition: 0
        },
        {
          id: 3,
          deliveryId: 3,
          date: '10/10/2018',
          carrier: 'UPS',
          status: 'On Time',
          eta: '90 hours',
          temp: '60°',
          pallets: 10,
          site: 'Madrid',
          requiredPosition: 3
        },
        {
          id: 4,
          deliveryId: 4,
          date: '10/10/2018',
          carrier: 'UPS',
          status: 'On Time',
          eta: '90 hours',
          temp: '60°',
          pallets: 10,
          site: 'Canberra',
          requiredPosition: 4
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
        document.querySelector('auto-sort').dataset.items = JSON.stringify(taskData)
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
      .setPath('/', start)
      .setPath('test/test', one, two, three)
      .setPath('test/s2', three, one, four, five )



const favicon = document.querySelector('#favicon').href

document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? 'Away' : 'Active'
    if ( document.hidden )
        document.querySelector('#favicon').href = favicon
})


setInterval(() => {
    if ( document.hidden ) 
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
        
       
        ctx.save();
        ctx.beginPath();
        /*
         *  x                   The x-coordinate of the center of the circle
         *  y                   The y-coordinate of the center of the circle
         *  r                   The radius of the circle
         *  sAngle              The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
         *  eAngle              The ending angle, in radians
         *  counterclockwise	Optional. Specifies whether the drawing should be counterclockwise or clockwise. 
         *                      False is default, and indicates clockwise, while true indicates counter-clockwise.
         */
        ctx.arc(15, 15, 10, 0, 2 * Math.PI, false); //x, y, radius, sAngle, eAngle, counterclockwise  
        ctx.fillStyle = 'red';
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.font = "12pt Helvetica";
        ctx.fillText('5', 10, 20); //x,y
        ctx.restore();            
        
        document.querySelector('#favicon').href= can.toDataURL()
    })
    
}
