// Practice Problems: Promise Basics

// 1

// function downloadFilePromise() {
//   return new Promise((resolve) => {
//     console.log('Downloading a file...');
//     setTimeout(() => {
//       resolve('Download complete!');
//     }, 1500);
//   });
// }

// 2

// function processDataPromise(nums) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       let processed = nums.map(number => number * 2);
//       resolve(processed);
//     }, 1000);
//   })
// }

// processDataPromise([1,2,3]).then((processedNumbers) => {
//   console.log(processedNumbers);
// })

// 3

// function flakyService() {
//   return new Promise((resolve, reject) => {
//     let random = Math.random();

//     if (random > 0.5) {
//       resolve('Operation successful');
//     } else {
//       reject('Operration failed');
//     }
//   });
// };

// flakyService().then((msg) => {
//               console.log(msg);
//               })
//               .catch((error) => {
//                 console.log(error);
//               });

// 4

// function operation() {
//   return new Promise((resolve) => {
//     console.log("Operation started");
//     setTimeout(() => {
//       resolve("Operation complete");
//     }, 1000);
//   });
// }

// operation().then(console.log)
//            .finally(() => {
//             console.log('Cleaing up resources...');
//            });

// 5

Promise.resolve(7)
  .then((number) => number * 2)
  .then((number) => number + 5)
  .then((result) => console.log(result));
