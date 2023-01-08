const express = require("express")
const app = express()
const port = 3000
const fs = require("fs")
const cors = require("cors")

app.use(express.json())
app.use(cors())

/* Hämta books data (GET) */
app.get("/api/books", (req, res) => {
    fs.readFile("./books.json", (err, data) => {
        if(err) {
            res.status(404).send("Books not found")
        } else {
            const books = JSON.parse(data)
            res.status(200).send(books)
        }
    })
})

/* Hämta specifik book med title (GET) */
app.get("/api/books/:title", (req, res) => {
    fs.readFile("./books.json", (err, data) => {
        const books = JSON.parse(data)
        const book = books.find((books) => books.title == req.params.title)

        if(!book) {
            res.status(404).send("Book not found")
        } else {
            res.status(200).send(book)
        }
    })
})

/* Skapa new book (POST) */
app.post("/api/books", (req, res) => {
    fs.readFile("./books.json", (err, data) => {
        if(err) {
            res.status(404).send("Books not found")
        }

        const books = JSON.parse(data)
        const newBook = {
            id: 41252134,
            title: "A Storm of Swords",
            author: "George R. R. Martin",
            price: 599
        }
        books.push(newBook)

    fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
        if(err) {
            res.status(404).send("Book cannot be added")
        }

        res.status(201).send(books)
    })
    })
})

/* Uppdatera specifik book med id (PUT) */
app.put("/api/books/:id", (req, res) => {
    fs.readFile("./books.json", (err, data) => {
        const books = JSON.parse(data)
        const book = books.find((book) => book.id == req.params.id)

        if(!book) {
            res.status(404).send("Book not found")
        } else {
            books.find((book) => {
                if(book.id == req.params.id) {
                    book.title = req.body.title,
                    book.author = req.body.author,
                    book.price = req.body.price
                }
            })
        }

        fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
            if(err) {
                res.status(404).send("Book cannot be updated")
            }
            
            res.status(202).send(books)
        })
    })
})

/* Ta bort specifik book med id (DELETE) */
app.delete("/api/books/:id", (req, res) => {
    fs.readFile("./books.json", (err, data) => {
        if(err) {
            res.status(404).send("Book not found")
        } else {
            const books = JSON.parse(data)
            const book = books.find((book) => book.id == req.params.id)
            const index = books.indexOf(book)

            if(index >= 0) {
                books.splice(index, 1)
            } else {
                res.status(404).send("Book not found")
            }
            fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
                if (err) {
                    res.status(404).send("Book cannot be deleted")
                }
    
                res.status(202).send(books)
            })
        }
    })
})

/* Serverstart */
app.listen(port, () => console.log("App listening at localhost: 3000"))