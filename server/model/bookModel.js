const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    publisher: String,
    description: String,
    poster: String,
    book: String
})

const bookModel = mongoose.model("books",bookSchema)
module.exports = bookModel