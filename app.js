var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/booksAPI'); //open a connection to the database

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(req, res){
        Book.find({},function(err, books){    //book is an instance of our book schema; takes a json obj as a parameter
            if(err)
                console.log(err)
            else
                res.json(books);
        });                               //when you go to /api/books we're gonna do a find and just take the results and pass that back to our browser
    });

//bookRouter.route('/Books/:bookId')

app.use('/api', bookRouter); //a clean way to use our api routing

app.get('/', function(req, res){
   res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running on PORT:'+ port);
});