const fetch = require("node-fetch");

module.exports = () => {
  return async (req, res, next) => {
    if (typeof req.body.searchInput !== 'undefined') {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.body.searchInput}&maxResults=11`);
      const data = await response.json();
      let cdata = data.items.map(({ volumeInfo }) => {
        return {
          title: volumeInfo.title,
          authors: typeof volumeInfo.authors === 'undefined' ? "Unknown author" : volumeInfo.authors.join(', '),
          categories: typeof volumeInfo.categories === 'undefined' ? "Other" : volumeInfo.categories.join(', '),
          thumbnail: typeof volumeInfo.imageLinks === "undefined" ? 'https://dummyimage.com/128x200/42f4cb/000000&text=no+image+:(' : volumeInfo.imageLinks.thumbnail,
        };
      });
      cdata.forEach((konyv, index) => {
        konyv._bookid = data.items[index].id;
        konyv._isFavorited = false;
        konyv._cartedQuantity = 0
      })
      res.locals.konyvek = cdata;
      return next();
    }
    else
      return next()
  }
};
