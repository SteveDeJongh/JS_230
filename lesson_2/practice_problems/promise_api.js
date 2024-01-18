// Practice Problems: Promise API

// 1

function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Operation successful");
    } else {
      reject("Operation failed");
    }
  });
}

// function loadData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve("Data loaded");
//       } else {
//         reject("Network error");
//       }
//     }, 1000);
//   });
// }

// let promises = [flakyService(), loadData()];

// Promise.all(promises)
//   .then(console.log) // Alternatively ((results) => console.log(results));
//   .catch(() => console.log('One or more operatons failed.'))

// 2

// const firstResource = new Promise((resolve) =>
//   setTimeout(() => resolve("First resource loaded"), 500)
// );
// const secondResource = new Promise((resolve) =>
//   setTimeout(() => resolve("Second resource loaded"), 1000)
// );

// Promise.race([firstResource, secondResource])
//   .then(console.log);

// 3

// const services = [flakyService(), flakyService(), flakyService()];

// Promise.allSettled(services)
//   .then((results) => {
//     results.forEach((result, index) => {
//       if (result.status === 'fulfilled') {
//         console.log(`Service ${index + 1} suceeded with message: ${result.value}`);
//       } else {
//         console.log(`Service ${index + 1} failed with error: ${result.reason}`);
//       }
//     });
//   });

// 4

// function loadData() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("Data loaded");
//     }, 1000);
//   });
// }

// Promise.any([flakyService(), loadData()]).then(console.log)

// 5

function loadMultipleResources(urls) {
  const fetchedProm = urls.map(x => 
    fetch(x)
      .then((response) => response.json())
      .catch(() => 'Failed to fetch')
  );

  return Promise.allSettled(fetchedProm);
}

loadMultipleResources([
  "https://jsonplaceholder.typicode.com/todos/1",
  "invalidUrl",
]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Fetched data:", result.value);
    } else {
      console.error(result.reason);
    }
  });
});

// Fetched data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false }
// Fetched data: Failed to fetch