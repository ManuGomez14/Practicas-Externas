var idGlobal;

function crearObjetoJSON(){
    var idFormato = 0;
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;

    let formato = {
        id: idFormato,
        nombre: nombre,
        descripcion: descripcion
    };

    rest("post", "/formato/nuevo",{nuevo:formato},function(status,formato){

    })
    aVerTodas();
}

function aVerTodas(){
    window.location.href = "http://localhost:3000/formatos";
}

function verFormatos(){
    rest("get","/formatos/ver", function(status,formatos){
        var verFormatos = document.getElementById("verFormatos");
        if(status==200){
            for(var i=0; i<formatos.formatos.length; i++){
                verFormatos.innerHTML += "<div id='formato" + (i+1) + "'>"
                + "ID: " + formatos.formatos[i].id + "<br>"
                + "Nombre: " + formatos.formatos[i].nombre + "<br>"
                + "Descripción: " + formatos.formatos[i].descripcion + "<br>"
                + "<button type='button' class='btn btn-secondary'><a style='color:white' href='http://localhost:3000/formatos/modificar?id="+formatos.formatos[i].id+"'>Modificar</a></button> "
                + "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#staticBackdrop"+formatos.formatos[i].id+"'>Borrar</button>"
                //MODAL
                + "<div class='modal fade' id='staticBackdrop"+formatos.formatos[i].id+"' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>"
                + "<div class='modal-dialog'>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'>"
                + "<h5 class='modal-title' id='staticBackdropLabel'>Eliminar "+formatos.formatos[i].nombre+"</h5>"
                + "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>"
                + "</div>"
                + "<div class='modal-body'>"
                + "Está a punto de eliminar esta agencia. ¿Está usted seguro de esto?"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>"
                + "<button type='button' class='btn btn-danger' onclick='borrar("+formatos.formatos[i].id+")'>Borrar</button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LOS FORMATOS");
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

    rest("get","/formatos/"+id, function(status,datos){
        if(status==200){
            formulario.innerHTML = "<h1>Modificar formato</h1>"
            + "<p>Modifique aquí cualquiera de los datos de este formato: </p>"
            + "<form action='javascript:modificar()'>"
            + "<label for='nombre'>Nombre: </label>"
            + "<input type='text' name='nombre' id='nombre' patter='[A-Za-z]+' value='" + datos.nombre + "'>"
            + "<br><br>"
            + "<label for='descripcion'>Descripción: </label>"
            + "<br><textarea name='descripcion' id='descripcion' cols='60' rows='7'>" + datos.descripcion + "</textarea>"
            + "<br><br>"
            + "<input type='submit' value='Modificar'>"
            + "</form>";
        }else{
            alert("ERROR AL MODIFICAR EL FORMATO");
            return;
        };
    });
}

function modificar(){
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;

    let formato = {
        id:idGlobal,
        nombre: nombre,
        descripcion: descripcion
    };

    rest("post","/formato/modificar",{nuevoFormato:formato},function(status,nuevoFormato){
        if(status==200){
            alert("¡Formato modificado con éxito!");
            aVerTodas();
        };
    });
}

function borrar(id){
    rest("delete","/formato/borrar/"+id, function(status,formatos){
        if(status==200){
            aVerTodas();
        }else{
            alert("ERROR AL BORRAR");
        };
    });
}