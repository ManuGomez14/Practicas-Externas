var express = require("express");
var fs = require("fs");
var app = express();

app.use(express.json());

app.use(express.json({ strict: false }));
app.use("/noticia/formulario", express.static(__dirname + '/Formulario'))
app.use("/noticia/ver", express.static(__dirname + '/Ver'))


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
