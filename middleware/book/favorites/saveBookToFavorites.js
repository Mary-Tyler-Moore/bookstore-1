const BookModel = require('../../../models/book')

module.exports = () => {
    return async (req, res, next) => {
        if (typeof res.locals.konyv !== 'undefined') {
            let talalat;
            await BookModel.findOne({ _bookid: res.locals.konyv._bookid }, (err, book) => { talalat = book })
            if (talalat && talalat._isFavorited === true) {
                return res.redirect('/favorites')
            }
            else if (talalat && talalat._isFavorited === false) {
                await BookModel.updateOne({ _bookid: res.locals.konyv._bookid }, { _isFavorited: true })
                return res.redirect('/favorites')
            }
            else {
                let saveThis = new BookModel();
                saveThis.title = res.locals.konyv.title;
                saveThis.authors = res.locals.konyv.authors;
                saveThis.categories = res.locals.konyv.categories
                saveThis.thumbnail = res.locals.konyv.thumbnail
                saveThis._isFavorited = true;
                saveThis._cartedQuantity = res.locals.konyv._cartedQuantity;
                saveThis._bookid = res.locals.konyv._bookid

                saveThis.save(err => {
                    if (err) {
                        console.log("saveBookMW - couldn't save book");
                        res.redirect('/error')
                    }
                })
                return res.redirect('/favorites')
            }
        }
        else
            return res.redirect('/favorites')
    }
}