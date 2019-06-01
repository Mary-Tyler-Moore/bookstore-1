const fetch = require("node-fetch");

module.exports = () => {
    return async (req, res, next) => {
        if (typeof req.params.bookid !== 'undefined') {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${req.params.bookid}`);
            const data = await response.json()
            let cdata = {
                _bookid: data.id,
                _isFavorited: false,
                _cartedQuantity: 0,
                title: data.volumeInfo.title,
                authors: typeof data.volumeInfo.authors === 'undefined' ? "Unknown author" : data.volumeInfo.authors.join(', '),
                categories: typeof data.volumeInfo.categories === 'undefined' ? "Other" : data.volumeInfo.categories[0].split(' /')[0],
                thumbnail: typeof data.volumeInfo.imageLinks === "undefined" ? 'https://dummyimage.com/128x200/42f4cb/000000&text=no+image+:(' : data.volumeInfo.imageLinks.thumbnail,
            };
            res.locals.konyv = cdata;
            return next()
        }
        else
            return next()
    }
}