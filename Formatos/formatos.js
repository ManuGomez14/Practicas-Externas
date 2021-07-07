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
                + "<button><a>Modificar</a></button>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LOS FORMATOS");
            return;
        };
    });
}