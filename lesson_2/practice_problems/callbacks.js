// Practice Problems: Callbacks

// 1

// function basicCallback(cb, num) {
//   setTimeout(() => {
//     cb(num);
//   }, 2000);
// }

// 2

// function downloadFile(callback) {
//   console.log('Downloading a file...');
//   setTimeout(() => {
//     callback('Download complete!');
//   }, 1500);
// }

// downloadFile(console.log);

// 3

// function processData(nums, callback) {
//   setTimeout(() => {
//     let result = nums.map(callback);
//     console.log(result);
//   }, 1000)
// }

// console.log(processData([1,2,3], (number) => number * 2));

// 4

// function waterfallOverCallbacks(callbacks, num) {
//   let result = num;
//   callbacks.forEach(callback => result = callback(result));
//   return result;
// }

// const double = (x) => x * 2;

// console.log(waterfallOverCallbacks([double, double, double], 1));

// 5

function startCounter(callback) {
  let counter = 0;
  let interval = setInterval(() => {
    counter += 1;
    if (callback(counter)) {
      clearInterval(interval);
    }
  }, 1000);
}

const log = function(x) {
  console.log(x);
  return x === 5;
}

startCounter(log);