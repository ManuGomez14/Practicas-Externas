var idGlobal;

function crearObjetoJSON(){
    var idProvincia = 0;
    var nombre = document.getElementById("nombre").value;

    let provincia = {
        id: idProvincia,
        nombre: nombre
    };

    rest("post","/provincia/nueva",{nueva:provincia},function(status,provincia){

    })
    aVerTodas();
}

function aVerTodas(){
    window.location.href = "http://localhost:3000/provincias";
}

function verProvincias(){
    rest("get","/provincias/ver", function(status,provincias){
        var verProvincias = document.getElementById("verProvincias");
        if(status==200){
            for(var i=0; i<provincias.provincias.length; i++){
                verProvincias.innerHTML += "<div id='provincia" + (i+1) + "'>"
                + "ID: " + provincias.provincias[i].id + "<br>"
                + "Nombre: " + provincias.provincias[i].nombre + "<br>"
                + "<button type='button' class='btn btn-secondary'><a style='color:white' href='http://localhost:3000/provincias/modificar?id="+provincias.provincias[i].id+"'>Modificar</a></button> "
                + "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#staticBackdrop"+provincias.provincias[i].id+"'>Borrar</button>"
                //MODAL
                + "<div class='modal fade' id='staticBackdrop"+provincias.provincias[i].id+"' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>"
                + "<div class='modal-dialog'>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'>"
                + "<h5 class='modal-title' id='staticBackdropLabel'>Eliminar "+provincias.provincias[i].nombre+"</h5>"
                + "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>"
                + "</div>"
                + "<div class='modal-body'>"
                + "Está a punto de eliminar esta agencia. ¿Está usted seguro de esto?"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>"
                + "<button type='button' class='btn btn-danger' onclick='borrar("+provincias.provincias[i].id+")'>Borrar</button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LAS PROVINCIAS");
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

    rest("get","/provincias/"+id, function(status,datos){
        if(status==200){
            formulario.innerHTML = "<h1>Modificar provincias</h1>"
            + "<p>Modifique aquí cualquiera de los datos de esta provincia: </p>"
            + "<form action='javascript:modificar()'>"
            + "<label for='nombre'>Nombre: </label>"
            + "<input type='text' name='nombre' id='nombre' value='" + datos.nombre + "'>"
            + "<br><br>"
            + "<input type='submit' value='Modificar'>"
            + "</form>";
        }else{
            alert("ERROR AL MODIFICAR LA PROVINCIA");
            return;
        };
    });
}

function modificar(){
    var nombre = document.getElementById("nombre").value;

    let provincia = {
        id: idGlobal,
        nombre: nombre
    };

    rest("post","/provincia/modificar",{nuevaProvincia:provincia}, function(status,nuevaProvincia){
        if(status==200){
            alert("¡Provincia modificada con éxito!");
            aVerTodas();
        };
    });
}

function borrar(id){
    rest("delete","/provincia/borrar/"+id, function(status,provincias){
        if(status==200){
            aVerTodas();
        }else{
            alert("ERROR AL BORRAR");
        };
    });
}