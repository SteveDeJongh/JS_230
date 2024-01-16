// 2 Child Nodes

<div id="1">
  <h1 id="2">Hello, <em id="3">World</em></h1>
  <p id="4">
    Welcome to wonderland. This is an
    <span id="5">awesome</span> place.
  </p>
  <a href="#" id="6"><strong id="7">Enter</strong></a>
  <div id="8"><p id="9"><a href="#" id="10">Go back</a></p></div>
</div>

// 1 has 9 child nodes and 12 indirect child nodes
// 2 has 2 child nodes and 1 indirect child node
// 3 has 1 child nodes
// 4 has 3 child nodes and 1 indirect child node
// 5 has 1 child nodes and 0
// 6 has 1 child nodes and 1 indirect child node
// 7 has 1 child nodes and 0
// 8 has 1 child nodes and 2 indirect child nodes
// 9 has 1 child nodes and 1 indirect child node
// 10 has 1 child node and 0 indirect

// FE

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
};

function childNodes(id) {
  let node = document.getElementById(id);
  let direct = 0;
  let indirect = 0;

  walk(node, el => {
    if (el.parentNode === node) {
      direct += 1;
    } else if (el !== node) {
      indirect += 1;
    }
  });

  return [direct, indirect];
}