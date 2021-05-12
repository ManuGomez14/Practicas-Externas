var express = require("express");
var fs = require("fs");
var app = express();

app.use(express.json());

app.use(express.json({ strict: false }));
app.use(express.static(__dirname + '/Formulario'))


app.listen(3000, function () {
    console.log("Servidor de ejemplo en el puerto 3000");
});

/** 
function escribirNoticia(noticia){
    let data = JSON.stringify(noticia);
    fs.writeFileSync('noticias.json', data);
};

module.exports = escribirNoticia();

*/
