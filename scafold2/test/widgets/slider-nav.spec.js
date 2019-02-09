describe('slider-nav', () => {

  let el
  const elemTag = 'slider-nav'
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

    it('should toggle the menu to open', async () => {
      const component = document.querySelector(elemTag)
      component._toggleMenu()
      expect(component.classList.contains('open')).to.be.true
    })

    it('should open when swiped by touch', async () => {
      const component = document.querySelector(elemTag)
      const evt = { detail: 'right' }
      component._toggleTouch(evt)
      const isOpen = component.classList.contains('open')
      expect(isOpen).to.be.true
    })

    it('should close when dismissed by touch', async () => {
      const component = document.querySelector(elemTag)
      component._toggleMenu()
      const evt = { detail: 'left' }
      component._toggleTouch(evt)
      const isOpen = component.classList.contains('open')
      expect(isOpen).to.be.false
    })

  })

})

