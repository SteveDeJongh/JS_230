// Adding Staff

// document.addEventListener('DOMContentLoaded', () => {
//   let form = document.querySelector('form');

//   form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     let email = String(form.querySelector('input').value);
//     let name = String(form.querySelectorAll('input')[1].value);
    
//     let request = new XMLHttpRequest();
//     name = 'name=' + encodeURIComponent(name);
//     email = 'email=' + encodeURIComponent(email);
//     request.open('POST', 'http://localhost:3000/api/staff_members')
//     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//     request.addEventListener('load', e => {
//       switch(request.status) {
//         case 201:
//           let id = JSON.parse(request.response).id;
//           alert(`Successfully created staff with id: ${id}`);
//           form.reset();
//           break;
//         case 400:
//           alert(request.response);
//           break;
//       }
//     });

//     request.send(name + '&' + email);
//   });
// })

// Alternatively, using a `FormData` object.

function formDataToJson(formData) {
  const json = {};
  for (const pair of formData.entries()) {
      json[pair[0]] = pair[1];
  }

  return json;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const json = JSON.stringify(formDataToJson(formData));
    const xhr = new XMLHttpRequest();

    xhr.open('POST', form.action);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(json);

    xhr.addEventListener('load', event => {
        switch(xhr.status) {
            case 201:
                const data = JSON.parse(xhr.response);
                alert(`Successfully created staff with id: ${data.id}`);
                form.reset();
                break;
            case 400:
                alert(xhr.responseText);
        }
    });
  });
});