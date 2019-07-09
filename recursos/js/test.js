//variables sí
var vals = [];
var $nivel1 = $("#nivel1");
var $nivel2 = $("#nivel2");
var $nivel3 = $("#nivel3");
var $nivel4 = $("#nivel4");
var $nivel5 = $("#nivel5");
var $nivel6 = $("#nivel6");

//primera función generadora de cédula
function generateTable(info) {
    $(".COD_REF").text(info.COD_REF);
    $(".TITULO").text(info.TITULO); // este es?
    $(".NOMBRE_PRODUCTOR").text(info.NOMBRE_PRODUCTOR);
    $(".NIVEL_DESC").text(info.NIVEL_DESC);
    $(".padre").text(info.padre);
    $(".FECHA_EXT_INI").text(info.FECHA_EXT_INI);
    $(".HIST_INSTUTUC").text(info.HIST_INSTUTUC);
    $(".LOCALIZ_ORIG").text(info.LOCALIZ_ORIG);
    $(".VOL_UNID").text(info.VOL_UNID);
    $(".FECHA_EXT_FIN").text(info.FECHA_EXT_FIN);
    $(".NOTAS").text(info.NOTAS);
    $(".REGLAS_NORMAS").text(info.REGLAS_NORMAS);
    $(".NOTA_ARCHIVERO").text(info.NOTA_ARCHIVERO);
};

//segunda función generadora de cédula
function generateDropdown(vals) {
    $.each(vals, function (index, value) {
        $nivel2.append("<option value=\"" + value.yo + "\">" + value.TITULO + "</option>");
    });
};

//cambio en primer dropdown
$("#nivel1").change(function () {
    var $dropdown = $(this);
    var key = $dropdown.val();

    var $nextDropdown = $("#nivel" + 1);

    function generateDropdown(vals) {
        $.each(vals, function (index, value) {
            $nivel2.append("<option value=\"" + value.yo + "\">" + value.TITULO + "</option>");
        });
    };

    switch (key) {
        case 'MX09017AGNCL01FO001AYSE001AP8':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
                $nivel2.empty();

                vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos;
                generateDropdown(vals)

                $("#cedula1").removeClass("d-none");
                $("#cedula1").addClass("d-block");
                $("#collapseOne").addClass("show");
                

                info = data.H_MX09017AGNCL01FO001AYSE001AP;
                $(".cedula1titulo").text(info.TITULO);
                generateTable(info);

                console.log(vals);
            });
            break
        case 'MX09017AGNCL01FO008RHSE002ALSS03ALI22262':
            $.getJSON("recursos/json/MX09017AGNCL01FO008RHSE002ALSS03ALI22262.json", function (data) {
                $nivel2.empty();

                vals = data.H_MX09017AGNCL01FO008RHSE002AL.hijos;
                generateDropdown(vals)

                $("#cedula1").removeClass("d-none");
                $("#cedula1").addClass("d-block");
                $("#collapseOne").addClass("show");

                info = data.H_MX09017AGNCL01FO008RHSE002AL;
                $(".cedula1titulo").text(info.TITULO);
                generateTable(info);

                console.log(vals);
            });
            break
        case 'base':
            $nivel2.empty();
            vals = ['Favor de seleccionar un fondo'];
            $nivel2.append("<option>" + vals + "</option>");
            $("#cedula1").removeClass("d-block");
            $("#cedula1").addClass("d-none");
            console.log(vals);
            break
    }
});

//cambio en segundo dropdaun
$("#nivel2").change(function () {
    for (var i = 0; i < offset.length; i++) {
        if (y < offset[i].bottom) {
            $("#catSelect option:selected").removeAttr("selected");
            $("#catSelect option[value=#" + offset[i].id + "]").attr("selected", "selected");
            break;
        }
    }
});