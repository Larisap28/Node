var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/booksAPI'); //open a connection to the database

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes');



app.use('/api/books/', bookRouter(Book)); //a clean way to use our api routing
//app.use('/api/authors', authorRouter);

app.get('/', function(req, res){
   res.send('welcome to my API!');
});




app.listen(port, function(){
    console.log('Gulp is running on PORT:'+ port);
});