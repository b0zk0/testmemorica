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

    // agrega icono de menos para elementos colapsables que están abiertos por default
    $(".collapse.show").each(function () {
        $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
    });

    // cambia entre íconos de más y menos con el show o hide del collapse
    $(".collapse").on('show.bs.collapse', function () {
        $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function () {
        $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
    });
});

