var seccionActual = "Veraz";
var idGlobal;

function verNoticias(){
    rest("get","/noticias", function(status,noticias){
        var verNoticias = document.getElementById("verNoticias");
        if(status==200){
            for(var i=0; i<noticias.noticias.length; i++){
                console.log(noticias.noticias[0].vinculos);
                verNoticias.innerHTML += "<div id='noticia" + (i+1) + "'>"  
                + "ID: " + noticias.noticias[i].id + "<br>"
                + "Fecha: " + noticias.noticias[i].fecha + "<br>"
                + "Titular: " + noticias.noticias[i].titular + "<br>"
                + "Audiencia: " + noticias.noticias[i].audiencia + "<br>"
                + "Usuarios: " + noticias.noticias[i].usuarios + "<br>"
                + "Menciones: " + noticias.noticias[i].menciones + "<br>"
                + "Ámbito: " + noticias.noticias[i].ambito + "<br>"
                + "Temática: " + noticias.noticias[i].tematica + "<br>"
                + "Formato: " + noticias.noticias[i].formato + "<br>"
                + "Autor: " + noticias.noticias[i].autor + "<br>"
                + "Municipios: " + noticias.noticias[i].municipios + "<br>"
                + "Imágenes: " + noticias.noticias[i].imagenes + "<br>"
                + "Vínculos: <br> Noticia relacionada: " + noticias.noticias[i].vinculos.noticia_relacionada + " Tipo del vínculo: " + noticias.noticias[i].tipo_vinculo + "<br>"
                + "Agencias: " + noticias.noticias[i].agencias + "<br>"
                + "Tipo: " + noticias.noticias[i].tipo + "<br>"
                + "Fuentes: " + noticias.noticias[i].fuentes + "<br>"
                + "Desmentidos: " + noticias.noticias[i].desmentidos + "<br>"
                + "Evidencias: " + noticias.noticias[i].evidencias + "<br>"
                + "Naturaleza: " + noticias.noticias[i].naturaleza + "<br>"
                + "Medios Suplementarios: " + noticias.noticias[i].medios_supl + "<br>"
                + "<button><a href='http://localhost:3000/noticia/ver/modificar?id="+noticias.noticias[i].id+"'>Modificar</a></button>"
                + "<hr>" 
                + "</div>";
            };

        }else{
            alert("ERROR AL VER LAS NOTICIAS");
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

    rest("get", "/noticias/"+id, function(status,datos){
        
        formulario.innerHTML = "<h1>Modificar noticias:</h1>"
        + "<p>Modifique aquí cualquiera de los datos de esta noticia: </p>"
        + "<form action='javascript:modificar()'>"
        + "<label for='fecha'>Fecha: </label>"
        + "<input type='date' name='fecha' id='fecha' value='" + datos.fecha + "'>"
        + "<br><br>"
        + "<label for='titulo'>Título: </label>"
        + "<input type='text' name='titulo' id='titulo' pattern='[A-Za-z]+' value='" + datos.titular + "'>"
        + "<br><br>"
        + "<label for='texto'>Texto: </label>"
        + "<br><textarea name='texto' id='texto' cols='60' rows='7' value='" + datos.texto + "'>" + datos.texto + "</textarea>"
        + "<br><br>"
        + "<label for='audiencia'>Audiencia: </label>"
        + "<input type='number' name='audiencia' id='audiencia' value='"+ datos.audiencia +"'>"
        + "<br><br>"
        + "<label for='usuarios'>Usuarios: </label>"
        + "<input type='number' name='usuarios' id='usuarios' value='"+ datos.usuarios +"'>"
        + "<br><br>"
        + "<label for='menciones'>Menciones: </label>"
        + "<input type='number' name='menciones' id='menciones' value='"+ datos.menciones +"'>"
        + "<br><br>"
        + "<label for='ambito'>Ámbito: </label>"
        + "<input type='text' name='ambito' id='ambito' pattern='[A-Za-z]+' value='"+ datos.ambito + "'>"
        + "<br><br>"
        + "<label for='tematica'>Temática: </label>"
        + "<input type='text' name='tematica' id='tematica' pattern='[A-Za-z]+' value='"+ datos.tematica + "'>"
        + "<br><br>"
        + "<label for='formato'>Formato: </label>"
        + "<input type='text' name='formato' id='formato' pattern='[A-Za-z]+' value='" + datos.formato + "'>"
        + "<br><br>"
        + "<label for='autor'>Autor: </label>"
        + "<input type='text' name='autor' id='autor' pattern='[A-Za-z]+' value='" + datos.autor + "'>"
        + "<br><br>"
        + "<label for='municipios'>Municipios: </label>"
        + "<br><textarea name='municipios' id='municipios' cols='60' rows='5' value='" + datos.municipios + "'>"+ datos.municipios + "</textarea>"
        + "<br><br>"
        + "<label for='imagenes'>Imágenes: </label>"
        + "<br><textarea name='imagenes' id='imagenes' cols='60' rows='5' value='" + datos.imagenes + "'>" + datos.imagenes + "</textarea>"
        + "<br><br>"
        + "<label for='vinculos'>Vinculos: </label>"
        + "<br><textarea name='vinculos' id='vinculos' cols='60' rows='5' value='" + datos.vinculos + "'>" + datos.vinculos + "</textarea>"
        + "<br><br>"
        + "<label for='agencias'>Agencias: </label>"
        + "<br><textarea name='agencias' id='agencias' cols='60' rows='5' value='" + datos.agencias + "'>" + datos.agencias + "</textarea>"
        + "<br><br>"
        + "<label for='tipo'>Tipo: </label>"
        + "<select name='tipo' id='tipo' onchange='mostrarSegunTipo(this.value)' class='form-select'>"
        + "<option value='Veraz'>Veraz</option>"
        + "<option value='Desmentido'>Desmentido</option>"
        + "<option value='Bulo'>Bulo</option>"
        + "</select>"
        + "<br><br>"
        + "<div id='Veraz' class='seccion activa'></div>"
        + "<div id='Desmentido' class='seccion'>"
        + "<label for='fuentes'>Fuente: </label>"
        + "<input type='text' name='fuentes' id='fuentes' pattern='[A-Za-z]+' value='" + datos.fuentes + "'>"
        + "<br><br>"
        + "</div>"
        + "<div id='Bulo' class='seccion'>"
        + "<label for='desmentidos'>Desmentidos: </label>"
        + "<input type='text' name='desmentidos' id='desmentidos' pattern='[A-Za-z]+' value='" + datos.desmentidos +"'>"
        + "<br><br>"
        + "<label for='evidencias'>Evidencias: </label>"
        + "<input type='text' name='evidencias' id='evidencias' pattern='[A-Za-z]+' value='" + datos.evidencias + "'>"
        + "<br><br>"
        + "<label for='naturaleza'>Naturaleza: </label>"
        + "<input type='text' name='naturaleza' id='naturaleza' pattern='[A-Za-z]+' value='" + datos.naturaleza + "'>"
        + "<br><br>"
        + "<label for='medios_supl'>Medios Suplementarios: </label>"
        + "<input type='text' name='medios_supl' id='medios_supl' pattern='[A-Za-z]+' value='" + datos.medios_supl + "'>"
        + "<br><br>"
        + "</div>"
        + "<input type='submit' value='Modificar'>"
        + "</form>";
    });
}

function cambiarSeccion(seccion) {
    document.getElementById(seccionActual).classList.remove("activa");
    document.getElementById(seccion).classList.add("activa");
    seccionActual = seccion;
}

function mostrarSegunTipo(tipo){
    if (tipo == "Veraz") {
        cambiarSeccion("Veraz");
    }
    if (tipo == "Desmentido") {
        cambiarSeccion("Desmentido");
    }
    if (tipo == "Bulo") {
        cambiarSeccion("Bulo");
    }
}

function modificar(){
    console.log(idGlobal);
}