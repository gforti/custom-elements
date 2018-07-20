(async () => {

    function generateTemplate() {

        const template = document.createElement('template');

        template.innerHTML = `
           <svg width="960" height="500" viewBox="-480 -250 960 500">
            <circle r="100" stroke="brown" stroke-opacity="0.5" fill="none"></circle>
            <circle r="200" stroke="steelblue" stroke-opacity="0.5" fill="none"></circle>
          </svg>

        `;
        return template;
    }

  class ChartTest extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      
      var nodes = [].concat(
        d3.range(80).map(function() { return {type: "a"}; }),
        d3.range(160).map(function() { return {type: "b"}; })
      );

      var node = d3.select(this.shadowRoot.querySelector("svg"))
        .append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
          .attr("r", 2.5)
          .attr("fill", function(d) { return d.type === "a" ? "brown" : "steelblue"; })

      var simulation = d3.forceSimulation(nodes)
          .force("charge", d3.forceCollide().radius(5))
          .force("r", d3.forceRadial(function(d) { return d.type === "a" ? 100 : 200; }))
          .on("tick", ticked);

      function ticked() {
        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      }


    }

    connectedCallback() {
        console.log('Custom square element added to page.');
        
        this.render()
    }
    
   
    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

    // Getter to let component know what attributes
    // to watch for mutation
    static get observedAttributes() {
      return [];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
       

    }

    render() {
        
        
    }
    
    

    disconnectedCallback() {
      // remove event listeners
        console.log('Custom square element removed from page.');
      }
      

    
    
  }

  window.customElements.define('chart-test', ChartTest);
})();
