var express = require("express");
var fs = require("fs");
var app = express();

app.use(express.json());

app.use(express.json({ strict: false }));
app.use(express.static(__dirname + '/Formulario'))


app.listen(3000, function () {
    console.log("Servidor de ejemplo en el puerto 3000");
});

/** app.post('/noticia/nueva', function (req, res){

    var noticia = req.body.nueva;

    var rawdata = fs.readFileSync('noticias.json');
    var archivo = JSON.parse(rawdata);
    console.log(archivo);

    archivo[archivo.length()]={};
    archivo[archivo.length()-1]=noticia;

    console.log(archivo);
    /**archivo2 = archivo.append(noticia);
    console.log(archivo2);

    let data = JSON.stringify(archivo, null, 2);
    console.log(data);
    fs.writeFileSync('noticias.json', data);
}); */

 
app.post('/noticia/nueva', function (req, res){

    var noticia = req.body.nueva;
    console.log(noticia);

    let data = JSON.stringify(noticia, null, 2);
    console.log(data);
    fs.appendFile('noticias.json', data, (err) => {
        if(err) throw err;
        console.log('Data written to file');
    });

});


/** 
function escribirNoticia(noticia){
    let data = JSON.stringify(noticia);
    fs.writeFileSync('noticias.json', data);
};

module.exports = escribirNoticia();


app.post('/sample/put/data', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    res.send(req.body);
});
localhos:3000/sample/put/data?id=0?nombre=872

*/
