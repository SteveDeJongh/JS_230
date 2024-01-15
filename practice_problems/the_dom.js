// Practice Problems: the DOM

// https://d186loudes4jlv.cloudfront.net/fe2/exercises_objects_and_dom/dom_assignment.html

// 1

document.querySelector('h1').classList.add('heading');
// OR
document.getElementById('primary_heading').classList.add('heading');
// OR
document.getElementById('primary_heading').setAttribute('class', 'heading');

// 2

document.querySelector('ul').setAttribute('class', 'bulleted');
// OR
document.getElementById('id').setAttribute('class', 'bulleted');

// 3

// Hidden element id = `notice`

document.querySelector('#toggle').onclick = e => {
  e.preventDefault();

  let media = document.querySelector('#notice');
  if (media.getAttribute('class') === 'hidden') {
    media.setAttribute('class', 'visisble');
  } else {
    media.setAttribute('class', 'hidden');
  }
};

// 4

document.querySelector('#notice').onclick = e => {
  e.preventDefault();

  e.currentTarget.setAttribute('class', 'hidden');
}

// 5

document.querySelector('#multiplication').textContent = String(13 * 9);

// 6

document.body.setAttribute('id', 'styled');