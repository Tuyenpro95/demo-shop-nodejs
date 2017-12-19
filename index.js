require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

require('./config/passport');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(session({
	secret: process.env.SESSION_SECRET
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req,res) => {
	res.render('index')
})


app.listen(8080, () => console.log("Server is running 8080"));

