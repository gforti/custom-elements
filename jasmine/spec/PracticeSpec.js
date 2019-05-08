
function inputSandbox() {
    let el;

    beforeEach(function () {
        el = document.createElement('input');
        el.name = 'fullname';
        el.id = 'sandboxFN'
        document.body.appendChild(el);
    });

    afterEach(function () {
        document.body.removeChild(el);
        el = null;
    });

}

function sandboxElement() {
    let el;

    beforeEach(function () {
        el = document.createElement('button');
        el.id = 'sandboxBtn'
        let label = document.createTextNode("Click Me"); 
        el.appendChild(label);
        document.body.appendChild(el);
    });

    afterEach(function () {
        document.body.removeChild(el);
        el = null;
    });

}

describe("Function returnJSON", function () {

    inputSandbox();

    it('should have a value "John Doe" for name and "0123456789" for id', function () {
        let result = returnJSON();
        expect(result.name).toEqual("John Doe");
        expect(result.id).toEqual("0123456789");
    });

});

describe("Function insertValueIntoInput", function () {

    inputSandbox();

    it('should have a value of your choosing', function () {
        let result = insertValueIntoInput();
        let input = document.querySelector('#sandboxFN');
        expect(input.value).toEqual(result);
    });

});

describe("Function insertClassNameIntoInput", function () {

    inputSandbox('error', 'testing');

    it('should have a class name of your choosing', function () {
        let result = insertClassNameIntoInput();
        let input = document.querySelector('#sandboxFN');
        expect(input.classList.contains(result)).toEqual(true);
    });

});

describe("Function buttonEvent", function () {

    sandboxElement();

    it('should add a paragraph tag when clicked on', function () {
        buttonEvent(); 
        let btn = document.querySelector('button');
        var event = new Event('click');
        btn.dispatchEvent(event);
        let pTags = document.querySelectorAll('p');
        expect(pTags.length).not.toEqual(0);
    });

});

describe("Function largestNumberOfFourArrays", function () {

    it('should find the number 10', function () {
        var test = [[1, 2, 3, 4], [4, 5, 6, 7], [8, 9, 0, 1], [10, 9, 8, 7]];
        var result = largestNumberOfFourArrays(test);
        expect(result).toEqual(10);
    });

    it('should find the number 100', function () {
        var test = [[10, 20, 30, 40], [100, 50, 60, 70], [80, 90, 0, 10], [4, 90, 80, 70]];
        var result = largestNumberOfFourArrays(test);
        expect(result).toEqual(100);
    });

});
