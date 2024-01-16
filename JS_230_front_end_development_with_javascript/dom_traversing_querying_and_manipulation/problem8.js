// 8 Array to Nodes (marked as exceptionally challenging)

const nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];

function arrayToNodes(nodes) {
  let parent = document.createElement(nodes[0]);
  const children = nodes[1];

  if (children.length === 0) {
    return parent;
  } else {
    for (let i = 0; i < children.length; i += 1) {
      parent.appendChild(arrayToNodes(children[i]))
    }
  }

  return parent;
}