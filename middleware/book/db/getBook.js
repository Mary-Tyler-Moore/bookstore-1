const BookModel = require('../../../models/book')

module.exports = () => {
    return (req, res, next) => {
        if (typeof res.locals.konyv === 'undefined') {
            BookModel.findOne({ _bookid: req.params.bookid }, (err, book) => {
                if (err) {
                    console.log("getBook - couldn't get from db");
                    return res.redirect("/error");
                }
                res.locals.konyv = book;
                return next()
            });
        }
        else
            return next();
    }
}
