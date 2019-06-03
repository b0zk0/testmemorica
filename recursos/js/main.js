$(document).ready(function() {
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 50) {
            $('.memoria-buscador').stop().animate({height: "100px"},15);
        }
        else {
            $('.memoria-buscador').stop().animate({height: "200px"},15);   
        }
    });
});