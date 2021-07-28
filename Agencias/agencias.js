var idGlobal;

function crearObjetoJSON(){
    var idAgencia = 0;
    var nombre = document.getElementById("nombre").value;
    var url = document.getElementById("url").value;

    let agencia = {
        id: idAgencia,
        nombre: nombre,
        url: url
    };

    rest("post","/agencia/nueva",{nueva:agencia},function(status,agencia){
        
    })
    aVerTodas();
}

function aVerTodas(){
    window.location.href = "http://localhost:3000/agencias";
}

function verAgencias(){
    rest("get","/agencias/ver", function(status,agencias){
        var verAgencias = document.getElementById("verAgencias");
        if(status==200){
            console.log(agencias);
            for(var i=0; i<agencias.agencias.length; i++){
                verAgencias.innerHTML += "<div id='agencia" + (i+1) +"'>"
                + "ID: " + agencias.agencias[i].id + "<br>"
                + "Nombre: " + agencias.agencias[i].nombre + "<br>"
                + "URL: " + agencias.agencias[i].url + "<br>"
                + "<button type='button' class='btn btn-secondary'><a style='color:white' href='http://localhost:3000/agencias/modificar?id="+agencias.agencias[i].id+"'>Modificar</a></button> "
                + "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#staticBackdrop"+agencias.agencias[i].id+"'>Borrar</button>"
                //MODAL
                + "<div class='modal fade' id='staticBackdrop"+agencias.agencias[i].id+"' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>"
                + "<div class='modal-dialog'>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'>"
                + "<h5 class='modal-title' id='staticBackdropLabel'>Eliminar "+agencias.agencias[i].nombre+"</h5>"
                + "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>"
                + "</div>"
                + "<div class='modal-body'>"
                + "Está a punto de eliminar esta agencia. ¿Está usted seguro de esto?"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>"
                + "<button type='button' class='btn btn-danger' onclick='borrar("+agencias.agencias[i].id+")'>Borrar</button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LAS AGENCIAS");
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

    rest("get","/agencias/"+id, function(status,datos){
        if(status==200){
            formulario.innerHTML = "<h1>Modificar agencias</h1>"
            + "<p>Modifique aquí cualquiera de los datos de esta agencia: </p>"
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
            alert("ERROR AL MODIFICAR LA AGENCIA");
            return;
        };
    });
}

function modificar(){
    var nombre = document.getElementById("nombre").value;
    var url = document.getElementById("url").value;

    let agencia = {
        id: idGlobal,
        nombre: nombre,
        url: url
    };

    rest("post","/agencia/modificar",{nuevaAgencia:agencia}, function(status,nuevaAgencia){
        if(status==200){
            alert("¡Agencia modificada con éxito!");
            aVerTodas();
        };
    });
}

function borrar(idAgencia){
    rest("delete","/agencia/borrar/"+idAgencia, function(status,agencias){
        if(status==200){
            aVerTodas();
        }else{
            alert("ERROR AL BORRAR");
        };
    });
}