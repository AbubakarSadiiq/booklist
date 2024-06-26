// Book Constructor
function Book(name, title, author, serialnumber) {
  this.name = name;
  this.title = title;
  this.author = author;
  this.serialnumber = serialnumber;
}

// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.name}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.serialnumber}</td>
    <td><a href="#" class="delete">X<a></td>
  `;

  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById('name').value = '';
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('serialnumber').value = '';
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const username = document.getElementById('name').value,
        title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        serialnumber = document.getElementById('serialnumber').value

  // Instantiate book
  const book = new Book(username, title, author, serialnumber); 

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(username === ''|| title === '' || author === '' || serialnumber === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');
  
    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});