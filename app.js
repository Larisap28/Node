var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors');
var db = mongoose.connect('mongodb://localhost/booksAPI');

var Book = require('./models/bookModel');

var app = express();
app.use(cors());
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);


app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);



app.get('/', function(req, res) {
    res.send('welcome to my API');


});

app.listen(port, function(){
    console.log('Gulp is running my app on PORT: ' + port);


});