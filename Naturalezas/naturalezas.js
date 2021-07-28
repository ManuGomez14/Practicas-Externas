var idGlobal;
function crearObjetoJSON(){
    var idNaturaleza = 0;
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;

    let naturaleza = {
        id: idNaturaleza,
        nombre: nombre,
        descripcion: descripcion
    };
    
    rest("post","/naturaleza/nueva",{nueva:naturaleza},function(status,naturaleza){

    })
    aVerTodas();
}

function aVerTodas(){
    window.location.href = "http://localhost:3000/naturalezas";
}

function verNaturalezas(){
    rest("get","/naturalezas/ver", function(status,naturalezas){
        var verNaturalezas = document.getElementById("verNaturalezas");
        if(status==200){
            for(var i=0; i<naturalezas.naturalezas.length; i++){
                verNaturalezas.innerHTML += "<div id='naturaleza" + (i+1) + "'>"
                + "ID: " + naturalezas.naturalezas[i].id + "<br>"
                + "Nombre: " + naturalezas.naturalezas[i].nombre + "<br>"
                + "Descripción: " + naturalezas.naturalezas[i].descripcion + "<br>"
                + "<button type='button' class='btn btn-secondary'><a style='color:white' href='http://localhost:3000/naturalezas/modificar?id="+naturalezas.naturalezas[i].id+"'>Modificar</a></button> "
                + "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#staticBackdrop"+naturalezas.naturalezas[i].id+"'>Borrar</button>"
                //MODAL
                + "<div class='modal fade' id='staticBackdrop"+naturalezas.naturalezas[i].id+"' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>"
                + "<div class='modal-dialog'>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'>"
                + "<h5 class='modal-title' id='staticBackdropLabel'>Eliminar "+naturalezas.naturalezas[i].nombre+"</h5>"
                + "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>"
                + "</div>"
                + "<div class='modal-body'>"
                + "Está a punto de eliminar esta agencia. ¿Está usted seguro de esto?"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>"
                + "<button type='button' class='btn btn-danger' onclick='borrar("+naturalezas.naturalezas[i].id+")'>Borrar</button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LAS NATURALEZAS");
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

    rest("get","/naturalezas/"+id, function(status,datos){
        if(status==200){
            formulario.innerHTML = "<h1>Modificar naturalezas</h1>"
            + "<p>Modifique aquí cualquiera de los datos de esta naturaleza: </p>"
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
            alert("ERROR AL MODIFICAR LA NATURALEZA");
            return;
        };
    });
}

function modificar(){
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;

    let naturaleza = {
        id: idGlobal,
        nombre: nombre,
        descripcion: descripcion
    };

    rest("post","/naturaleza/modificar",{nuevaNaturaleza:naturaleza}, function(status,nuevaNaturaleza){
        if(status==200){
            alert("¡Naturaleza modificada con éxito!");
            aVerTodas();
        };
    });
}

function borrar(id){
    rest("delete","/naturaleza/borrar/"+id, function(status,naturalezas){
        if(status==200){
            aVerTodas();
        }else{
            alert("ERROR AL BORRAR");
        };
    });
}