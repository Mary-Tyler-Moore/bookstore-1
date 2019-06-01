const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true });

module.exports = mongoose;