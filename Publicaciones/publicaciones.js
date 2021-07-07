var idGlobal;

function crearObjetoJSON(){
    var idPublicacion = 0;
    var url = document.getElementById("url").value;
    var fuente = document.getElementById("fuente").value;
    var tipo = document.getElementById("tipo").value;

    let publicacion = {
        id: idPublicacion,
        url: url,
        fuente: fuente,
        tipo: tipo
    };

    rest("post","/publicacion/nueva",{nueva:publicacion},function(status,publicacion){

    })
    aVerTodas();
}

function aVerTodas(){
    window.location.href = "http://localhost:3000/publicaciones";
}

function verPublicaciones(){
    rest("get","/publicaciones/ver", function(status,publicaciones){
        var verPublicaciones = document.getElementById("verPublicaciones");
        if(status==200){
            for(var i=0; i<publicaciones.publicaciones.length; i++){
                verPublicaciones.innerHTML += "<div id='publicacion" + (i+1) + "'>"
                + "ID: " + publicaciones.publicaciones[i].id + "<br>"
                + "URL: " + publicaciones.publicaciones[i].url + "<br>"
                + "Fuente: " + publicaciones.publicaciones[i].fuente + "<br>"
                + "Tipo: " + publicaciones.publicaciones[i].tipo + "<br>"
                + "<button><a href='http://localhost:3000/publicaciones/modificar?id="+publicaciones.publicaciones[i].id+"'>Modificar</a></button>"
                + "<hr>"
                + "</div>";          
            };
        }else{
            alert("ERROR AL VER LAS PUBLICACIONES");
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

    rest("get","/publicaciones/"+id, function(status,datos){
        if(status==200){
            formulario.innerHTML = "<h1>Modificar publicaciones</h1>"
            + "<p>Modifique aquí cualquiera de los datos de esta publicación: </p>"
            + "<form action='javascript:modificar()'>"
            + "<label for='url'>URL: </label>"
            + "<input type='text' name='url' id='url' value='" + datos.url + "'>"
            + "<br><br>"
            + "<label for='fuente'>Fuente: </label>"
            + "<input type='text' name='fuente' id='fuente' value='" + datos.fuente + "'>"
            + "<br><br>"
            + "<label for='tipo'>Tipo: </label>"
            + "<input type='text' name='tipo' id='tipo' value='" + datos.tipo + "'>"
            + "<br><br>"
            + "<input type='submit' value='Modificar'>"
            + "</form>";
        }else{
            alert("ERROR AL MODIFICAR LA PUBLICACIÓN");
            return;
        };
    });
}

function modificar(){
    var url = document.getElementById("url").value;
    var fuente = document.getElementById("fuente").value;
    var tipo = document.getElementById("tipo").value;

    let publicacion = {
        id: idGlobal,
        url: url,
        fuente: fuente,
        tipo: tipo
    };

    rest("post","/publicacion/modificar",{nuevaPublicacion:publicacion}, function(status,nuevaPublicacion){
        if(status==200){
            alert("¡Publicación modificada con éxito!");
            aVerTodas();
        };
    });
}