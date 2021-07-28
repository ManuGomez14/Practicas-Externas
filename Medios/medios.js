var idGlobal;

function crearObjetoJSON(){
    var idMedio = 0;
    var nombre = document.getElementById("nombre").value;
    var url = document.getElementById("url").value;

    let medio = {
        id: idMedio,
        nombre: nombre,
        url: url
    };
    rest("post","/medio/nuevo",{nuevo:medio},function(status,medio){

    })
    aVerTodas();
}

function aVerTodas(){
    window.location.href = "http://localhost:3000/medios";
}

function verMedios(){
    rest("get","/medios/ver", function(status,medios){
        var verMedios = document.getElementById("verMedios");
        if(status==200){
            for(var i=0; i<medios.medios.length; i++){
                verMedios.innerHTML += "<div id='medio" + (i+1) + "'>"
                + "ID: " + medios.medios[i].id + "<br>"
                + "Nombre: " + medios.medios[i].nombre + "<br>"
                + "URL: " + medios.medios[i].url + "<br>"
                + "<button type='button' class='btn btn-secondary'><a style='color:white' href='http://localhost:3000/medios/modificar?id="+medios.medios[i].id+"'>Modificar</a></button> "
                + "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#staticBackdrop"+medios.medios[i].id+"'>Borrar</button>"
                //MODAL
                + "<div class='modal fade' id='staticBackdrop"+medios.medios[i].id+"' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>"
                + "<div class='modal-dialog'>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'>"
                + "<h5 class='modal-title' id='staticBackdropLabel'>Eliminar "+medios.medios[i].nombre+"</h5>"
                + "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>"
                + "</div>"
                + "<div class='modal-body'>"
                + "Está a punto de eliminar esta agencia. ¿Está usted seguro de esto?"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>"
                + "<button type='button' class='btn btn-danger' onclick='borrar("+medios.medios[i].id+")'>Borrar</button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LOS MEDIOS");
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

    rest("get","/medios/"+id, function(status,datos){
        if(status==200){
            formulario.innerHTML = "<h1>Modificar medios</h1>"
            + "<p>Modifique aquí cualquiera de los datos de este medio: </p>"
            + "<form action='javascript:modificar()'>"
            + "<label for='nombre'>Nombre: </label>"
            + "<input type='text' name='nombre' id='nombre' pattern='[A-Za-z]+' value='" + datos.nombre + "'>"
            + "<br><br>"
            + "<label for='url'>URL: </label>"
            + "<input type='text' name='url' id='url' value='" + datos.url + "'>"
            + "<br><br>"
            + "<input type='submit' value='Modificar'>"
            + "</form>";
        }else{
            alert("ERROR AL MODIFICAR EL MEDIO");
            return;
        };
    });
}

function modificar(){
    var nombre = document.getElementById("nombre").value;
    var url = document.getElementById("url").value;

    let medio = {
        id: idGlobal,
        nombre: nombre,
        url: url
    };

    rest("post","/medio/modificar",{nuevoMedio:medio}, function(status,nuevoMedio){
        if(status==200){
            alert("¡Medio modificado con éxito!");
            aVerTodas();
        };
    });
}

function borrar(id){
    rest("delete","/medio/borrar/"+id, function(status,medios){
        if(status==200){
            aVerTodas();
        }else{
            alert("ERROR AL BORRAR");
        };
    });
}