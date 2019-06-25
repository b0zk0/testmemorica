$(document).ready(function() {
    // buscador de tañamo variable
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 100) {
            $('.altura-variable').stop().animate({height: "100px"},15);
        }
        else {
            $('.altura-variable').stop().animate({height: "200px"},15);   
        }
    });

    // búsqueda coqueta
    $('#searchButton').click(function () {
        var search = $('#usersSearch').val();
        $.post('../searchusers.php', { search: search }, function (response) {
            $('#userSearchResultsTable').html(response);
        });
    })
    
    $('#usersSearch').keypress(function (e) {
        if (e.which == 13) {//Enter key pressed
            $('#searchButton').click();//Trigger search button click event
        }
    });
});

