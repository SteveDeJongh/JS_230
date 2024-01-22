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