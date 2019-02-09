# Building a web component

Reading this might help before hand

- https://developer.mozilla.org/en-US/docs/Web/Web_Components

Lets use the classic example of a progress bar.  Traditionally there is `HTML`, `CSS` and `JavaScript` involved. (Example taken from https://www.w3schools.com/howto/howto_js_progressbar.asp)

```html
<div id="myProgress">
  <div id="myBar">10%</div>
</div>
```

```css
#myProgress {
  width: 100%;
  background-color: grey;
}

#myBar {
  width: 10%;
  height: 30px;
  background-color: #4CAF50;
  text-align: center; /* To center it horizontally (if you want) */
  line-height: 30px; /* To center it vertically */
  color: white; 
}
```

```js
function move() {
  var elem = document.getElementById("myBar"); 
  var width = 10;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1 + '%';
    }
  }
}
```

So what happens here?  You want to use this on different projects but each piece must be included by it's different parts.  If there is an upgrade to the functionality you will also have to go back and update every implementation.  This is not ideal but it is the way of the web.

So the new solution is to use `Web Components`.  Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

Those technologies are
- Custom elements
- Shadow DOM
- HTML templates

Lets start with a base template we can use to turn our progress bar into a web component.

```js
window.customElements.define('progress-bar', class extends HTMLElement {

  _generateTemplate() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
      </style>
      <div></div>
    `
    return template
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(this._generateTemplate().content.cloneNode(true))
  }

  connectedCallback() {
  }

  static get observedAttributes() {
    return []
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
    }
  }

})
```

> Note that _generateTemplate() is a custom function that is not part of the spec

The main functions that are supported by the spec are

- connectedCallback
- disconnectedCallback
- adoptedCallback
- attributeChangedCallback
- observedAttributes (static get with an array of values to observe)

Lets get started by adding in the HTML and CSS

```js
window.customElements.define('progress-bar', class extends HTMLElement {

  _generateTemplate() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host .myProgress {
          width: 100%;
          background-color: grey;
        }
        :host .myBar {
          width: 10%;
          height: 30px;
          background-color: #4CAF50;
          text-align: center;
          line-height: 30px;
          color: white; 
        }
      </style>
      <div class="myProgress">
        <div class="myBar">10%</div>
      </div>
    `
    return template
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(this._generateTemplate().content.cloneNode(true))
  }

  connectedCallback() {
  }

  static get observedAttributes() {
    return []
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
    }
  }

})
```

Add the above code to your `test.html` page within the script tag and it will register your new HTML tag to the document.  To test the new tag simply put the tag in the body.

```html
<html>
  <body>
    <progress-bar></progress-bar>
    <script>
      window.customElements.define('progress-bar', class extends HTMLElement {
        ...
      }
    </script>
  </body>
</html>
```

Just from this alone we created a reusable component that will display our `html` and `css`.  To make it useful lets add some JavaScript to change the percentage.

1. Add an attribute to observe the correct percentage, we will call it `data-percent`
2. Make sure to have a reference to the div. this can be done in the constructor
3. create a custom render function to execute based on the attribute update.

```js
window.customElements.define('progress-bar', class extends HTMLElement {

  _generateTemplate() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host .myProgress {
          width: 100%;
          background-color: grey;
        }
        :host .myBar {
          width: 10%;
          height: 30px;
          background-color: #4CAF50;
          text-align: center;
          line-height: 30px;
          color: white; 
        }
      </style>
      <div class="myProgress">
        <div class="myBar">10%</div>
      </div>
    `
    return template
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(this._generateTemplate().content.cloneNode(true))
    this.myBar = this.shadowRoot.querySelector('div.myBar')
  }

  connectedCallback() {
  }

  static get observedAttributes() {
    return ['data-percent']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._render()
    }
  }

  _render() {
    const percentage = `${this.dataset.percent || 1}%`
    this.myBar.innerText = percentage
    this.myBar.style.width = percentage
  }

})
```


on the page you can now select the `progress-bar` element and update the attribute like so

```html
<progress-bar data-percent="5"></progress-bar>
```

```js
window.addEventListener('load', move)

function move() {
  const progress = document.querySelector('progress-bar')
  let width = 10;
  const maxCounter = 100
  const id = setInterval(frame, 50)
  function frame() {
    width = (width + 1) % maxCounter
    progress.dataset.percent = width
  }
}
```


The Above will cause in infinite loop updating the attribute thus the observer updating the shadow dom as implemented. 

## The Result

Web components are a great addition to the web stack.  It should help developers create reusable elements that can be maintained in a single file and used in a more sematic fashion. 

```html
<html>
  <body>
    <progress-bar data-percent="5"></progress-bar>
<script>

window.customElements.define('progress-bar', class extends HTMLElement {

  _generateTemplate() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host .myProgress {
          width: 100%;
          background-color: grey;
        }
        :host .myBar {
          width: 10%;
          height: 30px;
          background-color: #4CAF50;
          text-align: center;
          line-height: 30px;
          color: white;
        }
      </style>
      <div class="myProgress">
        <div class="myBar">10%</div>
      </div>
    `
    return template
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(this._generateTemplate().content.cloneNode(true))
    this.myBar = this.shadowRoot.querySelector('div.myBar')
  }

  connectedCallback() {
  }

  static get observedAttributes() {
    return ['data-percent']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._render()
    }
  }

  _render() {
    const percentage = `${this.dataset.percent || 1}%`
    this.myBar.innerText = percentage
    this.myBar.style.width = percentage
  }

})

    window.addEventListener('load', move)

    function move() {
      const progress = document.querySelector('progress-bar')
      let width = 10;
      const maxCounter = 100
      const id = setInterval(frame, 50)
      function frame() {
        width = (width + 1) % maxCounter
        progress.dataset.percent = width
      }
    }

  </script>
  </body>
</html>
```
