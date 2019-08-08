//variables sí
var vals = [];
var $nivel1 = $("#nivel1");
var $nivel2 = $("#nivel2");
var $nivel3 = $("#nivel3");

function generateTable(info) {
    $(".COD_REF").text(info.COD_REF);
    $(".TITULO").text(info.TITULO); // es este?
    $(".NOMBRE_PRODUCTOR").text(info.NOMBRE_PRODUCTOR);
    $(".NIVEL_DESC").text(info.NIVEL_DESC);
    $(".padre").text(info.padre);
    $(".FECHA_EXT_INI").text(info.FECHA_EXT_INI);
    $(".HIST_INSTUTUC").text(info.HIST_INSTUTUC);
    $(".LOCALIZ_ORIG").text(info.LOCALIZ_ORIG);
    $(".VOL_UNID").text(info.VOL_UNID);
    $(".FECHA_EXT_FIN").text(info.FECHA_EXT_FIN); //no, es este
    $(".NOTAS").text(info.NOTAS);
    $(".REGLAS_NORMAS").text(info.REGLAS_NORMAS);
    $(".NOTA_ARCHIVERO").text(info.NOTA_ARCHIVERO);
};

function generateTable2(info) {
    $(".COD_REF2").text(info.COD_REF);
    $(".TITULO2").text(info.TITULO);
    $(".NOMBRE_PRODUCTOR2").text(info.NOMBRE_PRODUCTOR);
    $(".NIVEL_DESC2").text(info.NIVEL_DESC);
    $(".padre2").text(info.padre);
    $(".FECHA_EXT_INI2").text(info.FECHA_EXT_INI);
    $(".HIST_INSTUTUC2").text(info.HIST_INSTUTUC);
    $(".LOCALIZ_ORIG2").text(info.LOCALIZ_ORIG);
    $(".VOL_UNID2").text(info.VOL_UNID);
    $(".FECHA_EXT_FIN2").text(info.FECHA_EXT_FIN);
    $(".NOTAS2").text(info.NOTAS);
    $(".REGLAS_NORMAS2").text(info.REGLAS_NORMAS);
    $(".NOTA_ARCHIVERO2").text(info.NOTA_ARCHIVERO);
}

function generateTable3(info) {
    $(".COD_REF3").text(info.COD_REF);
    $(".TITULO3").text(info.TITULO);
    $(".NOMBRE_PRODUCTOR3").text(info.NOMBRE_PRODUCTOR);
    $(".NIVEL_DESC3").text(info.NIVEL_DESC);
    $(".padre3").text(info.padre);
    $(".FECHA_EXT_INI3").text(info.FECHA_EXT_INI);
    $(".HIST_INSTUTUC3").text(info.HIST_INSTUTUC);
    $(".LOCALIZ_ORIG3").text(info.LOCALIZ_ORIG);
    $(".VOL_UNID3").text(info.VOL_UNID);
    $(".FECHA_EXT_FIN3").text(info.FECHA_EXT_FIN);
    $(".NOTAS3").text(info.NOTAS);
    $(".REGLAS_NORMAS3").text(info.REGLAS_NORMAS);
    $(".NOTA_ARCHIVERO3").text(info.NOTA_ARCHIVERO);
}

// $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
//     primerDropdown += '<option value="">Selecciona un fondo</option>';
//     $.each(vals, function (index, value) {
//         $nivel1.append("<option value=\"" + value.yo + "\">" + value.TITULO + "</option>");
//     });
//     $('#nivel1').html(primerDropdown);
// });

function generateDropdown(vals) {
    $nivel2.append("<option selected disabled value=\"\">Selecciona un subfondo</option>");
    $.each(vals, function (index, value) {
        $nivel2.append("<option value=\"" + value.yo + "\">" + value.TITULO + "</option>");
    });
};

