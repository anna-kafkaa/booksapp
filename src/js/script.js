'use strict';

// === Konfiguracja selektorów i szablonów ===
const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    bookList: '.books-list',
  },
};

const templates = {
  book: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

// === Tablica ulubionych książek ===
const favoriteBooks = [];

// === Funkcja renderująca książki ===
function renderBooks() {
  const bookList = document.querySelector(select.containerOf.bookList);

  for (const book of dataSource.books) {
    const generatedHTML = templates.book(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(generatedDOM);
  }
}

// === Funkcja do obsługi dwukliku i ulubionych ===
function initActions() {
  const bookImages = document.querySelectorAll('.book__image');

  for (const image of bookImages) {
    image.addEventListener('dblclick', function (event) {
      event.preventDefault();

      const bookId = this.getAttribute('data-id');

      if (favoriteBooks.includes(bookId)) {
        // Jeśli książka już jest ulubiona – usuń
        this.classList.remove('favorite');
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
      } else {
        // Jeśli nie – dodaj
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
