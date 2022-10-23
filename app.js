// Book Constructor
function Book(title, author, review) {
  this.title = title;
  this.author = author;
  this.review = review;
}

// UI Constructor
function UI() {

}

// Events
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Get input values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const review = document.getElementById('review').value;

  // Instantiate a book
  const book = new Book(title, author, review);

  console.log(book);
  e.preventDefault();
});