//cambio en primer dropdown
$("#nivel1").change(function () {
    var $dropdown = $(this);
    var key = $dropdown.val();

    function generateDropdown(vals) {
        $nivel2.append("<option selected disabled value=\"\">Selecciona un subfondo</option>");
        $.each(vals, function (index, value) {
            $nivel2.append("<option value=\"" + value.yo + "\">" + value.TITULO + "</option>");
        });
    };

    switch (key) {
        case 'H_MX09017AGNCL01FO001AYSE001AP':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
                $nivel2.empty();

                vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos;
                generateDropdown(vals)

                $("#cedula1").removeClass("d-none");
                $("#cedula1").addClass("d-show");
                $("#collapseOne").addClass("show");
                $("#cedula2").removeClass("d-show");
                $("#cedula3").removeClass("d-show");

                info = data.H_MX09017AGNCL01FO001AYSE001AP;
                $(".cedula1titulo").text(info.TITULO);
                generateTable(info);
                $nivel3.empty();
                $('#nivel3').html('<option value="">Favor de seleccionar un subfondo</option>');
            });
            break
        case 'H_MX09017AGNCL01FO008RHSE002AL':
            $.getJSON("recursos/json/MX09017AGNCL01FO008RHSE002ALSS03ALI22262.json", function (data) {
                $nivel2.empty();

                vals = data.H_MX09017AGNCL01FO008RHSE002AL.hijos;
                generateDropdown(vals)

                $("#cedula1").removeClass("d-none");
                $("#cedula1").addClass("d-show");
                $("#collapseOne").addClass("show");
                $("#cedula2").removeClass("d-show");
                $("#cedula3").removeClass("d-show");

                

                info = data.H_MX09017AGNCL01FO008RHSE002AL;
                $(".cedula1titulo").text(info.TITULO);
                generateTable(info);
                
                $nivel3.empty();
                $('#nivel3').html('<option value="">Favor de seleccionar un subfondo</option>');
            });
            break
        case '':
            $nivel2.empty();
            vals = ['Favor de seleccionar un fondo'];
            $nivel2.append("<option>" + vals + "</option>");
            $("#cedula1").removeClass("d-show");
            $("#cedula1").addClass("d-none");
            $("#cedula2").addClass("d-none");
            $("#cedula2").removeClass("d-show");
            $("#cedula3").addClass("d-none");
            $("#cedula3").removeClass("d-show");

            $nivel3.empty();
            $('#nivel2').html('<option value="">Favor de seleccionar un fondo</option>');
            $('#nivel3').html('<option value="">Favor de seleccionar un subfondo</option>');
            break
    }

});

//cambio en segundo dropdaun
$("#nivel2").change(function () {
    var $dropdown = $(this);
    var key = $dropdown.val();

    function generateDropdown(vals) {
        $nivel3.append("<option selected disabled value=\"\">Selecciona un expediente</option>");
        $.each(vals, function (index, value) {
            $nivel3.append("<option value=\"" + value.yo + "\">" + value.TITULO + "</option>");
        });
    };

    if (key != "") {
        $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
            $nivel3.empty();

            // var vals = data.key.hijos;
            var vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI001.hijos;
            generateDropdown(vals)

            $("#collapseOne").removeClass("show");
            $("#collapseTwo").addClass("show");
            $("#cedula2").removeClass("d-none");
            $("#cedula2").addClass("d-show");

            $("#buscar-fondo").removeClass("d-none");
            $("#buscar-fondo").addClass("d-show");

            $("#plus-icon-1").addClass("collapsed")

            // info = data.key.hijos;
            info = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI001;
            $(".cedula2titulo").text(info.TITULO);
            generateTable2(info);
        });
    } else {
        $('#nivel3').html('<option value="">Favor de seleccionar un subfondo</option>');
    }
});

//cambio en tercer derpdown
$("#nivel3").change(function () {
    var $dropdown = $(this);
    var key = $dropdown.val();

    if (key != "MX09017AGN-0000026638190") {
        $.getJSON("recursos/json/niveltres.json", function (data) {
            tercerDropdown += '<option value="">Selecciona un expediente</option>';
            $.each(data, function (key) {
                if ($dropdown == key.yo) {
                    tercerDropdown += '<option value="' + key.yo + '">' + key.TITULO + '</option>';
                }
            });
            $('#nivel3').html(tercerDropdown);

            $("#collapseOne").removeClass("show");
            $("#collapseTwo").addClass("show");
            $("#cedula2").removeClass("d-none");
            $("#cedula2").addClass("d-show");

            $("#plus-icon-2").addClass("collapsed")

            console.log(key);
            info = key;
            $(".cedula2titulo").text(info.TITULO);
            generateTable2(info);
        });
    } else {
        $('#nivel3').html('<option value="">Favor de seleccionar un subfondo</option>');
    }
});