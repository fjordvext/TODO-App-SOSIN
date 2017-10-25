const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
require('dotenv').config();
app.use(methodOverride('_method'))
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


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

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.redirect('/todo');
});

const todoRoutes = require('./routes/todo-routes');
app.use('/todo', todoRoutes);
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid route!',
  });
});
