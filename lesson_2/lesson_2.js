// Lesson 2 Event Driven and Asynchronous Programming

// Asynchronous Execution with setTimeout

// Problems
/*
// 1

function delayLog() {
  for (let i = 1; i <= 10; i += 1) {
    setTimeout(makeLogger(i), i * 1000)
  }
};

function makeLogger(number) {
  return function() {
    console.log(number);
  }
}

delayLog();

// 2

setTimeout(() => { // 1
  console.log('Once'); // 5
}, 1000);

setTimeout(() => { // 2
  console.log('upon'); // 7
}, 3000);

setTimeout(() => { // 3
  console.log('a'); // 6
}, 2000);

setTimeout(() => { // 4
  console.log('time'); // 8
}, 4000);

// 3

setTimeout(() => { // 1
  setTimeout(() => { // 6
    q(); // 12
  }, 15);

  d(); // 7

  setTimeout(() => { // 8
    n(); // 10
  }, 5);

  z(); // 9
}, 10);

setTimeout(() => { // 2
  s(); // 11
}, 20);

setTimeout(() => { // 3
  f(); // 5
});

g(); // 4

// g f d z n s q
// 4 5 7 9 10 11 12

// 4

function afterNSeconds(callback, duration) {
  setTimeout(callback, duration * 1000);
}
*/

// Repeating Execution with setInterval

// 1
/*
let num = 1;

function startCounting() {
  console.log(num);
  num += 1;
}

let id = setInterval(startCounting, 1000);

// Or made all in one

function startCounting2() {
  let count = 0;
  setInterval(() => {
    count += 1;
    console.log(count);
  }, 1000);
}

startCounting2();

// 2

let counterId;

function startCounting2() {
  let count = 0;
  counterId = setInterval(() => {
    count += 1;
    console.log(count);
  }, 1000);
}


function stopCounting() {
  clearInterval(counterId);
}
*/
// The Event Object
/*
// 1

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', event => {
    let x = document.querySelector('.x');
    x.style.left = String(event.clientX) + 'px'; 
    x.style.top = String(event.clientY) + 'px';
  });
})

// 2

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('mousemose', event => {
    let x = document.querySelector('.x');
    x.style.left = String(event.clientX) + 'px'; 
    x.style.top = String(event.clientY) + 'px';
  });
})

// 3

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('mouseover', event => {
    let x = document.querySelector('.x');
    x.style.left = String(event.clientX) + 'px'; 
    x.style.top = String(event.clientY) + 'px';
  });

  document.addEventListener('keyup', event => {
    let key = event.key;
    let color;

    if (key === 'b') {
      color = 'blue';
    } else if (key === 'g') {
      color = 'green';
    } else if (key === 'r') {
      color = 'red';
    }

    if (color) {
      let x = document.querySelector('.x');
      for (let index = 0; index < x.children.length; index += 1) {
        let child = x.children[index];
        child.style.background = color;
      }
    }
  })
})

// 4

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keyup', event => {
    let textBox = document.body.getElementsByTagName('TEXTAREA');

    let charCount = textBox[0].value.length;
    let remainingChars = 140 - charCount;
    if (charCount > 0) {
      let para = document.body.getElementsByTagName('p')[0];
      para.textContent = `${remainingChars} characters remaining.`;
    }
    if (remainingChars < 0) {
      textBox[0].style.color = 'red';
      document.querySelector('button').disabled = invalid;
    }
  })
})

// LS Solution for Q4

document.addEventListener('DOMContentLoaded', () => {
  let composer = document.querySelector('.composer');
  let textarea = composer.querySelector('textarea');
  let counter = composer.querySelector('.counter');
  let button = composer.querySelector('button');
  
  function updateCounter() {
    let length = textarea.value.length;
    let remaining = 140 - length;
    let message = `${remaining.toString()} characters remaining`;
    let invalid = remaining < 0;
    
    textarea.classList.toggle('invalid', invalid);
    button.disabled = invalid;

    counter.textContent = message;    
  }
  
  textarea.addEventListener('keyup', updateCounter);
  
  updateCounter();
});
*/

// Capturing and Bubbling (1)
/*
// 1

document.addEventListener('DOMContentLoaded', () => {
  let elem4 = document.querySelector('#elem4');
  let elem1 = document.querySelector('#elem1');

  elem4.addEventListener('click', event => alert(event.currentTarget.id), true);
  elem1.addEventListener('click', event => alert(event.currentTarget.id));
});

// 2

// Alerts: d1 pick, div
// Alerts: d2 pick, main
// Alerts: d4 pick, section

// adding : document.querySelector('.d3').addEventListener('click', highlightThis, false);
// The d3 alert will occur last, as we only trigger the event listener on the bubbling phase.

// 3

// Only 2 alert boxes.

*/

// Capturing and Bubbling (2)

// 1
// click event listener on the div element listening on the bubbling phase that alerts tagname of the target
// click event listener on the div element listening on the bubbling phase that alert tagname of the currenttargert

// 2
// click event listener on the capturing phase alerts "capturing" on the div element (2nd defined event handler)
// click event listener on the bubbling phase alerts 'bubbling' on the div element

// 3
// click event listener listening on the bubbling phase alerts 'event.target.tagName' = div on div#elem1 element (2nd event handler)
// keypress event listener on the bubbling phase alerts 'event.code' on document 1st event handler
// keypress event listener on the bubbling phase alerts 'event.code' on document 1st event handler
// click event listener on the bubbling phase alerts 'event.target.tagName' = main on div#elem1

// The click event listener listening on the bubbling phase on the div#elem1 element that alerts the tagName of the target element (the second event handler).
// The keypress event listener listening on the bubbling phase on document that alerts the code of the keyboard key that was pressed (the first event handler).
// The keypress event listener listening on the bubbling phase on document that alerts the code of the keyboard key that was pressed (the first event handler).
// The click event listener listening on the bubbling phase on the div#elem1 element that alerts the tagName of the target element (the second event handler).

// Preventing Propagation and Default Behaviors

// Event Delegation

// What is the event Loop?

// Assignment: Guessing Game

// ./assignment_guessing_game/game.html

// Assignment: Build an input box

// ./assignment_build_an_input_box/input_box.html

// Callbacks

function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}

doHomework("math", function () {
  alert("Finished my homework");
});