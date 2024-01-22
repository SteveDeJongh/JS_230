// Getting Schedules

function retrieveSchedules() {
  const request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3000/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', (event) => {
    const schedules = request.response;
    const staffs = [];
    const tally = [];

    if (schedules.length > 0) {
      schedules.forEach(schedule => {
        let id = String(schedule.staff_id);
        if (!staffs.includes(`Staff ${id}`)) {
          staffs.push(`Staff ${id}`);
          tally.push(1);
        } else {
          tally[staffs.indexOf(`Staff ${id}`)] += 1;
        }
      });

      alert(tally.map((_, index) => `${staffs[index]}: ${tally[index]}`).join("\n"));
    } else {
      alert('There are currently no schedules available for booking');
    }
  });

  request.addEventListener('timeout', event => {
    alert('It is taking longer than usual, please try again later.')
  });

  request.addEventListener('loadend', event => {
    alert('The request has completed.');
  });

  request.send();
}

retrieveSchedules();

// Further Exploration

// function retrieveIndividualSchedules(staff_id) {
//   const request = new XMLHttpRequest();

//   request.open('GET', `http://localhost:3000/api/schedules/${staff_id}`);
//   request.timeout = 15000;
//   request.responseType = 'json';

//   request.addEventListener('load', event => {
//     console.log(request.response);
//   });

//   request.send();
// }

// retrieveIndividualSchedules(1);

function retrieveByStaffIds() {
  const request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3000/api/schedules')
  request.responseType = 'json';

  request.addEventListener('load', (event) => {
    let data = request.response

    if (data.length === 0) {
      alert('There are no schedules available.');
      return;
    }

    const staffIds = new Set(data.map(({staff_id}) => staff_id));

    const requestPromises = [];
    for (const id of staffIds) {
      requestPromises.push(xhrPromise(`/api/schedules/${id}`));
    }

    Promise.all(requestPromises)
      .then(responses => {
        const result = responses.map(schedules => {
          let sid = schedules[0].staff_id;
          return `staff ${sid}: ${schedules.length}`;
      }).join('\n');

      alert('Schedule counts:\n' + result);
    })
    .catch(errorMessage => alert(errorMessage));
  });

  request.send();
}

function xhrPromise(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';

    request.addEventListener('load', (e) => resolve(e.target.response));
    request.addEventListener('error', () => reject('Unable to retrieve data.'));
    request.send();
  });
}

retrieveByStaffIds();