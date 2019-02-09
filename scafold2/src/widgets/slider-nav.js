window.customElements.define('slider-nav', class extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(this.generateTemplate().content.cloneNode(true))
    this.menuController = this.shadowRoot.querySelector('div.controller')
    this.aside = this.shadowRoot.querySelector('aside')
    this.closeBtn = this.shadowRoot.querySelector('.close')
    this._menuContent = this.shadowRoot.querySelector('.menu-content')
    this._toggleMenuBind = this._toggleMenu.bind(this)
    this._toggleTouchBind = this._toggleTouch.bind(this)
  }

  generateTemplate() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host {
          --header-height: 80px;
        }
        aside {
          background-color: var(--primary, #222);
          box-shadow: 0px 0px 20px rgba( 0, 0, 0, 0.3 );
          color: var(--on-primary, #fff);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100vh;
          min-width: 100px;
          transition: all 0.2s;
          overflow-y:auto;
          width: 100px;
        }
        aside.open {
          min-width: 300px;
          width: 300px;
        }
        aside header {
          align-items: center;
          border-bottom: 1px solid var(--on-primary, #fff);
          display: flex;
          height: var(--header-height);
          justify-content: center;
        }
        aside.open header {
          justify-content: flex-end;
        }
        .controller {
          background-color: var(--primary, #222);
          cursor: pointer;
          height: 50px;
          position: fixed;
          transition: 0.4s all;
          width: 35px;
          z-index: 1;
        }
        aside.open .controller {
          font-size: 1.8rem;
          padding-right: 1rem;
        }
        section.layout {
          display: flex;
          max-height: 100vh;
        }
        section.layout section.menu-content {
          height: calc(100vh - var(--header-height));
        }
        div.close {
          display: none;
          font-size: 3rem;
          padding: 0.2rem;
          padding-right: 3rem;
          text-align: right;
        }
        .bar {
          background-color: var(--on-primary, #fff);
          border-radius: 30px;
          box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.2);
          display: inline-block;
          height: 5px;
          position: absolute;
          transition: 0.2s all;
          width: 35px;
        }
        .bar:nth-child(1) {
          top: 8px;
        }
        .bar:nth-child(2) {
          top: 20px;
        }
        .bar:nth-child(3) {
          top: 32px;
        }
        aside.open .bar:nth-child(1) {
          top: 20px;
          transform: rotate(-45deg);
        }
        aside.open .bar:nth-child(3) {
          top: 20px;
          transform: rotate(45deg);
        }
        aside.open .bar:nth-child(2) {
          top: 20px;
          opacity: 0;
        }
        .mobile {
          display: none;
        }
        @media screen and (max-width: 800px) {
          .mobile {
            display:contents;
          }
          div.close {
            display: block;
          }
          aside.open .bar:nth-child(1),
          aside.open .bar:nth-child(3) {
            top: 30px;
          }
          aside, aside.open {
            min-height: initial;
            width: 100%;
          }
          aside header,
          aside.open header {
            border-bottom-width: 0;
            justify-content: flex-start;
            margin-bottom: 0;
          }
          section.layout {
            display: block;
            min-height: initial;
          }
          .controller {
            left: 0;
            padding-left: 1rem;
            position: absolute;
          }
          section.layout section.menu-content {
            background-color: var(--primary, #222);
            box-shadow: 0px 0px 20px rgba( 0, 0, 0, 0.3 );
            display: flex;
            flex-direction: column;
            height: 100vh;
            left: 0;
            margin-left: -301px;
            overflow-y:auto;
            position: fixed;
            top: 0;
            transition: margin-left 0.4s;
            width: 300px;
            z-index: 100;
          }
          aside.open section.menu-content {
            margin-left: 0;
          }
        }
       </style>
      <section class="layout">
        <aside>
          <header>
            <div class="controller">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </div>
            <slot class="mobile" name="title"></slot>
          </header>
          <touch-swipe>
            <section class="menu-content">
              <div class="close">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
              </div>
              <slot name="nav"></slot>
            </section>
          </touch-swipe>
        </aside>
        <slot name="content"></slot>
      </section>
    `
    return template
  }

  connectedCallback() {
    this.menuController.addEventListener('click', this._toggleMenuBind)
    this.closeBtn.addEventListener('click', this._toggleMenuBind)
    this._menuContent.addEventListener('touch-swipe', this._toggleTouchBind)
  }

  disconnectedCallback() {
    this.menuController.removeEventListener('click', this._toggleMenuBind)
    this.closeBtn.removeEventListener('click', this._toggleMenuBind)
    this._menuContent.removeEventListener('touch-swipe', this._toggleTouchBind)
  }

  _toggleMenu() {
    this.aside.classList.toggle('open')
    this.classList.toggle('open')
  }

  _toggleTouch(evt) {
    if(['right'].indexOf(evt.detail) > -1) {
      this.aside.classList.add('open')
      this.classList.add('open')
    }
    if(['left'].indexOf(evt.detail) > -1) {
      this.aside.classList.remove('open')
      this.classList.remove('open')
    }
  }

})
