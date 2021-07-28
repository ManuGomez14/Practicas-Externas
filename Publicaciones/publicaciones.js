var idGlobal;
var fuenteGlobal;
var tipoGlobal;

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
        if(status==200){
            var verPublicaciones = document.getElementById("verPublicaciones");
            rest("get","/medios/ver", function(statusM,medios){
                if(statusM==200){
                    rest("get","/tiposDifusion/ver", function(statusT,tiposDifusion){
                        if(statusT==200){
                            for(var i=0; i<publicaciones.publicaciones.length; i++){
                                for(var j=0; j<medios.medios.length; j++){
                                    if(publicaciones.publicaciones[i].fuente == medios.medios[j].id){
                                        fuenteGlobal = medios.medios[j].nombre;
                                    };
                                };
                                for(var k=0; k<tiposDifusion.tiposDifusion.length; k++){
                                    if(publicaciones.publicaciones[i].tipo == tiposDifusion.tiposDifusion[k].id){
                                        tipoGlobal = tiposDifusion.tiposDifusion[k].nombre;
                                    };
                                };
                                verPublicaciones.innerHTML += "<div id='publicacion" + (i+1) + "'>"
                                + "ID: " + publicaciones.publicaciones[i].id + "<br>"
                                + "URL: " + publicaciones.publicaciones[i].url + "<br>"
                                + "Fuente: " + fuenteGlobal + "<br>"
                                + "Tipo: " + tipoGlobal + "<br>"
                                + "<button type='button' class='btn btn-secondary'><a style='color:white' href='http://localhost:3000/publicaciones/modificar?id="+publicaciones.publicaciones[i].id+"'>Modificar</a></button> "
                                + "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#staticBackdrop"+publicaciones.publicaciones[i].id+"'>Borrar</button>"
                                //MODAL
                                + "<div class='modal fade' id='staticBackdrop"+publicaciones.publicaciones[i].id+"' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>"
                                + "<div class='modal-dialog'>"
                                + "<div class='modal-content'>"
                                + "<div class='modal-header'>"
                                + "<h5 class='modal-title' id='staticBackdropLabel'>Eliminar publicación "+publicaciones.publicaciones[i].id+"</h5>"
                                + "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>"
                                + "</div>"
                                + "<div class='modal-body'>"
                                + "Está a punto de eliminar esta agencia. ¿Está usted seguro de esto?"
                                + "</div>"
                                + "<div class='modal-footer'>"
                                + "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>"
                                + "<button type='button' class='btn btn-danger' onclick='borrar("+publicaciones.publicaciones[i].id+")'>Borrar</button>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "<hr>"
                                + "</div>"; 
                            };
                        };
                    });
                };
            });
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
            rest("get","/medios/ver", function(status,medios){
                if(status==200){
                    var selectMedios = document.getElementById("fuente");
                    for(var i=0; i<medios.medios.length; i++){
                        var optionMedio = document.createElement("option");
                        optionMedio.text = medios.medios[i].nombre;
                        optionMedio.value = medios.medios[i].id;
                        if(medios.medios[i].id == datos.fuente){
                            optionMedio.selected = true;
                        };
                        selectMedios.add(optionMedio);
                    };
                };
            });
            rest("get","/tiposDifusion/ver", function(status,tiposDifusion){
                if(status==200){
                    var selectTipos = document.getElementById("tipo");
                    for(var j=0; j<tiposDifusion.tiposDifusion.length; j++){
                        var optionTipo = document.createElement("option");
                        optionTipo.text = tiposDifusion.tiposDifusion[j].nombre;
                        optionTipo.value = tiposDifusion.tiposDifusion[j].id;
                        if(tiposDifusion.tiposDifusion[j].id == datos.tipo){
                            optionTipo.selected = true;
                        };
                        selectTipos.add(optionTipo);
                    };
                };
            });
            formulario.innerHTML = "<h1>Modificar publicaciones</h1>"
            + "<p>Modifique aquí cualquiera de los datos de esta publicación: </p>"
            + "<form action='javascript:modificar()'>"
            + "<label for='url'>URL: </label>"
            + "<input type='text' name='url' id='url' value='" + datos.url + "'>"
            + "<br><br>"
            + "<label for='fuente'>Fuente: </label>"
            + "<select name='fuente' id='fuente'></select>"
            //+ "<input type='text' name='fuente' id='fuente' value='" + datos.fuente + "'>"
            + "<br><br>"
            + "<label for='tipo'>Tipo: </label>"
            + "<select name='tipo' id='tipo'></select>"
            //+ "<input type='text' name='tipo' id='tipo' value='" + datos.tipo + "'>"
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

function borrar(id){
    rest("delete","/publicacion/borrar/"+id, function(status,publicaciones){
        if(status==200){
            aVerTodas();
        }else{
            alert("ERROR AL BORRAR");
        };
    });
}

function cargarSelect(){
    rest("get","/medios/ver", function(status,medios){
        if(status==200){
            var selectMedios = document.getElementById("fuente");
            for(var i=0; i<medios.medios.length; i++){
                var optionMedio = document.createElement("option");
                optionMedio.text = medios.medios[i].nombre;
                optionMedio.value = medios.medios[i].id;
                selectMedios.add(optionMedio);
            };
        };
    });
    rest("get","/tiposDifusion/ver", function(status,tiposDifusion){
        if(status==200){
            var selectTipos = document.getElementById("tipo");
            for(var j=0; j<tiposDifusion.tiposDifusion.length; j++){
                var optionTipo = document.createElement("option");
                optionTipo.text = tiposDifusion.tiposDifusion[j].nombre;
                optionTipo.value = tiposDifusion.tiposDifusion[j].id;
                selectTipos.add(optionTipo);
            };
        };
    });
}
