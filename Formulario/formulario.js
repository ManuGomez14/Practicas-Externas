var id = 1;
var seccionActual = "Veraz";

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

function crearObjetoJSON(){
    var idNoticia = id;
    var fecha = document.getElementById("fecha").value;
    var titulo = document.getElementById("titulo").value;
    var texto = document.getElementById("texto").value;
    var audiencia = document.getElementById("audiencia").value;
    var usuarios = document.getElementById("usuarios").value;
    var menciones = document.getElementById("menciones").value;
    var ambito = document.getElementById("ambito").value;
    var tematica = document.getElementById("tematica").value;
    var formato = document.getElementById("formato").value;
    var autor = document.getElementById("autor").value;
    var cadenaMunicipios = document.getElementById("municipios").value;
    var municipios = cadenaMunicipios.split(";");
    var imagenes = document.getElementById("imagenes").value;
    var idVinculos = document.getElementById("idVinculos").value;
    var tipoVinculos = document.getElementById("tipoVinculos").value;
    var agencias = document.getElementById("agencias").value;
    var tipo = document.getElementById("tipo").value;
    var fuentes = document.getElementById("fuentes").value;
    var desmentidos = document.getElementById("desmentidos").value;
    var evidencias = document.getElementById("evidencias").value;
    var naturaleza = document.getElementById("naturaleza").value;
    var medios_supl = document.getElementById("medios_supl").value;

    let noticia = {
        id: idNoticia,
        fecha: fecha,
        titular: titulo,
        texto: texto,
        audiencia: audiencia,
        usuarios: usuarios,
        menciones: menciones,
        ambito: ambito,
        tematica: tematica,
        formato: formato,
        autor: autor,
        municipios: municipios,
        imagenes: imagenes,
        vinculos: tipoVinculos,
        agencias: agencias,
        tipo: tipo,
        fuentes: fuentes,
        desmentidos: desmentidos,
        evidencias: evidencias,
        naturaleza: naturaleza,
        medios_supl: medios_supl
    };



    id++;
    console.log(noticia);
    
    rest("post","/noticia/nueva",{nueva:noticia},function(status,noticia){

    })

}

function mas(elemento){
    if(elemento=="municipios"){
        masMunicipios = document.getElementById("masMunicipios");
        masMunicipios.innerHTML += "<br><label for='municipios2'>Nuevo municipio:</label><input type='text' name='municipios' id='municipios2'><br>";
    }
    if(elemento=="imagenes"){
        masImagenes = document.getElementById("masImagenes");
        masImagenes.innerHTML += "<br><label for='imagenes2'>Nueva imagen:</label><input type='url' name='imagenes' id='imagenes2'><br>";
    }
    if(elemento=="vinculos"){
        masVinculos = document.getElementById("masVinculos");
        masVinculos.innerHTML += "<br><label for='idVinculos2'>ID del vínculo:</label><input type='text' name='idVinculos' id='idVinculos2'><label for='tipoVinculos2'>Tipo de vínculo:</label><input type='text' name='tipoVinculos' id='tipoVinculos2'><br>";
    }
    if(elemento=="agencias"){
        masAgencias = document.getElementById("masAgencias");
        masAgencias.innerHTML += "<br><label for='agencias2'>Agencias:</label><input type='text' name='agencias' id='agencias2'><br>";
    }
}