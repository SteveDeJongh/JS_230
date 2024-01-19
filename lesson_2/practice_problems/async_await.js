// Practice Problems: Async / Await

// 1

// async function asyncDownloadFile() {
//   console.log('Downloading a file...');
//   const message = await new Promise((resolve) => {
//     setTimeout(() => {
//         resolve('Download complete!');
//       }, 1500);
//     });
//   console.log(message);
// }

// asyncDownloadFile();

// 2

// async function asyncLoadData() {
//   try {
//     const message = await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (Math.random() > 0.5) {
//           resolve('Data loaded');
//         } else {
//           reject('Network error');
//         }
//       }, 1000);
//     });
//     console.log(message);
//   } catch (error) {
//     console.error(error);
//   }
// }

// asyncLoadData();

// 3

// async function fetchResource(url) {
//   try {
//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data);
//   } catch(error) {
//     console.error('Failed to load resource.')
//   }
//   console.log('Resource fetch attempt made');
// }

// fetchResource("https://jsonplaceholder.typicode.com/todos/1");

// 4

async function fetchUserProfile(id) {
  try {
    const userProfile = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    ).then((res) => res.jsaon());
    console.log("User Profile", userProfile)
  } catch(error) {
    console.error("Error fetching profile:", error);
  }

  try {
    const userPosts = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}/posts`
    ).then((res) => res.jsaon());
    console.log("User Posts", userPosts)
  } catch(error) {
    console.error("Error fetching posts:", error);
  }

  try {
    const userComments = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}/comments`
    ).then((res) => res.jsaon());
    console.log("User Comments", userComments)
  } catch(error) {
    console.error("Error fetching Comments:", error);
  }
}