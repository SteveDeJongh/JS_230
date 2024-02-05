// JS 239 Assessment Prep

// Lesson 1 review

// Lesson 2 review 

// function delayLog() {
//   for (let i = 1; i <= 10; i += 1) {
//     let logger = function() { console.log(i)};
//     setTimeout(logger, i * 1000);
//   }
// }

// delayLog();

// function afterNSeconds(cb, time) {
//   setTimeout(cb, time * 1000);
// }

// let counterID;
// function startCounting() {
//   let num = 1;
//   counterID = setInterval(() => {
//     console.log(num);
//     num += 1;
//   }, 1000);
// }

// function stopCounting() {
//   clearInterval(counterID);
// }

// document.addEventListener('DOMContentLoaded', () => {
//   document.addEventListener('click', (e) => {
//     let xPos = e.clientX;
//     let yPos = e.clientY;
  
//     let x = document.querySelector('.x');
//     x.style.top = String(yPos) + 'px';
//     x.style.left = String(xPos) + 'px';    
//   });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   document.addEventListener('mousemove', (e) => {
//     let xPos = e.clientX;
//     let yPos = e.clientY;
  
//     let x = document.querySelector('.x');
//     x.style.top = String(yPos) + 'px';
//     x.style.left = String(xPos) + 'px';    
//   });
// });

// document.addEventListener('mousemove', (e) => {
//   let xPos = e.clientX;
//   let yPos = e.clientY;

//   let x = document.querySelector('.x');
//   x.style.top = String(yPos) + 'px';
//   x.style.left = String(xPos) + 'px';    
// });

// document.addEventListener('keydown', (e) => {
//   let x = document.querySelector('.x .vertical');
//   let y = document.querySelector('.x .horizontal');
//   console.log(e.key);
//   if (e.key === 'b') {
//     x.style.background = 'blue';
//     y.style.background = 'blue';
//   } else if ( e.key === 'g') {
//     x.style.background = 'green';
//     y.style.background = 'green';
//   } else if (e.key === 'r') {
//     x.style.background = 'red';
//     y.style.background = 'red';
//   }
// });

// function basicCallback(cb, num) {
//   setTimeout(() => cb(num), 2000);
// }

// basicCallback((number) => {
//   console.log(number * 2);
// }, 5);

// function downloadFile() {
//   console.log('Downloading a file...');
//   setTimeout(() => console.log('Download complete!'), 1500);
// }

// downloadFile();

// function processData(arr, cb) {
//   console.log('Working...');
//   setTimeout(() => {
//     let processed = arr.map(cb);
//     console.log(processed);
//   } , 1000);
// }

// processData([1, 2, 3], (number) => number * 2);