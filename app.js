var express = require('express');
// var bodyParser = require('body-parser');
var todoController = require('./controllers/todoController');
var app = express()

// set up template engine
app.set('view engine', 'ejs');

// static file for every route 
app.use(express.static('./public'));
// works for anything like that localhost:3000/assets/style.css

// Firing Controllers:
todoController(app);

// listen to port
app.listen(3000);
console.log("app listening to port 3000");