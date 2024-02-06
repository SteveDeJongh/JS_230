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

// function waterfallOverCallbacks(cbs, start) {
//   let res = start;
//   cbs.forEach(cb => res = cb(res));
//   console.log(res);
// }

// // Example usage:
// const double = (x) => x * 2;
// waterfallOverCallbacks([double, double, double], 1);
// // Logs: 8

// function startCounter(callback) {
//   let counter = 0;
//   const intervalId = setInterval(() => {
//     counter++;
//     if (callback(counter)) {
//       clearInterval(intervalId);
//     }
//   }, 1000);
// }

// // Example usage:
// startCounter((count) => {
//   console.log(count);
//   return count === 5;
// });
// // Logs 1, 2, 3, 4, 5, then stops

// function downloadFilePromise() {
//   return new Promise((resolve, reject) => {
//     console.log('Download starting...');
//     setTimeout(() => {
//       resolve('Download complete!');
//     }, 1500);
//   });
// }

// downloadFilePromise()
//   .then((r) => console.log(r))
//   .catch((e) => console.log('Error! ' + e));

// function processDataPromise(arr) {
//   return new Promise((resolve, reject) => {
//     console.log('Working...');
//     setTimeout(() => {
//       let processed = arr.map(x => x * 2);
//       resolve(processed);
//     } , 1000);
//   })
// }

// processDataPromise([1,2,3])
//   .then((r) => console.log('Success, ' + r))
//   .catch((e) => console.log('Ruh roh + e'));

// function flakyService() {
//   return new Promise((resolve, reject) => {
//     let num = Math.floor(Math.random() * 10);

//     if ( num >= 5) {
//       resolve('Operation success!')
//     } else {
//       reject('Operation failed.')
//     }
//   });
// }

// flakyService()
//   .then((s) => console.log('Success! ' + s))
//   .catch((e) => console.log('Fail ' + e));

// function cleanupFiles() {
//   return new Promise((resolve, reject) => {
//     console.log('Starting operation.');
//     if (true) {
//       resolve('Operation successfull.');
//     }
//   })
// }

// cleanupFiles()
//   .then((s) => console.log(s))
//   .finally(() => { console.log('Cleaning up resources...')});

// new Promise((resolve, reject) => {
//   resolve(7);
// }).then((r) => {return r * 2})
//   .then((r) => r + 5)
//   .then(console.log);

// function flakyService() {
//   return new Promise((resolve, reject) => {
//     let num = Math.floor(Math.random() * 10);

//     if ( num >= 5) {
//       resolve('Operation success!')
//     } else {
//       reject('Operation failed.')
//     }
//   });
// }

// const services = [flakyService(), flakyService(), flakyService()];

// Promise.allSettled(services).then((results) => {
//   results.forEach((result, index) => {
//     if (result.status === "fulfilled") {
//       console.log(
//         `Service ${index + 1} succeeded with message: ${result.value}`
//       );
//     } else {
//       console.error(
//         `Service ${index + 1} failed with error: ${result.reason}`
//       );
//     }
//   });
// });

// Logs success message or error for each service

// flakyService()
//   .then((s) => console.log('Success! ' + s))
//   .catch((e) => console.error('Operation failed.'));

// function fetchUserData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => reject({ error: "User not found" }), 500);
//   });
// }

// fetchUserData()
//   .catch((e) => console.error(e.error))
//   .then(() => console.log('Fetching complete.'));

// function retryOperation(func) {
//   let attempts = 0;

//   function attempt() {
//     return func().catch((err) => {
//       if (attempts < 2) {
//         attempts += 1;
//         console.log(`Retry attempt #${attempts}`);
//         return attempt();
//       } else {
//         throw err;
//       }
//     });
//   }

//   return attempt().catch(() => console.error('Operation failed'));
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

// function loadData() {
//   return new Promise((resolve, reject) => {
//     if (Math.random > 0.5) {
//       resolve('Data loaded.');
//     } else {
//       reject('Network error.');
//     }
//   }).catch((e) => {
//     console.error(e);
//     return Promise.resolve('Using cached data.');
//   });
// }

// loadData()
//   .then(console.log);

// function loadMultipleResources(urls) {
//   const fetchPromises = urls.map((url) =>
//     fetch(url)
//       .then((response) => response.json())
//       .catch(() => "Failed to fetch")
//   );
//   return Promise.allSettled(fetchPromises);
// }

// loadMultipleResources([
//   "https://jsonplaceholder.typicode.com/todos/1",
//   "invalidUrl",
// ]).then((results) => {
//   results.forEach((result) => {
//     if (result.status === "fulfilled") {
//       console.log("Fetched data:", result.value);
//     } else {
//       console.error(result.reason);
//     }
//   });
// });

// Fetched data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false }
// Fetched data: Failed to fetch

// function downloadFilePromise() {
//   return new Promise((resolve, reject) => {
//     console.log('Download starting...');
//     setTimeout(() => {
//       resolve('Download complete!');
//     }, 1500);
//   });
// }

// downloadFilePromise()
//   .then((r) => console.log(r))
//   .catch((e) => console.log('Error! ' + e));

// async function asyncDownloadFile() {
//   console.log('Download starting...');
//   let status = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('Download complete.')
//     }, 1000);
//   });
//   console.log(status);
// }

// asyncDownloadFile();

// function loadData() {
//   return new Promise((resolve, reject) => {
//     if (Math.random > 0.5) {
//       resolve('Data loaded.');
//     } else {
//       reject('Network error.');
//     }
//   }).catch((e) => {
//     console.error(e);
//     return Promise.resolve('Using cached data.');
//   });
// }

// loadData()
//   .then(console.log);

// async function asyncLoadData() {
//   try {
//     let result = await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (Math.random() > 0.5) {
//           resolve('Data loaded.');
//         } else {
//           reject('Network error.');
//         } 
//       }, 1000)
//     })
//     console.log(result);
//   } catch(e) {
//     console.error(e);
//   }
// }

// asyncLoadData();

// async function fetchResource(url) {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//   } catch(e) {
//     console.error('Failed to load resource.')
//   } finally {
//     console.log('Resource fetch attempt made.')
//   }
// }

// // Example usage:
// fetchResource("https://jsonplaceholder.typicode.com/todos/1");
// // Logs fetched data, then "Resource fetch attempt made"
// // On error, logs "Failed to load resource", then "Resource fetch attempt made"

async function fetchUserProfile(userId) {
  try {
    const userProfile = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    ).then((res) => res.json());
    console.log("User Profile", userProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }

  try {
    const userPosts = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    ).then((res) => res.json());
    console.log("User Posts", userPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  try {
    const userComments = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/comments`
    ).then((res) => res.json());
    console.log("User Comments", userComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}