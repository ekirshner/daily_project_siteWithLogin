const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const session = require('express-session');

const server = express();

server.use(bodyparser.urlencoded({extended: false}));

// create array of users
const users = [
    {username: 'erica', password: "feed"},
    {username: "ben", password: "pants"},
    {username: "luke", password: "tacos"},
    {username: "mike", password: "yamama"}
];

// configure server
server.engine('mustache', mustache());
server.set('views', './templates');
server.set('view engine', 'mustache');

//from Luke's notes
server.use(session({
    secret: '98rncailevn-_DT83FZ@',
    resave: false,
    saveUninitialized: true
}));
// 

server.get('/', function(req,res) {
    res.render('index');
});


// When a user logs in, redirect them to the home page IF
// 1) the username is legit, and
// 2) the password and username match
server.post('/login', function (req, res) {
    let user = null;
    let username = req.body.username;
    let password = req.body.password;

    for(let i = 0; i < users.length ; i++) {
        if(username === users[i].username && 
           password === users[i].password) {
           user = users[i];
        }
    }
// if user is verified, pass them to the home page. 
    if(user != null) {
        req.session.victim = user;
        res.redirect('/home');
 // else, send them back to login
    }else {
        res.redirect('/')
    }

    // res.render('home');
});

server.get('/home', function (req, res) {
    if(req.session.victim !== undefined) {
        res.render('home', {
            username: req.session.victim.username
        })
    }else {
        res.redirect('/');
    }
})



// run the server
server.listen(3000, function () {
    console.log('yeeaahhhh buddy!');
});

