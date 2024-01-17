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