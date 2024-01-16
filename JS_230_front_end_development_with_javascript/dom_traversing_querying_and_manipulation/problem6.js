// 6 Node Swap

function nodeSwap(id1, id2) {
  let el1 = document.getElementById(id1);
  let el2 = document.getElementById(id2);
  if (el1 === null ||el2 === null) {
        return undefined;
      };
  
  if (checkNotChildren(el1, el2)) return undefined;

  let temp = el1.cloneNode(true);
  el2.insertAdjacentElement('beforebegin', temp);
  el1.insertAdjacentElement('beforebegin', el2);
  el1.remove();
}

function checkNotChildren(el1, el2) {
  let elarr1 = Array.prototype.slice.call(el1.children);
  let elarr2 = Array.prototype.slice.call(el2.children);

  if (elarr1.includes(el2)) return true;
  if (elarr2.includes(el1)) return true;

  return false;
}

// LS Solution

function nodeSwap(node1Id, node2Id) {
  const node1 = document.getElementById(node1Id);
  const node2 = document.getElementById(node2Id);

  if (!isInvalidSwap(node1, node2)) {
    const node1Clone = node1.cloneNode(true);
    const node2Clone = node2.cloneNode(true);
    const node1Parent = node1.parentNode;
    const node2Parent = node2.parentNode;

    node1Parent.replaceChild(node2Clone, node1);
    node2Parent.replaceChild(node1Clone, node2);
    return true;
  }
}

function isInvalidSwap(node1, node2) {
  return ((!node1 || !node2) ||
         node1.contains(node2) || node2.contains(node1));
}