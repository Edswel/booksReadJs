class Book {
  constructor(title, author, review) {
    this.title = title;
    this.author = author;
    this.review = review;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create table row element
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.review}</td>
    <td>
      <a href='#' class='delete'>X</a>
    </td>
  `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add message
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Disappear after three seconds
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('review').value = '';
  }
}

class Store {
  // Fetch books from local storage
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  // Display books fetched from local storage
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  // Add book to local storage
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  // Remove books from local storage
  static removeBook() { }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Events
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Get input values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const review = document.getElementById('review').value;

  // Instantiate a book
  const book = new Book(title, author, review);

  // Instantiate UI
  const ui = new UI();

  // Validate input fields
  if (title === '' || author === '' || review === '') {
    // Error alert
    ui.showAlert('Please fill in all fields.', 'error');
  } else {
    // Add new book
    ui.addBookToList(book);
    // Add book to local storage
    Store.addBook(book);
    // Show success message
    ui.showAlert('Book added successfully.', 'success');
    // Clear input fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Delete functionality
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();
  // Delete book
  ui.deleteBook(e.target);

  // Show alert message
  ui.showAlert('Book deleted successfully', 'success');

  e.preventDefault();
});