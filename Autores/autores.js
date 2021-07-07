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
                + "<hr>"
                + "</div>"
            };
        }else{
            alert("ERROR AL VER LOS AUTORES");
            return;
        };
    });
}