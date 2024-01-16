// Practice Problems: Traversing and Accessing Attributes

// 1

document.childNodes[1].lastChild.childNodes[1].style.color = 'red';

let html = document.childNodes[1]; // skip doctype
let body = html.lastChild;         // skip head and text nodes
let heading = body.childNodes[1];  // skip text node
heading.style.color = 'red';
heading.style.fontSize = '48px';

// 2

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

let count = 0;
walk(document, node => {
  if (node.nodeName === 'P') {
    count++;
  }
});

console.log(count);                              // 5

// 3

let words = [];
walk(document, node => {
  if (node.nodeName === 'P') {
    let text = node.firstChild.data.trim();
    let firstWord = text.split(' ')[0];
    words.push(firstWord);
  }
});

console.log(words);  // ["A", "The", "The", "Where", "And"]

// 4

let first = true;
walk(document, node => {
  if (node.nodeName === 'P') {
    if (first) {
      first = false;
    } else {
      node.classList.add('stanza');
    }
  }
});

// 5

// https://d3905n0khyu9wc.cloudfront.net/the_dom/polar_bear_wiki.html


let images1 = [];

walk(document, node => {
  if (node.nodeName === 'IMG') {
    images1.push(node.src);
  }
});

console.log(images.length); // 48

let pngCount1 = images.filter(img => img.slice(img.length - 3) === 'png').length;

console.log(pngCount1); // 23

// LS Solution

let images = [];
walk(document, node => {
  if (node.nodeName === 'IMG') {
    images.push(node);
  }
});

console.log(images.length);                      // 48 total images

let pngCount = images.filter(img => img.getAttribute('src').match(/png$/)).length;

console.log(pngCount);                           // 23 images in png format

// 6

walk(document, node => {
  if (node instanceof HTMLAnchorElement) {
    node.style.color = 'red';
  }
});