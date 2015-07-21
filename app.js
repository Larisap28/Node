var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(req, res){
        var responseJson = {hello: "This is my api"};

        res.json(responseJson);
    });

app.use('/api', bookRouter); //a clean way to use our api routing

app.get('/', function(req, res){
   res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running on PORT:'+ port);
});