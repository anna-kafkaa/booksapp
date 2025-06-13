'use strict';

// === Konfiguracja selektorów ===
const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    bookList: '.books-list',
  },
};

// === Kompilacja szablonów ===
const templates = {
  book: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

// === Tablica ulubionych książek ===
const favoriteBooks = [];

// === Funkcja renderująca książki na stronie ===
function renderBooks() {
  const bookList = document.querySelector(select.containerOf.bookList);

  for (const book of dataSource.books) {
    const generatedHTML = templates.book(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(generatedDOM);
  }
}

// === Funkcja inicjująca interakcje (ulubione) ===
function initActions() {
  const bookImages = document.querySelectorAll('.book__image');

  for (const image of bookImages) {
    image.addEventListener('dblclick', function (event) {
      event.preventDefault();

      const bookId = this.getAttribute('data-id');

      if (favoriteBooks.includes(bookId)) {
        this.classList.remove('favorite');
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
      } else {
        this.classList.add('favorite');
        favoriteBooks.push(bookId);
      }

      console.log('Ulubione książki:', favoriteBooks);
    });
  }
}

// === Uruchomienie funkcji ===
renderBooks();
initActions();
