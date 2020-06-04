const express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./db');
let index = require('../routes/index');

const app = express();

var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs());

app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({
     extended: true
}));

app.use(bodyParser.json());

const options = {
     host: 'classmysql.engr.oregonstate.edu',
     user: 'cs340_olsonpa',
     password: 'ozzyjager2013',
     database: 'cs340_olsonpa',
     multipleStatements: true
};

var sessionStore = new MySQLStore(options);

app.use(session({
     name: 'sid',
     secret: 'keyboard cat',
     resave: false,
     store: sessionStore,
     saveUninitialized: false,
     cookie: {
          maxAge: 1000 * 60 * 60 * 2,
          sameSite: true,
          secure: false,
     }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
     res.locals.isAuthenticated = req.isAuthenticated();
     next();
});

app.use('/', index);

passport.use(new LocalStrategy(
     function (email, password, done) {
          console.log('Login email: ', email);
          console.log('Login password: ', password);

          if (email && password) {
               db.loginValidation(email, password, done);
          }
          else {
               return done(null, false);
          }
     }
));

app.get('*', function (req, res, next) {
     res.status(404).render('404');
});

app.listen(port, () => {
     console.log('Server started on port', port);
});
