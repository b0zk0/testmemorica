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

//cambio en primer dropdown
$("#nivel1").change(function () {
    var $dropdown = $(this);
    var key = $dropdown.val();

    function generateDropdown(vals) {
        $nivel2.append("<option selected value=\"base\">Favor de seleccionar un fondo</option>");
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
    var $dropdown = $(this);
    var key = $dropdown.val();

    function generateDropdown(vals) {
        $nivel3.append("<option selected value=\"base\">Favor de seleccionar un subfondo</option>");
        $.each(vals, function (index, value) {
            $nivel3.append("<option value=\"" + value.yo + "\">" + value.TITULO + "</option>");
        });
    };

    switch (key) {
        case 'H-MX09017AGNCL01FO001AYSE001APUI001':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
                $nivel3.empty();
                
                vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI001.hijos;
                generateDropdown(vals)

                $("#collapseOne").removeClass("show");
                $("#cedula2").removeClass("d-none");
                $("#cedula2").addClass("d-block");
                $("#collapseTwo").addClass("show");


                info = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI001;
                $(".cedula2titulo").text(info.TITULO);
                generateTable2(info);

                console.log(vals);
            });
            break
        case 'H-MX09017AGNCL01FO001AYSE001APUI002':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
                $nivel3.empty();
                
                vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI002.hijos;
                generateDropdown(vals)

                $("#collapseOne").removeClass("show");
                $("#cedula2").removeClass("d-none");
                $("#cedula2").addClass("d-block");
                $("#collapseTwo").addClass("show");

                info = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI002;
                $(".cedula2titulo").text(info.TITULO);
                generateTable2(info);

                console.log(vals);
            });
            break
        case 'H-MX09017AGNCL01FO001AYSE001APUI003':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
                $nivel3.empty();

                vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI003.hijos;
                generateDropdown(vals)

                $("#collapseOne").removeClass("show");
                $("#cedula2").removeClass("d-none");
                $("#cedula2").addClass("d-block");
                $("#collapseTwo").addClass("show");

                info = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI003;
                $(".cedula2titulo").text(info.TITULO);
                generateTable2(info);

                console.log(vals);
            });
            break
        case 'H-MX09017AGNCL01FO001AYSE001APUI004':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
                $nivel3.empty();

                vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI004.hijos;
                generateDropdown(vals)

                $("#collapseOne").removeClass("show");
                $("#cedula2").removeClass("d-none");
                $("#cedula2").addClass("d-block");
                $("#collapseTwo").addClass("show");

                info = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI004;
                $(".cedula2titulo").text(info.TITULO);
                generateTable2(info);

                console.log(vals);
            });
            break
        case 'H-MX09017AGNCL01FO001AYSE001APUI005':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
                $nivel3.empty();

                vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI005.hijos;
                generateDropdown(vals)

                $("#collapseOne").removeClass("show");
                $("#cedula2").removeClass("d-none");
                $("#cedula2").addClass("d-block");
                $("#collapseTwo").addClass("show");

                info = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI005;
                $(".cedula2titulo").text(info.TITULO);
                generateTable2(info);

                console.log(vals);
            });
            break
        case 'H-MX09017AGNCL01FO001AYSE001APUI006':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
                $nivel3.empty();

                vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI006.hijos;
                generateDropdown(vals)

                $("#collapseOne").removeClass("show");
                $("#cedula2").removeClass("d-none");
                $("#cedula2").addClass("d-block");
                $("#collapseTwo").addClass("show");

                info = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI006;
                $(".cedula2titulo").text(info.TITULO);
                generateTable2(info);

                console.log(vals);
            });
            break
        case 'H-MX09017AGNCL01FO001AYSE001APUI007':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
                $nivel3.empty();

                vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI007.hijos;
                generateDropdown(vals)

                $("#collapseOne").removeClass("show");
                $("#cedula2").removeClass("d-none");
                $("#cedula2").addClass("d-block");
                $("#collapseTwo").addClass("show");

                info = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI007;
                $(".cedula2titulo").text(info.TITULO);
                generateTable2(info);

                console.log(vals);
            });
            break
        case 'H-MX09017AGNCL01FO001AYSE001APUI008':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {
                $nivel3.empty();

                vals = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI008.hijos;
                generateDropdown(vals)

                $("#collapseOne").removeClass("show");
                $("#cedula2").removeClass("d-none");
                $("#cedula2").addClass("d-block");
                $("#collapseTwo").addClass("show");

                info = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI008;
                $(".cedula2titulo").text(info.TITULO);
                generateTable2(info);

                console.log(vals);
            });
            break
        case 'H-MX09017AGNCL01FO008RHSE002ALSS01ALV':
            $.getJSON("recursos/json/MX09017AGNCL01FO008RHSE002ALSS03ALI22262.json", function (data) {
                $nivel3.empty();

                vals = data.H_MX09017AGNCL01FO008RHSE002AL.hijos.H_MX09017AGNCL01FO008RHSE002ALSS01ALV.hijos;
                generateDropdown(vals)

                $("#collapseOne").removeClass("show");
                $("#cedula2").removeClass("d-none");
                $("#cedula2").addClass("d-block");
                $("#collapseTwo").addClass("show");

                info = data.H_MX09017AGNCL01FO008RHSE002AL.hijos.H_MX09017AGNCL01FO008RHSE002ALSS01ALV;
                $(".cedula2titulo").text(info.TITULO);
                generateTable2(info);

                console.log(vals);
            });
            break
        case 'base':
            $nivel3.empty();
            vals = ['Favor de seleccionar un subfondo'];
            $nivel3.append("<option>" + vals + "</option>");
            $("#cedula2").removeClass("d-block");
            $("#cedula2").addClass("d-none");
            console.log(vals);
            break
    }
});

$("#nivel3").change(function () {
    var $dropdown = $(this);
    var key = $dropdown.val();

    switch (key) {
        case 'H-MX09017AGNCL01FO001AYSE001APUI001':
            $.getJSON("recursos/json/MX09017AGNCL01FO001AYSE001AP8.json", function (data) {

                $("#collapseOne").removeClass("show");
                $("#cedula2").removeClass("d-none");
                $("#cedula2").addClass("d-block");
                $("#collapseTwo").addClass("show");


                info = data.H_MX09017AGNCL01FO001AYSE001AP.hijos.H_MX09017AGNCL01FO001AYSE001APUI001;
                $(".cedula2titulo").text(info.TITULO);
                generateTable2(info);

                console.log(vals);
            });
            break
    }
});