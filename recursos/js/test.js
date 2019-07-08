$(document).ready(function() {
    var table = [];
    var campos = [];
    var titulos = [];
    var big_data;
    var url = window.location.href;

    // console.log(url);

    if (url.indexOf("192.168") >= 0)
        var baseurl = "http://192.168.1.118/freenas/agn";
    else if (url.indexOf("localhost") >= 0)
        var baseurl = "http://192.168.1.104";
    else
        var baseurl = "http://10.255.8.49/freenas/agn"
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            url: 'data/' + $('#fondo').val() + '.json',
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                big_data = data;
                // console.log(data[origin]['hijos'][target]);
                generateTable(data, [], "example");
            }
        }); // fin ajax
    }); // fin documentready

    function extract_object(path, arreglo, target) {
        var return_value = Array();
        var first_element = path.shift();
        // console.log(first_element);
        if (typeof first_element != 'undefined')
            return_value = arreglo[first_element];
        if (typeof return_value['hijos'] !== 'undefined') {
            return_value = return_value['hijos'];
        }

        if (path.length >= 1) {
            return_value = extract_object(path, return_value);
        }
        return return_value;
    }

    function generateTable(data, path_to_obj, target) {
        // var table_id = prepare_new_table(path_to_obj);
        console.log(path_to_obj);
        var this_table = [];
        var enlaces = "";
        var campos = [];
        var titulos = [];
        this_table['objetos'] = '';

        $.each(data, function (key, value) {
            enlaces = "";
            $.each(value, function (k, v) {
                if (typeof v == "string" && typeof value['MACRODESCRIPCION'] === 'undefined' && typeof value['N_COL_INFORMES'] === 'undefined') {
                    campos[k] = k;
                }
            });
            if (typeof value['MACRODESCRIPCION'] === 'undefined' || (typeof value['hijos'] === 'undefined' && typeof value['paths'] === 'undefined')) {
                this_table.push(value);
            }
        });

        // console.log(this_table);

        for (var key in campos) {
            titulos.push({
                "title": key,
                "data": key
            });
        }

        titulos.push({
            "title": "objetos",
            "data": "yo",
            render: function (data, type, row, meta) {
                console.log(data);
                var u = "";
                if (row.hijos != null) {
                    // for (var dato in data) {
                    u += '<button class="indice" target="' + data + '">' + data + '</button>';
                    // }
                    // console.log(data);
                }
                return u;
            }
        });

        titulos.push({
            "title": "paths",
            "data": "paths",
            render: function (data, type, row, meta) {
                var u = "";
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        u += ' <a href="' + baseurl + data[i].replace(/\\/g, "/") + '" target="_blank">' + baseurl + data[i] + '</a>';
                    }
                    // console.log(data);
                }
                return u;
            }
        });

        // $('#example').html("");
        var path_to_write = "";
        for (var i = 0; i < path_to_obj.length; i++) {
            // console.log(path_to_obj[i]);
            path_to_write += path_to_obj[i] + ",";
        }

        path_to_write += target;

        $("#" + target).next().val(path_to_write);

        $('#' + target).DataTable({
            data: this_table,
            dom: 'Bfrtip',
            buttons: [
                'csv', 'excel'
            ],
            columns: titulos,
            "initComplete": function () {
                $(".indice").on('click', function (event) {
                    // console.log(event.target);
                    //el boton con el conjunto de elemetos que vamos a abrir
                    var paths_send = Array();
                    var boton = event.target;
                    //id de la tabla actual
                    var table_id = $(boton).closest("table").attr('id');
                    //el valor objetivo que buscamos
                    var boton_id = boton.innerHTML;
                    //el contenido de los paths debajo de la tabla
                    var target = $("#" + table_id).parent().next().val();
                    //los paths separados en arreglos
                    var paths = target.split(",");
                    paths_send = target.split(",");
                    for (var i = 0; i < paths.length; i++) {
                        if (paths[i] == 'example') {
                            paths.splice(i, 1);
                            paths_send.splice(i, 1);
                        }
                    }

                    paths.push(boton_id);
                    paths_send.push(boton_id);

                    // paths_send = paths;
                    var segment_now = "";
                    for (var i = 0; i < paths.length; i++) {
                        if (paths[i] != segment_now) {
                            segment_now = paths[i];
                        } else {
                            paths.splice(i, 1);
                            paths_send.splice(i, 1);
                        }
                    }

                    //La réplica de la tabla base
                    var table = $("#example_table").html().toString();
                    table = table.replace("aidi", boton.innerHTML);
                    $("#tables_area").append(table);

                    //la extración del arreglo base, debes mandarle el path a revisar y el arreglo grandote
                    // paths_send.pop();
                    var array_target = extract_object(paths_send, big_data);
                    //la generación de la nueva tabla, debe llevar el array pequeño donde está la tabla, los nuevos paths y el nuevo target
                    generateTable(array_target, paths, boton_id);
                });

                $(".erase-this").on('click', function () {
                    $(this).parent().html("")
                });
            },
        });
        // console.log(this_table);
    }
    // function prepare_new_table(path_to_obj)
});