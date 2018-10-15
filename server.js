const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

require('./db/db');

const authorsController = require('./controllers/authors');

//middleware- must require this before our controller
app.use(bodyParser.urlencoded({extended: false}));


app.use('/authors', authorsController)


app.get('/', (req, res) => {
  res.render('index.ejs');
})


app.listen(3000, () => {
  console.log('app is live');
})
