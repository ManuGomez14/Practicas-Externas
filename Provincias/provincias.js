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
                + "<button><a href='http://localhost:3000/provincias/modificar?id="+provincias.provincias[i].id+"'>Modificar</a></button>"
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

function modficar(){
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