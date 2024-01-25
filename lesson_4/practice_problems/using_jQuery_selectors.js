// Practice Problems: Using jQuery Selectors

// 1

$('h1').addClass('highlight');

// 2

$('#site_title').addClass('highlight');

// 3

$('article li');

// 4
$('article li').eq(2).addClass('highlight');

// 5
$('tbody tr').odd().addClass('highlight');

// 6
$('li li:contains("ac ante")').parents('li').addClass('highlight');

// 7
$('li li:contains("ac ante")').next().addClass('highlight');

// 8
$('td').last().addClass('highlight');
// OR
$('td').eq(-1).addClass('highlight');

// 9
$('td').not('.protected').addClass('highlight');
// OR
$('td:not(".protected"').addClass('highlight');

// 10
$('a[href^="#"]').addClass('highlight');

// 11
$('[class*=block]');