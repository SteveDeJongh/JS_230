// Lesson 1 - The Dom

// The Document Object Model(DOM)

// 1
// False. The browser may insert nodes that don't appear in the HTML due to invalid markup or the omission of optional tags. Text, including whitespace, also creates nodes that don't map to tags.

// 2
// True. All text including whitespace in the original HTML appears in the DOM as a text node.

// 3

// <html>
//   <head>
//     <title>Newsletter Signup</title>
//   </head>
//   <body>
//     <!-- A short comment -->
//     <h1>Newsletter Signup</h1>
//     <p class="intro" id="simple">
//       To receive our weekly emails, enter your email address below.
//       <a href="info.html">Get more info</a>.
//     </p>
//     <div class="form">
//       <form>
//         <label>
//           Enter your email:
//           <input name="email" placeholder="user.name@domain.test"/>
//         </label>
//         <p class="controls">
//           <button id="cancelButton">Cancel</button>
//           <button type="submit" id="submitButton">Subscribe</button>
//         </p>
//       </form>
//     </div>
//   </body>
// </html>

// Finding DOM Nodes

// Problems Group 1

// 1 

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
};

let paragraphs = [];

walk(document, node => {
  if (node.nodeName === 'P') {
    paragraphs.push(node);
  }
});

// LS Solution 

function findAllParagraphs() {
  let matches = [];
  let nodes = document.body.childNodes;

  for (let index = 0; index < nodes.length; index += 1) {
    if (nodes[index] instanceof HTMLParagraphElement) {
      matches.push(nodes[index]);
    }
  }

  return matches;
}

console.log(findAllParagraphs());

// 2

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
};

let paragraphs = [];

walk(document, node => {
  if (node.nodeName === 'P') {
    node.classList.add('article-text');
  }
});

//LS Solution

function addClassToParagraphs(node) {
  if (node instanceof HTMLParagraphElement) {
    node.classList.add("article-text");
  }

  let nodes = node.childNodes;
  for (let index = 0; index < nodes.length; index += 1) {
    addClassToParagraphs(nodes[index]);
  }
}

addClassToParagraphs(document.body);

// 3

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
};

function getElementsByTagName(tagName) {
  let matches = [];

  walk(document.body, node => {
    if (node.nodeName.toLowerCase() === tagName) {
      matches.push(node);
    }
  });

  return matches;
};

getElementsByTagName('p').forEach(el => el.classList.add('article-text'));

// Problems Group 2

// 1

let paragraphs = document.getElementsByTagName('p');
for (let index = 0; index < paragraphs.length; index += 1) {
  paragraphs[index].classList.add('article-text');
}

// 2
let paragraphs = document.getElementsByTagName('p');

paragraphs = Array.prototype.slice.call(paragraphs, 0);

paragraphs.forEach(p => {
  if (p.parentElement.classList.contains('intro')) {
    p.classList.add('article-text')
  }
});

// LS Solution

let intros = document.getElementsByClassName("intro");
for (let index = 0; index < intros.length; index += 1) {
  let paragraphs = intros[index].getElementsByTagName("p");

  for (let p = 0; p < paragraphs.length; p += 1) {
    paragraphs[p].classList.add("article-text");
  }
}

// Solution using css query selectors `querySelector` or `querySelectorAll`
// These selectors require appending `class`s with `.`, id's with `#`, tagnames are not appended by anthing.

let paragraphs = document.querySelectorAll('.intro p');

for (let i = 0; i < paragraphs.length; i += 1) {
  paragraphs[i].classList.add('article-text');
}

// Creating a Moving DOM Nodes

// <!doctype html>
// <html lang="en-US">
//   <head>
//     <title>Empty Page</title>
//   </head>
//   <body>
//   </body>
// </html>

// Add a paragraph

let paragraph = document.createElement('p');
paragraph.textContent = 'This is a test.';
document.body.appendChild(paragraph);

// Alternatively

let text = document.createTextNode('This is a test.');
let paragraph2 = document.createElement('p');
paragraph2.appendChild(text);
document.body.appendChild(paragraph2);