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
  request.send(data);
});

// 2

request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

// Example: Loading JSON via XHR

// 1

let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');
request.responseType = 'json';

request.addEventListener('load', event => {
  console.log(request.status);
  console.log(request.response.open_issues);
})

request.send();

// Alternatively

let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');

request.addEventListener('load', event => {
  let data = JSON.parse(request.response);
  console.log(request.status);
  console.log(data.open_issues);
});

request.send();

// 2

let request = new XMLHttpRequest();
request.open('GET', 'hts://api.github.com/repos/rails/rails');

request.addEventListener('load', event => {
  let data = JSON.parse(request.response);
  console.log(request.status);
  console.log(data.open_issues);
});

request.addEventListener('error', event => {
  console.log('The request could not be completed!');
});

request.send();

// Example: Sending JSON via XHR

// 1

// POST /books HTTP/1.1
// Host: https://lsjs230-book-catalog.herokuapp.com
// Content-Length: 
// Content-Type: application/json; charset=utf-8
// Accept: */*

// { 'title': 'Eloquent JavaScript', 'author': 'Marijn Haverbeke' }

// 2

function createProduct(newObj) {
  let request = new XMLHttpRequest();
  request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
  let newObjJson = JSON.stringify(newObj);

  request.addEventListener('load', () => {
    console.log(`This product was added: ${request.responseText}`);
  });

  request.send(newObjJson);
}

let newObj = {
  name: 'newobj',
  sku: 'new123',
  price: 100,
}

createProduct(newObj);

// Cross-Domain XMLHttpRequests with CORS

// Project Search Autocomplete, Part 1, 2, 