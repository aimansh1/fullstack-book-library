const hamMenu = document.querySelector(".ham-menu");
const sideMenu = document.querySelector(".sliding-menu");
hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  sideMenu.classList.toggle("active");
});

function getBook() {
  return {
    authorName: document.getElementById("author-name").value.trim(),
    bookTitle: document.getElementById("book-title").value.trim(),
    publishYear: document.getElementById("publish-year").value.trim(),
    genre: document.getElementById("genre").value,
  };
}

// ——————————————————————————————
// 2) Handle the Add Book form submit
function addBook(e) {
  e.preventDefault();

  const newBook = getBook();
  const library = JSON.parse(localStorage.getItem("myLibrary") || "[]");
  library.push(newBook);
  localStorage.setItem("myLibrary", JSON.stringify(library));

  // go to the library page to see it
  window.location.href = "library.html";
}

// If you have your form in add-book.html:
const form = document.querySelector("form.submit-inputs");
if (form) {
  form.addEventListener("submit", addBook);
}

// ——————————————————————————————
// 3) On library.html: read & render all saved books
const container = document.querySelector(".books"); // match your <div class="books">
if (container) {
  const library = JSON.parse(localStorage.getItem("myLibrary") || "[]");

  library.forEach((book, index) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="book" data-index="${index}">
        <div class="book-img">
          <img
            src="https://picsum.photos/200/250?random=${index + 1}"
            alt="${book.bookTitle} cover"
          />
        </div>
        <div class="under-book">
          <div class="book-details">
            <h3 class="book-name">${book.bookTitle}</h3>
            <p class="publish-year">year: ${book.publishYear}</p>
            <p class="author">${book.authorName}</p>
            <p class="book-genre">${book.genre}</p>
          </div>
          <div class="book-delete">
            <button class="del-btn" data-index="${index}">
              X delete Book
            </button>
          </div>
        </div>
      </div>
      `
    );
  });

  // ——————————————————————————————
  // 4) Handle deletes by array index
  container.addEventListener("click", (e) => {
    if (!e.target.matches(".del-btn")) return;

    const idx = Number(e.target.dataset.index);
    library.splice(idx, 1);
    localStorage.setItem("myLibrary", JSON.stringify(library));

    // remove from the DOM
    e.target.closest(".book").remove();

    // (Optional) re-render to fix any shifted indexes:
    // container.innerHTML = "";
    // library.forEach((b, i) => { /* same insertAdjacentHTML as above with i */ });
  });
}
