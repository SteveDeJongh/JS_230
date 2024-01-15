let header1 = document.createElement('header');

document.body.insertAdjacentElement('afterbegin', header1);

let mySite = document.querySelector('h1');

header1.appendChild(mySite);

header1.appendChild(document.querySelector('header nav'));

document.body.querySelectorAll('body header')[2].remove();

let firstImage = document.body.querySelector('figure img');
let secondImage = document.body.querySelectorAll('figure img')[1];
let temp = firstImage;

document.body.querySelector('#content figure').insertAdjacentElement('afterbegin', secondImage);
document.body.querySelectorAll('#content figure')[1].insertAdjacentElement('afterbegin', firstImage);

let article1 = document.body.querySelector('article');

article1.insertAdjacentElement('beforeend', document.body.querySelector('#content figure'));
article1.insertAdjacentElement('beforeend', document.body.querySelectorAll('#content figure')[1]);

// LS Solution 

// let header = document.querySelector("body > header");
// let h1 = document.querySelector("main > h1");
// header.insertBefore(h1, header.firstChild);
// document.body.insertBefore(header, document.body.firstChild);

// let [ chinStickFigure, babyMopFigure ] = document.querySelectorAll("figure");

// let babyMopImage = chinStickFigure.querySelector("img");
// let chinStickImage = babyMopFigure.querySelector("img");
// chinStickFigure.insertBefore(chinStickImage, chinStickFigure.firstChild);
// babyMopFigure.insertBefore(babyMopImage, babyMopFigure.firstChild);

// let article = document.querySelector("article");
// article.insertBefore(chinStickFigure, null);
// article.insertBefore(babyMopFigure, null);