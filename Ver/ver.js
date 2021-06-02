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
                + "<hr></div>";
            };

        }else{
            alert("ERROR AL VER LAS NOTICIAS");
            return;
        };
    });
}