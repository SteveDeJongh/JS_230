// Practice Problems: Error Handling

// 1

// function flakyService() {
//   return new Promise((resolve, reject) => {
//     let random = Math.random();

//     if (random > 0.5) {
//       resolve('Operation successful');
//     } else {
//       reject('Operation failed');
//     }
//   });
// };

// flakyService()
//   .then((result) => console.log(result)) // or just .then(console.log)
//   .catch(() => console.error("An error occured"));


// 2

// function fetchUserData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => reject({ error: "User not found" }), 500);
//   });
// }

// fetchUserData()
//   .catch((error) => console.error(error.error))
//   .finally(() => console.log('Fetching complete'));

// 3

// function retryOperation(operationFunc) {
//   let attempts = 0;

//   function attempt() {
//     return operationFunc().catch((err) => {
//       if (attempts < 2) {
//         attempts += 1;
//         console.log(`Retry attempt #${attempts}`);
//         return attempt();
//       } else {
//         throw err;
//       }
//     });
//   }

//   return attempt().catch(() => console.log('Operation failed'));
// }

// // Example usage:
// retryOperation(
//   () =>
//     new Promise((resolve, reject) =>
//       Math.random() > 0.33
//         ? resolve("Success!")
//         : reject(new Error("Fail!"))
//     )
// );

// 4

// function mockAsyncOp() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve("Operation succeeded");
//       } else {
//         reject("Operation failed");
//       }
//     }, 1000);
//   });
// }

// mockAsyncOp()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => console.log('Operation Attempted.'));

// 5

function loadData() {
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('Data loaded');
      } else {
        reject('Network error');
      }
    }, 1000);
  }).catch(() => {
    console.error('An error occured, Attempting to recover...');
    return Promise.resolve('Using cached data');
  })
}

loadData()
  .then(console.log);