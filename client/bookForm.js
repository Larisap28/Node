var getItem =
    function (id) {

        $.ajax({
            type: "GET",
            url: "http://localhost:8000/api/books/" + id,
            dataType: 'json',
            success: function (data) {

                $('#title').val(data.title);
                $('#author').val(data.author);
                $('#genre').val(data.genre);
                $('#read').val(data.read);
                if (data.read) {
                    $('#read').attr('checked', true);
                }


            },
            error: function () {
                alert('error');
            }
        });
    };


var saveItem =
    function (id) {

        $.ajax({
            type: "PUT",
            data: {
                title: $('#title').val(),
                author: $('#author').val(),
                genre: $('#genre').val(),
                read: $('#read').is(':checked')
            },
            url: "http://localhost:8000/api/books/" + id,
            dataType: 'json',
            success: function (data) {


                window.location = 'index.html';


            },
            error: function () {
                alert('error');
            }
        });
    };

var clickRow = function () {
    $(window).load(function () {
        getItem(bookId);
    });
};


var getBookId = function () {
    var eqIndex = window.location.search.indexOf('=');
    return window.location.search.substr(eqIndex + 1);
};


var storeBookId = function (bookId) {
    $('form').attr('book-id', bookId);
};

var showFormBtns = function (bookId) {
    if (bookId) {
        storeBookId(bookId);
        $('#saveBtn').show();
    }
    else {
        $('#createBtn').show();
    }
};

$('#saveBtn').click(function($event){
    $event.preventDefault()
   var bookId = $('form').attr('book-id');
    saveItem(bookId);
});

$(document).ready(function () {

    var bookId = getBookId();
    showFormBtns(bookId);
    getItem(bookId);

});