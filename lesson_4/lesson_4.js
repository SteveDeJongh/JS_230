// Lesson 4 - JavaScript Libraries

// Douglas crockford lecture

// Including an External Library

// jQuery

// Read: jQuery DOM Traversal

// Practice Problems: Using jQuery Selectors

// Read: jQuery Events

// test.html

$(function() {
  let $p = $('p');

  $('a').on('click', function(event) {
    event.preventDefault();
    let $anchor = $(this);
    $p.text("Your favorite fruit is " + $anchor.text());
  });
});

// Practice Problems: jQuery Events

// HTML Templating With JavaScript

// Practice Problems: Handlebars Basics
