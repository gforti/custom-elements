
import { RouterService } from '../../../src/services/route/index.js'

describe('RouterService', () => {

  const expect = chai.expect

  describe('functions', () => {

    it('should change the history api', () => {
      RouterService.setPath('/test', (req, next) => {
        expect(true).to.be.true
      })
      RouterService.goto('/test')

    })

    it('should change execute the exit function', () => {
      RouterService.setPath('/test', (req, next) => {
        req.exit(() => {
          expect(true).to.be.true
        })
        next()
      })
      RouterService.goto('/test')
      RouterService.goto('/test2')
    })

    it('should change execute the default path', () => {
      RouterService.defaultPath((req, next) => {
        expect(true).to.be.true
        next()
      })
      RouterService.goto('/')
      RouterService.goto('/test2')
    })

    it('should change have access to route params', () => {
      RouterService.setPath('/test/:id', (req, next) => {
        expect(req.params.get('id')).to.equal('123')
        next()
      })
      RouterService.goto('/test/123')
    })

  })
})
