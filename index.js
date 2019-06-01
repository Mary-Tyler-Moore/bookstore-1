const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3003;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
require('./routes/routes')(app);

app.use((err, req, res, next) => {
  res.end();
  console.log('error at entry: ' + err);
});

app.listen(port, () => console.log('\n\n\thttp://localhost:' + port));
