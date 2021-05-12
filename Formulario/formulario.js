var id = 1;
var seccionActual = "Veraz";

function rellenarTabla(){

    var fecha = document.getElementById("fecha").value;
    var titulo = document.getElementById("titulo").value;
    var texto = document.getElementById("texto").value;
    var audiencia = document.getElementById("audiencia").value;
    var usuarios = document.getElementById("usuarios").value;
    var menciones = document.getElementById("menciones").value;
    var ambito = document.getElementById("ambito").value;

    tbody.innerHTML += "<tr><td>"+id+"</td><td>"+fecha+"</td><td>"+titulo+"</td><td>"+texto+"</td><td>"+audiencia+"</td><td>"+usuarios+"</td><td>"+menciones+"</td><td>"+ambito+"</td></tr>";

    document.getElementById("fecha").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("audiencia").value = "";
    document.getElementById("usuarios").value = "";
    document.getElementById("menciones").value = "";
    document.getElementById("ambito").value = "";
    id++;
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
    var municipios = document.getElementById("municipios").value;
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
   /** nuevaNoticia(noticia); */

}

