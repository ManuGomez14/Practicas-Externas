var idGlobal;

function crearObjetoJSON(){
    var idTipoDifusion = 0;
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;

    let tipoDifusion = {
        id: idTipoDifusion,
        nombre: nombre,
        descripcion: descripcion
    };

    rest("post","/tipoDifusion/nuevo",{nuevo:tipoDifusion},function(status,tipoDifusion){

    })
    aVerTodas();
}

function aVerTodas(){
    window.location.href = "http://localhost:3000/tiposDifusion";
}

function verTiposDifusion(){
    rest("get","/tiposDifusion/ver", function(status,tiposDifusion){
        var verTiposDifusion = document.getElementById("verTiposDifusion");
        if(status==200){
            for(var i=0; i<tiposDifusion.tiposDifusion.length; i++){
                verTiposDifusion.innerHTML += "<div id='tipoDifusion" + (i+1) + "'>"
                + "ID: " + tiposDifusion.tiposDifusion[i].id + "<br>"
                + "Nombre: " + tiposDifusion.tiposDifusion[i].nombre + "<br>"
                + "Descripción: " + tiposDifusion.tiposDifusion[i].descripcion + "<br>"
                + "<button><a href='http://localhost:3000/tiposDifusion/modificar?id="+tiposDifusion.tiposDifusion[i].id+"'>Modificar</a></button>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LOS TIPOS DE DIFUSIÓN");
            return;
        };
    });
}

function recogerID(){
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var id = urlParams.get('id');
    idGlobal = id;
    var formulario = document.getElementById("formulario");

    rest("get","/tiposDifusion/"+id, function(status,datos){
        if(status==200){
            formulario.innerHTML = "<h1>Modificar tipos de difusión</h1>"
            + "<p>Modifique aquí cualquiera de los datos de este tipo de difusión: </p>"
            + "<form action='javascript:modificar()'>"
            + "<label for='nombre'>Nombre: </label>"
            + "<input type='text' name='nombre' id='nombre' pattern='[A-Za-z]+' value='" + datos.nombre + "'>"
            + "<br><br>"
            + "<label for='descripcion'>Descripción: </label>"
            + "<br><textarea name='descripcion' id='descripcion' cols='60' rows='7'>" + datos.descripcion + "</textarea>"
            + "<br><br>"
            + "<input type='submit' value='Modificar'>"
            + "</form>";
        }else{
            alert("ERROR AL MODIFICAR EL TIPO DE DIFUSIÓN");
            return;
        };
    });
}

function modificar(){
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;

    let tipoDifusion = {
        id: idGlobal,
        nombre: nombre,
        descripcion: descripcion
    };

    rest("post","/tipoDifusion/modificar",{nuevoTipoDifusion:tipoDifusion}, function(status,nuevoTipoDifusion){
        if(status==200){
            alert("¡Tipo de Difusión modificado con éxito!");
            aVerTodas();
        };
    });
}
