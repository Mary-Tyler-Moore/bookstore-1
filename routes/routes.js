const fetchBooksByName = require("../middleware/book/api/fetchBooksByName");
const _render = require("../middleware/render")
const fetchBookByID = require('../middleware/book/api/fetchBookByID')
const saveBookToFavorites = require('../middleware/book/Favorites/saveBookToFavorites')
const getFavoriteBooks = require('../middleware/book/Favorites/getFavoriteBooks')
const delBookFromFavorites = require('../middleware/book/Favorites/delBookFromFavorites')
const getBook = require('../middleware/book/db/getBook')
const saveBookToCart = require('../middleware/book/cart/saveBookToCart')
const getCartedBooks = require('../middleware/book/cart/getCartedBooks')
const delUpdateBookFromCart = require('../middleware/book/cart/delUpdateBookFromCart')



module.exports = app => {

    app.use("/favorites/add/:bookid", fetchBookByID(), saveBookToFavorites())
    app.use('/favorites/del/:bookid', getBook(), delBookFromFavorites())
    app.use("/favorites", getFavoriteBooks(), _render('favorites'))

    app.use("/cart/add/:bookid", fetchBookByID(), saveBookToCart())
    app.use('/cart/del/:bookid', getBook(), delUpdateBookFromCart())
    app.use("/cart", getCartedBooks(), _render('cart'))

    app.use("/search", fetchBooksByName(), _render('search'));


    app.use("/error", _render('index')) /// TODO!
    app.use("/", _render('index'));

}