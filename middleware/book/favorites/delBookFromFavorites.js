const BookModel = require('../../../models/book')

module.exports = () => {
    return (req, res, next) => {
        if (typeof res.locals.konyv !== 'undefined') {
            if (res.locals.konyv._cartedQuantity === 0) {
                res.locals.konyv.remove(err => {
                    if (err) {
                        console.log("delBookFromFavorites - couldn't delete from db");
                        return res.redirect("/error");
                    }
                })
                return res.redirect('/favorites')
            }
            else {
                BookModel.updateOne({ _bookid: res.locals.konyv._bookid }, { _isFavorited: false }, (err, book) => {
                    if (err) {
                        console.log("delBookFromFavorites - couldn't update item");
                        return res.redirect("/error");
                    }
                })
                return res.redirect('/favorites')
            }
        }
        else
            return res.redirect('/favorites')
    }
}