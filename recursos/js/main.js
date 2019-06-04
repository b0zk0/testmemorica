$(document).ready(function() {
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 100) {
            $('.memoria-buscador').stop().animate({height: "100px"},15);
        }
        else {
            $('.memoria-buscador').stop().animate({height: "200px"},15);   
        }
    });

    if ($('#siteBreadcrumb ol.breadcrumb')) {
        var here = location.href.replace(/(\?.*)$/, '').split('/').slice(3);

        var parts = [{
            "text": 'Home',
            "link": '/'
        }];

        for (var j = 0; j < here.length; j++) {
            var part = here[j];
            var pageName = part.toLowerCase();
            pageName = part.charAt(0).toUpperCase() + part.slice(1);
            var link = '/' + here.slice(0, j + 1).join('/');
            $('#siteBreadcrumb ol.breadcrumb').append('<li class="breadcrumb-item active">' + pageName.replace(/\.(htm[l]?|asp[x]?|php|jsp)$/, '') + '</li>');
            parts.push({
            "text": pageName,
            "link": link
            });
        }
    }
});