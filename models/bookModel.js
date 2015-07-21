var mongoose = require('mongoose'),
    Schema = mongoose.Schema;       //referinte pt mongoose si schema

var bookModel = new Schema({     //cream schema
    title: {
        type: String
    },
    author:{
        type: String
    },
    genre:{
        type: String
    },
    read:{
        type: Boolean, default:false
    }
});
module.exports = mongoose.model('Book', bookModel, 'book'); //we're gonna load this model into mongoose; a new model(schema) called Book.
