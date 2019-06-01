const BookModel = require('../../../models/book')

module.exports = () => {
    return async (req, res, next) => {
        if (typeof res.locals.konyv !== 'undefined') {
            let talalat;
            await BookModel.findOne({ _bookid: res.locals.konyv._bookid }, (err, book) => { talalat = book })
            if (talalat) {
                await BookModel.updateOne({ _bookid: res.locals.konyv._bookid }, { $inc: { _cartedQuantity: +1 } })
                return res.redirect('/cart')
            }
            else {
                let saveThis = new BookModel();
                saveThis.title = res.locals.konyv.title;
                saveThis.authors = res.locals.konyv.authors;
                saveThis.categories = res.locals.konyv.categories
                saveThis.thumbnail = res.locals.konyv.thumbnail
                saveThis._isFavorited = res.locals.konyv._isFavorited;
                saveThis._cartedQuantity = 1;
                saveThis._bookid = res.locals.konyv._bookid

                saveThis.save(err => {
                    if (err) {
                        console.log("saveBookToCart - couldn't save book");
                        res.redirect('/error')
                    }
                })
                return res.redirect('/cart')
            }
        }
        else
            return res.redirect('/cart')
    }
}