// Making HTTP Requests - Exploring the Booking App

// 1 - 5 staff members /api/staff_members

// 2 - 5 students /api/students

// 3 - 9 schedules /api/schedules

// 4 - 3 schedules with bookings. You can get this by counting the number of schedules with emails when using the returned data by accessing the /api/schedules route.

// 5 - There is no route that will provide this information

// 6 - There is no route that will provide this information.

const DOMAIN = 'http://localhost:3000';

function makeGETRequest(route, callback) {
  let request = new XMLHttpRequest();

  request.open('GET', route);
  request.setRequestHeader('Acccept', 'json');

  request.addEventListener('load', (event) => {
    let obj= JSON.parse(event.target.responseText);
    callback(obj);
  });

  request.send();
}

// makeGETRequest(DOMAIN + '/api/schedules', (obj) => console.log(obj.length));

// Or using fetch

function makeFetchGETRequest(route, callback) {
  fetch(route)
    .then(response => response.json())
    .then(obj => {
      callback(obj)
    });
}

makeFetchGETRequest(DOMAIN + '/api/schedules', (obj) => console.log(obj.length));