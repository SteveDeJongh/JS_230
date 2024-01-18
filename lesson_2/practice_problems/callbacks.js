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

function processData(nums, callback) {
  setTimeout(() => {
    return nums.maps(callback);
  }, 1000)
}

console.log(processData([1,2,3], (number) => number * 2));

// ^ Todo...