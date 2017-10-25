const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
app.use(methodOverride('_method'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
  res.redirect('/todo');
});

const todoRoutes = require('./routes/todo-routes');
app.use('/todo', todoRoutes);

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid route!',
  });
});
