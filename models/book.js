const db = require("../database/database");

const Book = db.model("Book", {
    title: String,
    authors: String,
    categories: String,
    thumbnail: String,
    _isFavorited: Boolean,
    _cartedQuantity: Number,
    _bookid: String

});

module.exports = Book;