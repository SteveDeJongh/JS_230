// 5 Coloring

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.children.length; index += 1) {
    walk(node.children[index], callback);
  }
};

function colorGeneration(gen) {
  let body = document.body;

  walk(body, node => {
      if (isRightGen(node, gen)) {
        node.classList.add('generation-color');
      }
  });
};

function isRightGen(node, gen) {
  let currNode = node;
  let val = false;

  for (let i = 0; i < gen; i += 1) {
    if (currNode.tagName === 'BODY') break;
    let parentNode = currNode.parentNode;
    if (parentNode.tagName === 'BODY' && i === gen - 1) {
      val = true;
    } else {
      val = false;
    }
    currNode = parentNode;
  }

  return val;
};

// LS Solution

function colorGeneration(targetGeneration) {
  let generation = 0;
  let parents = [document.body];
  let elements;

  while (generation < targetGeneration) {
    generation += 1;
    elements = getAllChildrenOf(parents);
    parents = elements;
  }

  if (elements) {
    color(elements);
  }
}

function color(elements) {
  elements.forEach(({classList}) => {
    classList.add("generation-color");
  });
}

function getAllChildrenOf(parents) {
  return parents.map(({children}) => Array.prototype.slice
                                                    .call(children))
                                                    .reduce((collection, children) => collection.concat(children), []);
}