"use strict";

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

function renderBooks() {
  const bookList = document.querySelector(select.containerOf.bookList);

  for (const book of dataSource.books) {
    const generatedHTML = templates.book(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(generatedDOM);
  }
}

function initActions() {
  const bookList = document.querySelector(".books-list");

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
}

renderBooks();
initActions();
