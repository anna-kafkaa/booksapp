"use strict";

// === Konfiguracja ===
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

const favoriteBooks = [];
const filters = [];

// === Renderowanie książek ===
function renderBooks() {
  const bookList = document.querySelector(select.containerOf.bookList);

  for (const book of dataSource.books) {
    const generatedHTML = templates.book(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(generatedDOM);
  }
}

// === Obsługa kliknięć (ulubione + filtry) ===
function initActions() {
  const bookList = document.querySelector(".books-list");

  // Delegacja zdarzeń – dwuklik ulubionych
  bookList.addEventListener("dblclick", function (event) {
    event.preventDefault();

    const clickedElement = event.target.offsetParent;

    if (clickedElement.classList.contains("book__image")) {
      const bookId = clickedElement.getAttribute("data-id");

      if (favoriteBooks.includes(bookId)) {
        clickedElement.classList.remove("favorite");
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
      } else {
        clickedElement.classList.add("favorite");
        favoriteBooks.push(bookId);
      }

      console.log("Ulubione książki:", favoriteBooks);
    }
  });

  // Nasłuchiwacz na formularz filtrów
  const filtersForm = document.querySelector(".filters");

  filtersForm.addEventListener("click", function (event) {
    if (
      event.target.tagName === "INPUT" &&
      event.target.type === "checkbox" &&
      event.target.name === "filter"
    ) {
      const value = event.target.value;

      if (event.target.checked) {
        filters.push(value);
      } else {
        const index = filters.indexOf(value);
        filters.splice(index, 1);
      }

      console.log("Aktywne filtry:", filters);
      filterBooks(); // wywołanie filtrowania
    }
  });
}

// === Filtrowanie książek ===
function filterBooks() {
  for (const book of dataSource.books) {
    let shouldBeHidden = false;

    for (const filter of filters) {
      if (!book.details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }

    const bookImage = document.querySelector(
      `.book__image[data-id="${book.id}"]`
    );

    if (shouldBeHidden) {
      bookImage.classList.add("hidden");
    } else {
      bookImage.classList.remove("hidden");
    }
  }
}

// === Start aplikacji ===
renderBooks();
initActions();
