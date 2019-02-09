describe('card-component', () => {

  let el
  const elemTag = 'card-component'
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
      let elem = document.querySelector(elemTag)
      expect(elem).to.not.be.undefined
      expect(window.customElements.get(elemTag)).to.not.be.undefined
    })

    it('should be an Element node ', async () => {
      let elem = document.querySelector(elemTag)
      expect(elem.nodeType).to.equal(Node.ELEMENT_NODE)
    })

  })

  describe('component', () => {

    it('should include a slot for html', async () => {
      const component = document.querySelector(elemTag)
      component.insertAdjacentHTML('afterbegin', '<h1>Testing</h1>')
      const h1 = component.shadowRoot.querySelector('h1')
      expect(h1).to.not.be.undefined
    })

  })

})

