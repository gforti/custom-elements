describe('notification-bar', () => {

  let el
  const elemTag = 'notification-bar'
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

    it('should update with a custom message', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.message = 'testing'
      expect(component.message.innerHTML).to.equal('testing')
    })

    it('should close when dismissed by click', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.message = 'testing'
      component.dismiss.dispatchEvent(new Event('click'))
      const isActive = component.banner.classList.contains('show-bottom')
      expect(isActive).to.be.false
    })

    it('should close when dismissed by touch', async () => {
      const component = document.querySelector(elemTag)
      const evt = { detail: 'down' }
      component.dataset.message = 'testing'
      component.closeTouch(evt)
      const isActive = component.banner.classList.contains('show-bottom')
      expect(isActive).to.be.false
    })

    it('should show on top when position specified', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.position = 'top'
      component.dataset.message = 'testing'
      const isTop = component.banner.classList.contains('show-top')
      expect(isTop).to.be.true
    })

    it('should show set status to warn', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.status = 'warn'
      component.dataset.message = 'testing'
      const checkStatus = component.banner.classList.contains('warn')
      expect(checkStatus).to.be.true
    })

    it('should show set status to error', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.status = 'error'
      component.dataset.message = 'testing'
      const checkStatus = component.banner.classList.contains('error')
      expect(checkStatus).to.be.true
    })

    it('should show set status to success', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.status = 'success'
      component.dataset.message = 'testing'
      const checkStatus = component.banner.classList.contains('success')
      expect(checkStatus).to.be.true
    })

    it('should show set status to default of primary', async () => {
      const component = document.querySelector(elemTag)
      component.dataset.status = 'primary'
      component.dataset.message = 'testing'
      const checkStatus = component.banner.classList.contains('primary')
      expect(checkStatus).to.be.true
    })

  })

})
