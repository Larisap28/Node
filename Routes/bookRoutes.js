var express = require('express');

var routes = function (Book) {       //routes ca functie pt ca daca vreau sa adaug ceva apoi pt testare pot sa o fac mai usor
    var bookRouter = express.Router();

    bookRouter.route('/')

        .post(function (req, res) {
            var book = new Book(req.body);

            book.save();
            res.status(201).send(book);

        })
        .get(function (req, res) {

            var query = {};
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            Book.find(query, function (err, books) {    //book is an instance of our book schema; takes a json obj as a parameter
                if (err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });                               //when you go to /api/books we're gonna do a find and just take the results and pass that back to our browser
        });
    bookRouter.use(':/bookId', function (req, res, next) {     //that says, hey, I'm about to do a middleware and I'm going to use only for the rute that has a book id
        Book.findById(req.params.bookId, function (err, book) {    //book is an instance of our book schema; takes a json obj as a parameter
            if (err)
                res.status(500).send(err);
            else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('no book found');
            }
        });
    });
    bookRouter.route('/:bookId')
        .get(function (req, res) {

            res.json(req.book);

            //when you go to /api/books we're gonna do a find and just take the results and pass that back to our browser
        })

        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;    //everything is in req.book is modified with whatever is in req.body
            req.book.save(function(err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.book);
                }
            });
            //res.json(req.book);
        })

    .patch(function(req,res){          //we don't want to update the id
        if(req.body._id)
            delete req.body._id;

        for (var p in req.body)
        {
            req.book[p] = req.body[p];
        }
        req.book.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.book);
            }
        });
    })
    return bookRouter;
};

module.exports = routes;
