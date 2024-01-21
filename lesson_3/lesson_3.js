// Lesson 3 - Making HTTP Requests from JavaScript

// Read "Working with web APIs" book.

// Network Programming in JavaScript

// Making a Request with XMLHttpRequest

// Practice Problems:

// 1

let request2 = new XMLHttpRequest();
request2.open('GET', 'https://api,github.com/repos/rails/rails');
request2.send();

// 2

request2.responseText;

// XMLHttpRequest Events

// Data Serialization

// Example: Loading HTML via XHR

// Practice problems:

// 1

// We receive a ERR file not found error when trying to submit as we submit a post request to `;//products/15

// Example: Submitting a Form via XHR

// 1

store.addEventListener('submit', event => {
  event.preventDefault();

  let form = event.target;
  let request = new XMLHttpRequest();
  let data = new FormData(form);

  request.open(form.method, `https://ls-230-web-store-demo.herokuapp.com/${form.getAttribute('action')}`);

  request.addEventListener('load', event => store.innerHTML = request.response);
  request.send();
});

// 2
