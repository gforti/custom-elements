describe('detail-card', () => {

  let el
  const elemTag = 'detail-card'
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

    it('should update the header with content', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.header = 'testing'
      expect(component.header.innerHTML).to.equal('testing')
    })

    it('should update the caption with content', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.caption = 'testing'
      expect(component.caption.innerHTML).to.equal('testing')
    })

  })

})

