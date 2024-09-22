const displayDiv = document.querySelector(".displayDiv");
const newBookBtn = document.querySelector(".newBook");
const newBookForm = document.querySelector("form");

const myLibrary = [];

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  toggleReadStatus() {
    this.readStatus = this.readStatus === "read" ? "not read" : "read";
  }
}

function displayBooks() {
  displayDiv.innerHTML = "";

  myLibrary.forEach((book, index) => renderBook(book, index));
}

function renderBook(book, index) {
  let bookDiv = document.createElement("div");

  bookDiv.dataset.index = index;

  bookDiv.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.readStatus}`;

  let removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    myLibrary.splice(index, 1);
    displayBooks();
  });

  let toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle Read Status";
  toggleBtn.addEventListener("click", () => {
    book.toggleReadStatus();
    displayBooks();
  });

  bookDiv.appendChild(removeBtn);
  bookDiv.appendChild(toggleBtn);

  displayDiv.appendChild(bookDiv);
}

newBookBtn.addEventListener("click", () => {
  newBookForm.style.display = "block";
});

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  newBookForm.style.display = "none";

  let title = e.target.title.value;
  let author = e.target.author.value;
  let pages = e.target.pages.value;
  let readStatus = e.target.readStatus.value;

  let book = new Book(title, author, pages, readStatus);

  myLibrary.push(book);

  displayBooks();
});
