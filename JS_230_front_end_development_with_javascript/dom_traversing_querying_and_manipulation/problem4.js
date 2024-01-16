// 4 Tree Slicing

function sliceTree(start, end) {
  let endElement = document.getElementById(end);
  let startElement = document.getElementById(start);
  
  if (!endElement || !startElement) return undefined;

  let results = [];
  let currElement;

  do {
    currElement = endElement;
    results.unshift(currElement.tagName);
    endElement = endElement.parentNode;
  } while (endElement.tagName !== 'BODY' && currElement.id !== String(start));

  return (endElement.tagName === 'BODY' && currElement.id !== String(start) ? undefined : results);
}

// > sliceTree(1, 4);
// = ["ARTICLE", "HEADER", "SPAN", "A"]
// > sliceTree(1, 76);
// = undefined
// > sliceTree(2, 5);
// = undefined
// > sliceTree(5, 4);
// = undefined
// > sliceTree(1, 23);
// = ["ARTICLE", "FOOTER"]
// > sliceTree(1, 22);
// = ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
// > sliceTree(11, 19);
// = ["SECTION", "P", "SPAN", "STRONG", "A"]

// LS Solution

function sliceTree(start, end) {
  let endElement = document.getElementById(end);
  const startElement = document.getElementById(start);

  if (!startElement || !endElement) {
    return undefined;
  }

  const slicedTree = [];
  let currentElement;

  do {
    currentElement = endElement;
    slicedTree.unshift(currentElement.tagName);
    endElement = endElement.parentNode;
  } while (currentElement.id !== String(start) && endElement.tagName !== 'BODY');

  return (endElement.tagName === 'BODY' && currentElement.id !== String(start) ? undefined : slicedTree);
}