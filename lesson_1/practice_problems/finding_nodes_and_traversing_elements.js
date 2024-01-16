// Practice Problems: Fidning Nodes and Traversing Elements

// https://d3905n0khyu9wc.cloudfront.net/the_dom/polar_bear_wiki.html

// 1

let h2s = document.querySelectorAll('h2');
let h2Arrray = Array.prototype.slice.call(h2s);
h2Arrray.map(el => el.textContent.split(' ').length);

// 2

let table = document.querySelector('#toc');
table = document.querySelectorAll('.toc')[0];
table = document.getElementById('toc');

// 3

let links = document.querySelectorAll('.toc a');

for (let index = 0; index < links.length; index += 1) {
  if (index % 2 === 1) {
    links[index].style.color = 'green';
  }
}

// OR converting array-like object an array

links = Array.prototype.slice.call(links);
links.forEach((el, idx) => {if (idx % 2 === 0) el.style.color = 'green'});

// 4

let nodes = document.querySelectorAll('.thumbcaption');
let captions = [];

for (let index = 0; index < nodes.length; index += 1) {
  captions.push(nodes[index].textContent.trim());
}

console.log(captions);

// Or 
let thumbCaptions = document.querySelectorAll('.thumbcaption');

thumbCaptions = Array.prototype.slice.call(thumbCaptions);

thumbCaptions = thumbCaptions.map(x => x.textContent.trim());

// 5

let keys = ['Kingdom', 'Phylum', 'Clade', 'Class', 'Order', 'Suborder', 'Family',
            'Genus', 'Species'];
let classification = {};
let tds = document.querySelectorAll('.infobox td');
let cell;
let link;

for (let index = 0; index < tds.length; index += 1) {
  cell = tds[index];

  keys.forEach(key => {
    if (cell.textContent.indexOf(key) !== -1) {
      link = cell.nextElementSibling.firstElementChild;
      classification[key] = link.textContent;
    }
  });
}

console.log(classification);