describe('row-sort', () => {

  let el
  const elemTag = 'row-sort'
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

    it('should add add a class name if no class name connected', async () => {
      const component = document.querySelector(elemTag)
      const hasClass = component.classList.contains('row-sort-new-animate')
      expect(hasClass).to.be.true
    })

  })

})

