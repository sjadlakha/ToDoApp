$(document).ready(function () {

    $('form').on('submit', function () {

        var item = $('form input');
        var todo = { item: item.val() };

// Ajax is a set of web development techniques using many web technologies on the client side to create asynchronous web applications. With Ajax, web applications can send and retrieve data from a server asynchronously without interfering with the display and behaviour of the existing page.

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function (data) {
                //do something with the data via front-end framework
                location.reload();
                // reloading to show the added data but other frontend frameworks can also be used that can display without reloading the page
            }
        });
        // when this ajax request is made the post handler in todoController.js gets fired

        return false;

    });

    $('li').on('click', function () {
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function (data) {
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });

});