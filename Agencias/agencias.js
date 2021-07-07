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
                + "<button></button>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LAS AGENCIAS");
            return;
        };
    });
}