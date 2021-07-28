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
                + "<button type='button' class='btn btn-secondary'><a style='color:white' href='http://localhost:3000/tiposDifusion/modificar?id="+tiposDifusion.tiposDifusion[i].id+"'>Modificar</a></button> "
                + "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#staticBackdrop"+tiposDifusion.tiposDifusion[i].id+"'>Borrar</button>"
                //MODAL
                + "<div class='modal fade' id='staticBackdrop"+tiposDifusion.tiposDifusion[i].id+"' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>"
                + "<div class='modal-dialog'>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'>"
                + "<h5 class='modal-title' id='staticBackdropLabel'>Eliminar "+tiposDifusion.tiposDifusion[i].nombre+"</h5>"
                + "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>"
                + "</div>"
                + "<div class='modal-body'>"
                + "Está a punto de eliminar esta agencia. ¿Está usted seguro de esto?"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>"
                + "<button type='button' class='btn btn-danger' onclick='borrar("+tiposDifusion.tiposDifusion[i].id+")'>Borrar</button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
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

function borrar(id){
    rest("delete","/tipoDifusion/borrar/"+id, function(status,tiposDifusion){
        if(status==200){
            aVerTodas();
        }else{
            alert("ERROR AL BORRAR");
        };
    });
}