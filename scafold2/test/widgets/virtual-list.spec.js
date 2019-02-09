describe('virtual-list', () => {

  let el
  const elemTag = 'virtual-list'
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

    it('should render an array of items', async () => {
      const component = document.querySelector(elemTag)
      const listItems = Array.from({ length: 20 }, (v, i) => i)
      component.render(listItems)
      expect(component.list.innerHTML.length > 0).to.be.true
    })

    it('should replace list when scrolled down', async () => {
      const component = document.querySelector(elemTag)
      const listItems = Array.from({ length: 20 }, (v, i) => i.toString())
      component.render(listItems)
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      const selectedDiv = component.list.querySelector('div.selected')
      expect(selectedDiv.innerText).to.equal(listItems[6])
    })

    it('should replace list when scrolled up', async () => {
      const component = document.querySelector(elemTag)
      const listItems = Array.from({ length: 20 }, (v, i) => i.toString())
      component.render(listItems)
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemUp()
      const selectedDiv = component.list.querySelector('div.selected')
      expect(selectedDiv.innerText).to.equal(listItems[4])
    })

    it('should select the last item', async () => {
      const component = document.querySelector(elemTag)
      const listItems = Array.from({ length: 3 }, (v, i) => i.toString())
      component.render(listItems)
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      const selectedDiv = component.list.querySelector('div.selected')
      expect(selectedDiv.innerText).to.equal(listItems[1])
    })

    it('should select the first item', async () => {
      const component = document.querySelector(elemTag)
      const listItems = Array.from({ length: 3 }, (v, i) => i.toString())
      component.render(listItems)
      component.vItemUp()
      component.vItemUp()
      component.vItemUp()
      const selectedDiv = component.list.querySelector('div.selected')
      expect(selectedDiv.innerText).to.equal(listItems[0])
    })

    it('should trigger the selected item', async () => {
      const component = document.querySelector(elemTag)
      const listItems = Array.from({ length: 3 }, (v, i) => i.toString())
      component.render(listItems)
      component.vItemDown()
      component.vItemDown()
      component.vItemDown()
      const selectedDiv = component.list.querySelector('div.selected')
      component.addEventListener('v-item-selected', (evt) => {
        expect(selectedDiv.innerText).to.equal(evt.detail)
      })
      component.triggerSelected()
    })


  })

})
