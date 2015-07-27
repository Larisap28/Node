var populateList =
    function () {
        $.ajax ({
            type: "GET",
            url: "http://localhost:8000/api/books",
            dataType: 'json',
            success: function (data) {

                $.each(data, function (i, item) {
                    //$('<tr>').html('<td>'+ item.title+
                    //    '</td>' + '<td>'+ item.author +
                    //    '</td>' + '<td>'+ item.genre +
                    //    '</td>' + '<td>'+ item.read +'</td').appendTo('#myTable');
                    //varianta de mai sus nu e ok pt ca nu vrem sa avem concatenare de stringuri

                    var $title = $('<td>').text(item.title);
                    var $author = $('<td>').text(item.author);
                    var $genre = $('<td>').text(item.genre);
                    var $read = $('<td>').text(item.read);
                    var $deleteBtn = $('<button>').text('Delete');

                    var $tr = $('<tr>').append(
                        $title,
                        $author,
                        $genre,
                        $read,
                        $deleteBtn).appendTo('#myTable');

                    $tr.attr('book-id', item._id);
                });
            },
            error: function () {
                alert('error');
            }
        });
    };

    var deleteRow =
        function(id, callback) {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:8000/api/books/"+ id,
                dataType: "json",
                success: function(data) {
                    callback();
                },

                error: function (data) {
                    alert('error');
                }
            });
        }



    var attachDeleteEventHandler = function(){

        $( "#myTable" ).on( "click", "button", function() {
            var $row = $(this).closest('tr');
            var bookId = $row.attr('book-id');
            //alert(bookId);
            deleteRow(bookId, function(){

                $row.remove();
            });
        });
    };

    var clickRow = function() {
        $("#myTable").on("click", 'td',function () {

            var $row = $(this).closest('tr');
            var bookId = $row.attr('book-id')

            window.open('bookForm.html?bookId='+ bookId);

        });
    }



        var getItem =
                function (id) {
                    $.ajax ({
                        type: "GET",
                        url: "http://localhost:8000/api/books/",
                        dataType: 'json',
                        success: function (data) {

                                $('#title').val(data.title);
                                $('#author').val(data.author);
                                $('#genre').val(data.genre);
                                $('#read').val(data.read);

                        },
                        error: function () {
                            alert('error');
                        }
                    });
                };


        $(document).ready(function () {
            populateList();
            attachDeleteEventHandler();
            clickRow();

        });


