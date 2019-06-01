const BookModel = require('../../../models/book')

module.exports = () => {
    return (req, res, next) => {
        if (typeof res.locals.konyv !== 'undefined') {
            if (res.locals.konyv._isFavorited === false && res.locals.konyv._cartedQuantity < 2) {
                res.locals.konyv.remove(err => {
                    if (err) {
                        console.log("delBookFromFavorites - couldn't delete from db");
                        return res.redirect("/error");
                    }
                })
                return res.redirect('/cart')
            }
            else {
                BookModel.updateOne({ _bookid: res.locals.konyv._bookid }, { $inc: { _cartedQuantity: -1 } }, (err, book) => {
                    if (err) {
                        console.log("delBookFromFavorites - couldn't update item");
                        return res.redirect("/error");
                    }
                })
                return res.redirect('/cart')
            }
        }
        else
            return res.redirect('/cart')
    }
}