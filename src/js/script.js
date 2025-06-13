"use strict";

// 1. Kompilujemy szablon
const select = {
  templateOf: {
    book: "#template-book",
  },
  containerOf: {
    bookList: ".books-list",
  },
};

const templates = {
  book: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

// 2. Tworzymy funkcję renderującą książki
function renderBooks() {
  const bookList = document.querySelector(select.containerOf.bookList);

  for (const book of dataSource.books) {
    // Generujemy kod HTML na podstawie szablonu i danych książki
    const generatedHTML = templates.book(book);

    // Tworzymy DOM z HTML-a
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    // Wstawiamy do listy książek
    bookList.appendChild(generatedDOM);
  }
}

// 3. Uruchamiamy funkcję
renderBooks();
