// Book Constructor
function Book(title, author, review) {
  this.title = title;
  this.author = author;
  this.review = review;
}

// UI Constructor
function UI() {

}

// Add new book functionality
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  // Create table row element
  const row = document.createElement('tr');
  // Insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.review}</td>
    <td><a href='#' class='delete'>X</a></td>
  `;
  list.appendChild(row);
}

// Clear fields functionality
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('review').value = '';
}

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
  console.log(ui);

  // Add new book
  ui.addBookToList(book);

  // Clear input fields
  ui.clearFields();

  e.preventDefault();
});