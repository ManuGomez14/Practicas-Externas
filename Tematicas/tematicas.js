var idGlobal;

function crearObjetoJSON(){
    var idTematica = 0;
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;

    let tematica = {
        id: idTematica,
        nombre: nombre,
        descripcion: descripcion
    };

    rest("post","/tematica/nueva",{nueva:tematica},function(status,tematica){

    })
    aVerTodas();
}

function aVerTodas(){
    window.location.href = "http://localhost:3000/tematicas";
}

function verTematicas(){
    rest("get","/tematicas/ver", function(status,tematicas){
        var verTematicas = document.getElementById("verTematicas");
        if(status == 200){
            for(var i=0; i<tematicas.tematicas.length; i++){
                verTematicas.innerHTML += "<div id='tematica" + (i+1) + "'>"
                + "ID: " + tematicas.tematicas[i].id + "<br>"
                + "Nombre: " + tematicas.tematicas[i].nombre + "<br>"
                + "Descripción: " + tematicas.tematicas[i].descripcion + "<br>"
                + "<button type='button' class='btn btn-secondary'><a style='color:white' href='http://localhost:3000/tematicas/modificar?id="+tematicas.tematicas[i].id+"'>Modificar</a></button> "
                + "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#staticBackdrop"+tematicas.tematicas[i].id+"'>Borrar</button>"
                //MODAL
                + "<div class='modal fade' id='staticBackdrop"+tematicas.tematicas[i].id+"' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>"
                + "<div class='modal-dialog'>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'>"
                + "<h5 class='modal-title' id='staticBackdropLabel'>Eliminar "+tematicas.tematicas[i].nombre+"</h5>"
                + "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>"
                + "</div>"
                + "<div class='modal-body'>"
                + "Está a punto de eliminar esta agencia. ¿Está usted seguro de esto?"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>"
                + "<button type='button' class='btn btn-danger' onclick='borrar("+tematicas.tematicas[i].id+")'>Borrar</button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LAS TEMÁTICAS");
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

    rest("get","/tematicas/"+id, function(status,datos){
        if(status==200){
            formulario.innerHTML = "<h1>Modificar temáticas</h1>"
            + "<p>Modifique aquí cualquiera de los datos de esta temática: </p>"
            + "<form action'javascript:modificar()'>"
            + "<label for='nombre'>Nombre: </label>"
            + "<input type='text' name='nombre' id='nombre' pattern='[A-Za-z]+' value='" + datos.nombre + "'>"
            + "<br><br>"
            + "<label for='descripcion'>Descripción: </label>"
            + "<br><textarea name='descripcion' id='descripcion' cols='60' rows='7'>" + datos.descripcion + "</textarea>"
            + "<br><br>"
            + "<input type='submit' value='Modificar'>"
            + "</form>";
        }else{
            alert("ERROR AL MODIFICAR LA TEMÁTICA");
            return;
        };
    });
}

function modificar(){
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;

    let tematica = {
        id: idGlobal,
        nombre: nombre,
        descripcion: descripcion
    };

    rest("post","/tematica/modificar",{nuevaTematica:tematica}, function(status,nuevaTematica){
        if(status==200){
            alert("¡Temática modificada con éxito!");
            aVerTodas();
        };
    });
}

function borrar(id){
    rest("delete","/tematica/borrar/"+id, function(status,tematicas){
        if(status==200){
            aVerTodas();
        }else{
            alert("ERROR AL BORRAR");
        };
    });
}