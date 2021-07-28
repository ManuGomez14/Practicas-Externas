var idGlobal;

function crearObjetoJSON(){
    var idAutor = 0;
    var nombre = document.getElementById("nombre").value;

    let autor = {
        id: idAutor,
        nombre: nombre
    };

    rest("post", "/autor/nuevo", {nuevo:autor}, function(status,autor){

    })
    aVerTodas();
}

function aVerTodas(){
    window.location.href = "http://localhost:3000/autores"
}

function verAutores(){
    rest("get","/autores/ver", function(status,autores){
        var verAutores = document.getElementById("verAutores");
        if(status==200){
            for(var i=0; i<autores.autores.length; i++){
                verAutores.innerHTML += "<div id='autor" + (i+1) + "'>"
                + "ID: " + autores.autores[i].id + "<br>"
                + "Nombre: " + autores.autores[i].nombre + "<br>"
                + "<button type='button' class='btn btn-secondary'><a style='color:white' href='http://localhost:3000/autores/modificar?id="+autores.autores[i].id+"'>Modificar</a></button> "
                + "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#staticBackdrop"+autores.autores[i].id+"'>Borrar</button>"
                //MODAL
                + "<div class='modal fade' id='staticBackdrop"+autores.autores[i].id+"' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>"
                + "<div class='modal-dialog'>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'>"
                + "<h5 class='modal-title' id='staticBackdropLabel'>Eliminar "+autores.autores[i].nombre+"</h5>"
                + "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>"
                + "</div>"
                + "<div class='modal-body'>"
                + "Está a punto de eliminar esta agencia. ¿Está usted seguro de esto?"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>"
                + "<button type='button' class='btn btn-danger' onclick='borrar("+autores.autores[i].id+")'>Borrar</button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "<hr>"
                + "</div>"
            };
        }else{
            alert("ERROR AL VER LOS AUTORES");
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

    rest("get","/autores/"+id, function(status,datos){
        if(status==200){
            formulario.innerHTML = "<h1>Modificar autores</h1>"
            + "<p>Modifique aquí cualquiera de los datos de este autor: </p>"
            + "<form action='javascript:modificar()'>"
            + "<label for='nombre'>Nombre: </label>"
            + "<input type='text' name='nombre' id='nombre' patter='[A-Za-z]+' value='" + datos.nombre + "'>"
            + "<br><br>"
            + "<input type='submit' valuer='Modificar'>"
            + "</form>";
        }else{
            alert("ERROR AL MODIFICAR EL AUTOR");
            return;
        };
    });
}

function modificar(){
    var nombre = document.getElementById("nombre").value;

    let autor = {
        id: idGlobal,
        nombre: nombre
    };

    rest("post","/autor/modificar",{nuevoAutor:autor},function(status,nuevoAutor){
        if(status==200){
            alert("¡Autor modificado con éxito!");
            aVerTodas();
        };
    });
}

function borrar(id){
    rest("delete","/autor/borrar/"+id, function(status,autores){
        if(status==200){
            aVerTodas();
        }else{
            alert("ERROR AL BORRAR");
        };
    });
}