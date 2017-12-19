var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');



var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req,res) => {
	res.render('index')
})


app.listen(8080, () => console.log("Server is running 8080"));

