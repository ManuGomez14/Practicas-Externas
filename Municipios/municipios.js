function crearObjetoJSON(){
    var idMunicipio = 0;
    var nombre = document.getElementById("nombre").value;
    var provincia = document.getElementById("provincia").value;
    var poblacion = document.getElementById("poblacion").value;
    var hombres = document.getElementById("hombres").value;
    var mujeres = document.getElementById("mujeres").value;

    let municipio = {
        id: idMunicipio,
        nombre: nombre,
        provincia: provincia,
        poblacion: poblacion,
        hombres: hombres,
        mujeres: mujeres
    };

    rest("post","/municipio/nuevo",{nuevo:municipio},function(status,municipio){

    })
    aVerTodas();
}

function aVerTodas(){
    window.location.href = "http://localhost:3000/municipios";
}

function verMunicipios(){
    rest("get","/municipios/ver",function(status,municipios){
        var verMunicipios = document.getElementById("verMunicipios");
        if(status==200){
            for(var i=0; i<municipios.municipios.length; i++){
                verMunicipios.innerHTML += "<div id='municipio" + (i+1) + "'>"
                + "ID: " + municipios.municipios[i].id + "<br>"
                + "Nombre: " + municipios.municipios[i].nombre + "<br>"
                + "Provincia: " + municipios.municipios[i].provincia + "<br>"
                + "Población: " + municipios.municipios[i].poblacion + "<br>"
                + "Hombres: " + municipios.municipios[i].hombres + "<br>"
                + "Mujeres: " + municipios.municipios[i].mujeres + "<br>"
                + "<button><a>Modificar</a></button>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LOS MUNICIPIOS");
            return;
        };
    });
}