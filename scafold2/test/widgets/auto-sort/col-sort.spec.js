describe('col-sort', () => {

  let el
  const elemTag = 'col-sort'
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

    it('should update itself with content', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.display = 'testing'
      expect(component.innerHTML).to.equal('testing')
    })

    it('should remove the custom class name', async () => {
      const component = document.querySelector(elemTag)
      component.removeClass()
      expect(component.classList.contains('col-sort-animate')).to.be.false
    })

  })

})

