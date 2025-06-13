'use strict';

class BooksList {
  constructor() {
    this.favoriteBooks = [];
    this.filters = [];
    this.initData();
    this.getElements();
    this.render();
    this.initActions();
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    this.dom = {};
    this.dom.booksList = document.querySelector('.books-list');
    this.dom.filtersForm = document.querySelector('.filters');
  }

  determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }

  render() {
    const template = document.querySelector('#template-book').innerHTML;
    const compiledTemplate = Handlebars.compile(template);

    for (const book of this.data) {
      const ratingBgc = this.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;

      const bookData = {};
      for (let key in book) {
        bookData[key] = book[key];
      }

      bookData.ratingBgc = ratingBgc;
      bookData.ratingWidth = ratingWidth;

      const generatedHTML = compiledTemplate(bookData);
      const element = utils.createDOMFromHTML(generatedHTML);
      this.dom.booksList.appendChild(element);
    }
  }

  initActions() {
    this.dom.booksList.addEventListener('dblclick', (event) => {
      event.preventDefault();
      const clicked = event.target.offsetParent;

      if (clicked.classList.contains('book__image')) {
        const bookId = clicked.getAttribute('data-id');

        if (!this.favoriteBooks.includes(bookId)) {
          clicked.classList.add('favorite');
          this.favoriteBooks.push(bookId);
        } else {
          clicked.classList.remove('favorite');
          const index = this.favoriteBooks.indexOf(bookId);
          this.favoriteBooks.splice(index, 1);
        }
      }
    });

    this.dom.filtersForm.addEventListener('click', (event) => {
      if (
        event.target.tagName === 'INPUT' &&
        event.target.type === 'checkbox' &&
        event.target.name === 'filter'
      ) {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked && !this.filters.includes(value)) {
          this.filters.push(value);
        } else if (!isChecked) {
          const index = this.filters.indexOf(value);
          this.filters.splice(index, 1);
        }

        this.filterBooks();
      }
    });
  }

  filterBooks() {
    for (const book of this.data) {
      let shouldBeHidden = false;

      for (const filter of this.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = document.querySelector(
        `.book__image[data-id="${book.id}"]`
      );

      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }
}

const app = new BooksList();


