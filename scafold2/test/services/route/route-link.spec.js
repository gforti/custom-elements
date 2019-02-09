import '../../../src/services/route/index.js'

describe('route-link', () => {

  let el
  const elemTag = 'route-link'
  const expect = chai.expect

  beforeEach(() => {
    el = document.createElement(elemTag)
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
    el = null
  })

  describe('interface', () => {

    it('should be defined', async () => {
      const elem = document.querySelector(elemTag)
      expect(elem).to.not.be.undefined
      expect(window.customElements.get(elemTag)).to.not.be.undefined
    })

    it('should be an Element node ', async () => {
      const elem = document.querySelector(elemTag)
      expect(elem.nodeType).to.equal(Node.ELEMENT_NODE)
    })

  })

  describe('component', () => {

    it('should change the history API when clicked', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.title = 'test'
      component.dataset.route = '/test'
      window.addEventListener('url-change', (evt) => {
        expect(window.location.href.includes(evt.detail)).to.be.true
      })
      component.dispatchEvent(new Event('click'))
    })

    it('should change the page title when clicked', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.title = 'test'
      component.dataset.route = '/test'
      component.dispatchEvent(new Event('click'))
      expect(document.title).to.equal('test')
    })

  })

})
