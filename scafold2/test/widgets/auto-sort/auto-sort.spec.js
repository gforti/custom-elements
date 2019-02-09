describe('auto-sort', () => {

  let el
  const elemTag = 'auto-sort'
  const expect = chai.expect

  const taskData = [
    {
      id: 1,
      name: 'London',
      requiredPosition: 2
    },
    {
      id: 2,
      name: 'Moscow',
      requiredPosition: 0
    },
    {
      id: 3,
      name: 'Madrid',
      requiredPosition: 1
    },
    {
      id: 4,
      name: 'Canberra',
      requiredPosition: 3
    }
  ]

  const taskData4 = [
    {
      id: 1,
      name: 'London',
      requiredPosition: 5
    },
    {
      id: 2,
      name: 'Moscow',
      requiredPosition: 4
    },
    {
      id: 3,
      name: 'Madrid',
      requiredPosition: 3
    },
    {
      id: 4,
      name: 'Canberra',
      requiredPosition: 2
    },
    {
      id: 5,
      name: 'Boston',
      requiredPosition: 1
    },
    {
      id: 6,
      name: 'Bronx',
      requiredPosition: 0
    },

  ]

  const headers = [
    { id: 'name', label: 'Name' }
  ]

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

    it('should add rows with content', async () => {
      const component = document.querySelector(elemTag)
      const promise = await new Promise((resolve, reject) => {
        component.dataset.headers = JSON.stringify(headers)
        component.render(taskData)
        component.addEventListener('rows-added', () => {
          expect(component.innerHTML.length).to.be.above(0)
          resolve()
        })
      })
    })

    it('should adjust rows with content', async () => {
      const component = document.querySelector(elemTag)
      component.addEventListener('rows-added', () => {
        // expect(true).to.be.true
        //console.log(component.innerHTML)

      })
      component.dataset.headers = JSON.stringify(headers)
      component.render(taskData)
      component.render(taskData4)

    })

  })

})

