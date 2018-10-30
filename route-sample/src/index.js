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

