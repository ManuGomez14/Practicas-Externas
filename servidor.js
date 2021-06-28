var express = require("express");
var fs = require("fs");
const { expr } = require("jquery");
var app = express();

app.use(express.json());

app.use(express.json({ strict: false }));
app.use("/noticia/formulario", express.static(__dirname + '/Formulario'));
app.use("/noticia/ver", express.static(__dirname + '/Ver'));
app.use("/noticia/ver/modificar", express.static(__dirname + '/Ver/modificar.html'));
app.use("/agencias", express.static(__dirname + '/Agencias'));
app.use("/agencias/formulario", express.static(__dirname + '/Agencias/formularioAgencias.html'));
app.use("/autores", express.static(__dirname + '/Autores'));
app.use("/autores/formulario", express.static(__dirname + '/Autores/formularioAutores.html'));
app.use("/formatos", express.static(__dirname + '/Formatos'));
app.use("/formatos/formulario", express.static(__dirname + '/Formatos/formularioFormatos.html'));
app.use("/medios", express.static(__dirname + '/Medios'));
app.use("/medios/formulario", express.static(__dirname + '/Medios/formularioMedios.html'));
app.use("/municipios", express.static(__dirname + '/Municipios'));
app.use("/municipios/formulario", express.static(__dirname + '/Municipios/formularioMunicipios.html'));
app.use("/naturalezas", express.static(__dirname + '/Naturalezas'));
app.use("/naturalezas/formulario", express.static(__dirname + '/Naturalezas/formularioNaturalezas.html'));
app.use("/provincias", express.static(__dirname + '/Provincias'));
app.use("/provincias/formulario", express.static(__dirname + '/Provincias/formularioProvincias.html'));
app.use("/publicaciones", express.static(__dirname + '/Publicaciones'));
app.use("/publicaciones/formulario", express.static(__dirname + '/Publicaciones/formularioPublicaciones.html'));
app.use("/tematicas", express.static(__dirname + '/Tematicas'));
app.use("/tematicas/formulario", express.static(__dirname + '/Tematicas/formularioTematicas.html'));
app.use("/tiposDifusion", express.static(__dirname + '/TiposDifusion'));
app.use("/tiposDifusion/formulario", express.static(__dirname + '/TiposDifusion/formularioTiposDifusion.html'));

app.listen(3000, function () {
    console.log("Servidor de ejemplo en el puerto 3000");
});

app.post('/noticia/nueva', function (req, res){
    var noticia = req.body.nueva;
    var rawdata = fs.readFileSync('noticias.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["noticias"].length > 0){
        ultimoID = archivo["noticias"][archivo["noticias"].length-1].id;
        nuevoID = ultimoID + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }
    
    noticia.id = nuevoID;
    
    archivo["noticias"].push(noticia);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('noticias.json', data);

}); 

app.get("/noticias", function(req,res){
    var noticias = JSON.parse(fs.readFileSync('noticias.json'));
    res.status(200).json(noticias);
    return;
});

app.get("/noticias/:id", function(req,res){
    var id = req.params.id;
    var noticias = JSON.parse(fs.readFileSync('noticias.json'));

    for(var i=0; i<noticias.noticias.length; i++){
        if(noticias.noticias[i].id == id){
            res.status(200).json(noticias.noticias[i]);

        }
    }
});

app.post("/noticia/modificar", function(req,res){
    var nuevaNoticia = req.body.nuevaNoticia;
    var noticias = JSON.parse(fs.readFileSync('noticias.json'));
    console.log(nuevaNoticia);
    for(var j=0; j<noticias.noticias.length; j++){
        if(noticias.noticias[j].id == nuevaNoticia.id){
            console.log(noticias.noticias[j]);
            console.log(nuevaNoticia);
            console.log(nuevaNoticia.id);
            console.log(nuevaNoticia.texto);
            noticias.noticias[j] = nuevaNoticia;
            console.log(noticias.noticias[j]);
            console.log(nuevaNoticia);
            res.status(200).json(noticias.noticias[j]);
        }
    }
    let data = JSON.stringify(noticias, null, 2);
    fs.writeFileSync('noticias.json', data);
});