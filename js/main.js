'use strict';

let books = document.querySelectorAll('.book');
books[1].after(books[0]);
books[4].after(books[3]);
books[5].after(books[2]);
(document.querySelector('body')).style.backgroundImage = 'url(/image/you-dont-know-js.jpg)';

books = document.querySelectorAll('.book');
books[2].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

document.querySelector('.adv').remove();

let chapter = books[1].querySelectorAll('li');
chapter[9].after(chapter[2]);
chapter[3].after(chapter[8]);
chapter[3].after(chapter[6]);
chapter = books[4].querySelectorAll('li');
chapter[4].after(chapter[2]);
chapter[1].after(chapter[9]);
chapter[7].after(chapter[5]);

let chapter8 = books[5].querySelectorAll('li')[2];
chapter8.textContent = 'Глава 8: За пределами ES6';
books[5].querySelectorAll('li')[8].after(chapter8);