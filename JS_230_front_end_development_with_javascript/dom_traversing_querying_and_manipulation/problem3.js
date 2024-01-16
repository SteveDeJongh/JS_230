// 3 Tracing the DOM Tree

function domTreeTracer(id) {
  let result = [];
  let currElement = document.getElementById(id);
  let parentElement;
  
  do {
    parentElement = currElement.parentNode;
    let children = getTagNames(parentElement.children)
    result.push(children);
    
    currElement = parentElement;
  } while (parentElement.tagName !== 'BODY')

  return result;
}

function getTagNames(htmlCollection) {
  let elementsArray = Array.prototype.slice.call(htmlCollection);
  return elementsArray.map(({tagName}) => tagName);
}

domTreeTracer(1); // [["ARTICLE"]]
domTreeTracer(2); // [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
domTreeTracer(22); // [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]