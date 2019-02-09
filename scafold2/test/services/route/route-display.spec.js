import '../../../src/services/route/index.js'

describe('route-display', () => {

  let el
  const elemTag = 'route-display'
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

    it('should safely insert html', async () => {
      const component = document.querySelector(elemTag)
      component.insertContent('<h1>Testing</h1>')
      expect(component.innerHTML).to.equal('<h1>Testing</h1>')
    })

  })

})
