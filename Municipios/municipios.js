var idGlobal;

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
                + "<button type='button' class='btn btn-secondary'><a style='color:white' href='http://localhost:3000/municipios/modificar?id="+municipios.municipios[i].id+"'>Modificar</a></button> "
                + "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#staticBackdrop"+municipios.municipios[i].id+"'>Borrar</button>"
                //MODAL
                + "<div class='modal fade' id='staticBackdrop"+municipios.municipios[i].id+"' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>"
                + "<div class='modal-dialog'>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'>"
                + "<h5 class='modal-title' id='staticBackdropLabel'>Eliminar "+municipios.municipios[i].nombre+"</h5>"
                + "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>"
                + "</div>"
                + "<div class='modal-body'>"
                + "Está a punto de eliminar esta agencia. ¿Está usted seguro de esto?"
                + "</div>"
                + "<div class='modal-footer'>"
                + "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>"
                + "<button type='button' class='btn btn-danger' onclick='borrar("+municipios.municipios[i].id+")'>Borrar</button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "<hr>"
                + "</div>";
            };
        }else{
            alert("ERROR AL VER LOS MUNICIPIOS");
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

    rest("get","/municipios/"+id, function(status,datos){
        if(status==200){
            formulario.innerHTML = "<h1>Modificar municipios</h1>"
            + "<p>Modifique aquí cualquiera de los datos de este municipio: </p>"
            + "<form action='javascript:modificar()'>"
            + "<label for='nombre'>Nombre: </label>"
            + "<input type='text' name='nombre' id='nombre' pattern='[A-Za-z]+' value='" + datos.nombre + "'>"
            + "<br><br>"
            + "<label for='provincia'>Provincia: </label>"
            + "<select name='provincia' id='provincia'></select>"
            //+ "<input type='text' name='provincia' id='provincia' pattern='[A-Za-z]+' value='" + datos.provincia + "'>"
            + "<br><br>"
            + "<label for='poblacion'>Población: </label>"
            + "<input type='number' name='poblacion' id='poblacion' value='" + datos.poblacion + "'>"
            + "<br><br>"
            + "<label for='hombres'>Hombres: </label>"
            + "<input type='number' name='hombres' id='hombres' value='" + datos.hombres + "'>"
            + "<br><br>"
            + "<label for='mujeres'>Mujeres: </label>"
            + "<input type='number' name='mujeres' id='mujeres' value='" + datos.mujeres + "'>"
            + "<br><br>"
            + "<input type='submit' value='Modificar'>"
            + "</form>";
        }else{
            alert("ERROR AL MODIFICAR EL MUNICIPIO");
            return;
        };
    });
}

function modificar(){
    var nombre = document.getElementById("nombre").value;
    var provincia = document.getElementById("provincia").value;
    var poblacion = document.getElementById("poblacion").value;
    var hombres = document.getElementById("hombres").value;
    var mujeres = document.getElementById("mujeres").value;

    let municipio = {
        id: idGlobal,
        nombre: nombre,
        provincia: provincia,
        poblacion: poblacion,
        hombres: hombres,
        mujeres: mujeres
    };

    rest("post","/municipio/modificar",{nuevoMunicipio:municipio}, function(status,nuevoMunicipio){
        if(status==200){
            alert("¡Municipio modificado con éxito!");
            aVerTodas();
        };
    });
}

function borrar(id){
    rest("delete","/municipio/borrar/"+id, function(status,municipios){
        if(status==200){
            aVerTodas();
        }else{
            alert("ERROR AL BORRAR");
        };
    });
}

function cargarSelect(){
    rest("get","/provincias/ver", function(status,provincias){
        if(status==200){
            var select = document.getElementById("provincia");
            for(var i=0; i<provincias.provincias.length; i++){
                var option = document.createElement("option");
                option.text = provincias.provincias[i].nombre;
                option.value = provincias.provincias[i].id;
                select.add(option);
            };
        };
    });
}