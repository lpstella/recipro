const express = require('express');
var exphbs  = require('express-handlebars');
var session = require('express-session')
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use(session({
    name: 'sid',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: false, 
    }
  }));

  const redirectLogin = (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login');
    } else {
        next();
    }
};

const redirectHome = (req, res, next) => {
    if(req.session.userId){
        res.redirect('/profile');
    } else {
        next();
    }
};

app.get('/login', redirectHome, function (req, res) {
    const { userId } = req.session;
    res.render('login');
});

app.post('/login', function (req, res) {
    const { username, password } = req.body;
    if( username && password) {
        const userUuid = userToUuid[username];

        const user = userMap[userUuid] && userMap[userUuid].password == password ? userUuid : null;
        if(user){
            req.session.userId = userUuid;
            return res.redirect('/profile');
        }
    }
    res.redirect('/login');
});

app.get('/register', redirectHome, function (req, res) {
    res.render('register');
});

app.post('/register', function (req, res) {
    
});



app.post('/logout', redirectLogin, function (req, res) {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('/login');
        }
        res.clearCookie('sid');
    });
});

app.get('/', (req, res, next) => {
    res.redirect('/login');
});

app.listen(3000);