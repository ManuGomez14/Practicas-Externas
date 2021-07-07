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
                + "<button><a>Modificar</a></button>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LAS NATURALEZAS");
            return;
        };
    });
}