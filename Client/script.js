const booksContainer = document.querySelector(".booksContainer")
const titleContainer = document.querySelector(".titleContainer")
const authorContainer = document.querySelector(".authorContainer")
const priceContainer = document.querySelector(".priceContainer")

/* Visa alla böcker med GET */
async function getAllBooks() {
    booksContainer.innerHTML = ""

    const response = await fetch("http://localhost:3000/api/books")
    const books = await response.json()

    books.forEach(book => {
        const books = document.createElement("div")
        books.setAttribute("class", "book")

        const title = document.createElement("h2");
        title.innerHTML = book.title
        title.style.cursor = "pointer"
        title.addEventListener("click", () => getBookById(book, book.id))
        books.appendChild(title)

        const price = document.createElement("p");
        price.innerHTML = `${book.price} kr`
        books.appendChild(price)

        booksContainer.appendChild(books)
    });
}

getAllBooks();

/* Visa specifik bok med GET */
async function getBookById(element, id) {
       const response = await fetch(`http://localhost:3000/api/books/${id}`,
         {
           method: 'GET',
         })
       const books = await response.json()

       booksContainer.innerHTML = ""

       const book = document.createElement("book")
       book.setAttribute("class", "book")

       const title = document.createElement("p");
       title.innerHTML = `Title: ${books.title}`
       book.appendChild(title)

       const author = document.createElement("p");
       author.innerHTML = `Author: ${books.author}`
       book.appendChild(author)

       const price = document.createElement("p");
       price.innerHTML = `Price: ${books.price} kr`
       book.appendChild(price)

       const bookId = document.createElement("p");
       bookId.innerHTML = `Id: ${books.id}`
       book.appendChild(bookId)

       const returnBtn = document.createElement("button");
       returnBtn.innerHTML = "Tillbaka"
       returnBtn.addEventListener("click", getAllBooks)
       book.appendChild(returnBtn)

       const updateBtn = document.createElement("button")
       updateBtn.innerHTML = "Ändra priset"
       updateBtn.addEventListener("click", () => updateBook(element, book))
       book.appendChild(updateBtn)

       const deleteBtn = document.createElement("button")
       deleteBtn.innerHTML = "Ta bort bok"
       deleteBtn.addEventListener("click", () => deleteBook(element.id))
       book.appendChild(deleteBtn)

       booksContainer.appendChild(book)
}

/* Lägg till bok med POST */
async function createBook() {
    const response = await fetch("http://localhost:3000/api/books",
      {
        method: 'POST',
        body: JSON.stringify(
          {
            "title": titleContainer.value,
            "author": authorContainer.value,
            "price": priceContainer.value,
            "id": Math.floor((Math.random() * 10000) + 1)
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    await response.json()
}

/* Ändra bok pris med PUT */
function updateBook(book, bookUpdate) {
    bookUpdate.innerHTML = ""

    const price = document.createElement("p")
    price.innerHTML = `Current price: ${book.price}`
    bookUpdate.appendChild(price)

    const priceInput = document.createElement("input")
    priceInput.setAttribute("type", "number")
    bookUpdate.appendChild(priceInput)

    const submitUpdateBtn = document.createElement("button")
    submitUpdateBtn.innerHTML = "Ändra"
    bookUpdate.appendChild(submitUpdateBtn)

    submitUpdateBtn.addEventListener("click", async () => {
      const response = await fetch(`http://localhost:3000/api/books/${book.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(
            {
              "price": priceInput.value
            }
          ),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      await response.json()
    })
}

/* Ta bort en specifik bok med DELETE */
async function deleteBook(id) {
    const response = await fetch(`http://localhost:3000/api/books/${id}`,
      {
        method: 'DELETE',
      })
    await response.json()
}
