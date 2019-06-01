const BookModel = require('../../../models/book')

module.exports = () => {
    return (req, res, next) => {
        if (typeof res.locals.konyvek === 'undefined') {
            BookModel.find({ _isFavorited: true }, (err, books) => {
                if (err) {
                    console.log("getBooks - couldn't get from db");
                    return res.redirect("/error");
                }
                res.locals.konyvek = books;
                return next()
            });
        }
        else
            return next();
    }
}
