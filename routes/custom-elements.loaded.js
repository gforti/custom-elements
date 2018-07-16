(async () => { 
    const undefinedElements = document.querySelectorAll(':not(:defined)');

    const promises = [...undefinedElements].map(
      elem => customElements.whenDefined(elem.localName)
    );

    // Wait for all the children to be upgraded, 
    // then remove the placeholder.
    await Promise.all(promises);                            
    window.dispatchEvent(new CustomEvent('customElementsDefined'))
})()