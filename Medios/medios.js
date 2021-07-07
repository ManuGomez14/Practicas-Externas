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
                + "<button><a>Modificar</a></button>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LOS MEDIOS");
            return;
        };
    });
}