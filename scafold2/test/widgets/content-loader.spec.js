describe('content-loader', () => {

  let el
  const elemTag = 'content-loader'
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

    it('should be loading when set to true', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.loading = 'true'
      const isLoading = component._loader.classList.contains('is-active')
      expect(isLoading).to.be.true
    })

    it('should not be loading when set to false', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.loading = 'false'
      const isLoading = component._loader.classList.contains('is-active')
      expect(isLoading).to.be.false
    })

  })

})

