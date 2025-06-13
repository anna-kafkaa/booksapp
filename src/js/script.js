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
const filters = [];

// funkcja do stylowania tła ratingu
function determineRatingBgc(rating) {
  if (rating < 6) {
    return "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)";
  } else if (rating <= 8) {
    return "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
  } else if (rating <= 9) {
    return "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
  } else {
    return "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
  }
}

// renderowanie książek
function renderBooks() {
  const bookList = document.querySelector(select.containerOf.bookList);

  for (const book of dataSource.books) {
    const ratingBgc = determineRatingBgc(book.rating);
    const ratingWidth = book.rating * 10;

    const bookData = {
      ...book,
      ratingBgc,
      ratingWidth,
    };

    const generatedHTML = templates.book(bookData);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(generatedDOM);
  }
}

// obsługa kliknięć i filtrów
function initActions() {
  const bookList = document.querySelector(".books-list");

  // delegacja zdarzeń - ulubione
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

  // obsługa checkboxów filtrujących
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
      filterBooks();
    }
  });
}

// filtrowanie książek
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

// start
renderBooks();
initActions();
