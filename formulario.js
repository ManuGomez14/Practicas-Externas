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