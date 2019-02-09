
import { Util } from '../../src/services/index.js'

describe('main', () => {

  const expect = chai.expect

  describe('util functions', () => {

    it('should return typeof function', () => {
      expect(typeof Util.getRandomNumberBetween).to.equal('function')
    })

    it('should return random number', () => {
      const num = Util.getRandomNumberBetween()
      expect(num).to.be.above(-1)
      expect(num).to.be.below(10)
    })

    it('should return parsed html', () => {
      const html = Util.stringToHTML('<p>\\Foo B\ar</\p>')
      expect(html).to.equal('<p>\\Foo Bar</p>')
    })

    it('should return safe html', () => {
      expect(Util.safeInnerHTML('<')).to.equal('&lt;')
      expect(Util.safeInnerHTML('"')).to.equal('&quot;')
      expect(Util.safeInnerHTML('\'')).to.equal('&#39;')
    })

    it('should return filtered object', () => {
      const arr = [{ foo: 'bar', zar: 'foo'}]
      const exp = [{ zar: 'foo' }]
      expect(Util.filterArrObjByKeys(['zar'], arr)).to.deep.equal(exp)
    })

    const epoch = new Date('Wed Dec 31 1969 19:00:00')

    it('should return formatted date', () => {
      expect(Util.formatDate(epoch)).to.equal('12/31/69')
    })

    it('should return formatted time', () => {
      expect(Util.formatTime(epoch)).to.equal('7:00 PM')
    })

    describe('Notifications', () => {

      let el
      const elemTag = 'notification-bar'

      beforeEach(() => {
        el = document.createElement(elemTag)
        document.body.appendChild(el)
      })

      afterEach(() => {
        document.body.removeChild(el)
        el = null
      })

      it('should display error message', () => {
        const notification = document.querySelector('notification-bar')
        Util.displayError('This is an error!')
        expect(notification.dataset.status).to.equal('error')
        expect(notification.dataset.duration).to.equal('10')
        expect(notification.dataset.message).to.equal('This is an error!')
      })

      it('should display message', () => {
        const notification = document.querySelector('notification-bar')
        Util.displayNotification('This is a notification!')
        expect(notification.dataset.status).to.equal('success')
        expect(notification.dataset.duration).to.equal('5')
        expect(notification.dataset.message).to.equal('This is a notification!')
      })
    })
  })
})
