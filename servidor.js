const { DH_NOT_SUITABLE_GENERATOR } = require("constants");
const { raw, json } = require("express");
var express = require("express");
var fs = require("fs");
const { expr } = require("jquery");
const { arch } = require("os");
var app = express();

app.use(express.json());

app.use(express.json({ strict: false }));
// NOTICIAS
app.use("/noticia/formulario", express.static(__dirname + '/Formulario'));
app.use("/noticia/ver", express.static(__dirname + '/Ver'));
app.use("/noticia/ver/modificar", express.static(__dirname + '/Ver/modificar.html'));
// AGENCIAS
app.use("/agencias", express.static(__dirname + '/Agencias'));
app.use("/agencias/formulario", express.static(__dirname + '/Agencias/formularioAgencias.html'));
app.use("/agencias/modificar", express.static(__dirname + '/Agencias/modificarAgencias.html'));
// AUTORES
app.use("/autores", express.static(__dirname + '/Autores'));
app.use("/autores/formulario", express.static(__dirname + '/Autores/formularioAutores.html'));
app.use("/autores/modificar", express.static(__dirname + '/Autores/modificarAutores.html'));
// FORMATOS
app.use("/formatos", express.static(__dirname + '/Formatos'));
app.use("/formatos/formulario", express.static(__dirname + '/Formatos/formularioFormatos.html'));
app.use("/formatos/modificar", express.static(__dirname + '/Formatos/modificarFormatos.html'));
// MEDIOS
app.use("/medios", express.static(__dirname + '/Medios'));
app.use("/medios/formulario", express.static(__dirname + '/Medios/formularioMedios.html'));
app.use("/medios/modificar", express.static(__dirname + '/Medios/modificarMedios.html'));
// MUNICIPIOS
app.use("/municipios", express.static(__dirname + '/Municipios'));
app.use("/municipios/formulario", express.static(__dirname + '/Municipios/formularioMunicipios.html'));
app.use("/municipios/modificar", express.static(__dirname + '/Municipios/modificarMunicipios.html'));
// NATURALEZAS
app.use("/naturalezas", express.static(__dirname + '/Naturalezas'));
app.use("/naturalezas/formulario", express.static(__dirname + '/Naturalezas/formularioNaturalezas.html'));
app.use("/naturalezas/modificar", express.static(__dirname + '/Naturalezas/modificarNaturalezas.html'));
// PROVINCIAS
app.use("/provincias", express.static(__dirname + '/Provincias'));
app.use("/provincias/formulario", express.static(__dirname + '/Provincias/formularioProvincias.html'));
app.use("/provincias/modificar", express.static(__dirname + '/Provincias/modificarProvincias.html'));
// PUBLICACIONES
app.use("/publicaciones", express.static(__dirname + '/Publicaciones'));
app.use("/publicaciones/formulario", express.static(__dirname + '/Publicaciones/formularioPublicaciones.html'));
app.use("/publicaciones/modificar", express.static(__dirname + '/Publicaciones/modificarPublicaciones.html'));
// TEMÁTICAS
app.use("/tematicas", express.static(__dirname + '/Tematicas'));
app.use("/tematicas/formulario", express.static(__dirname + '/Tematicas/formularioTematicas.html'));
app.use("/tematicas/modificar", express.static(__dirname + '/Tematicas/modificarTematicas.html'));
// TIPOS DE DIFUSIÓN
app.use("/tiposDifusion", express.static(__dirname + '/TiposDifusion'));
app.use("/tiposDifusion/formulario", express.static(__dirname + '/TiposDifusion/formularioTiposDifusion.html'));
app.use("/tiposDifusion/modificar", express.static(__dirname + '/TiposDifusion/modificarTiposDifusion.html'));

app.listen(3000, function () {
    console.log("Servidor de ejemplo en el puerto 3000");
});

// NOTICIAS

app.post('/noticia/nueva', function (req, res){
    var noticia = req.body.nueva;
    var rawdata = fs.readFileSync('noticias.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["noticias"].length > 0){
        ultimoID = archivo["noticias"][archivo["noticias"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
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

// AGENCIAS

app.post('/agencia/nueva', function (req, res){
    var agencia = req.body.nueva;
    var rawdata = fs.readFileSync('agencias.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["agencias"].length > 0){
        ultimoID = archivo["agencias"][archivo["agencias"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }
    
    agencia.id = nuevoID;
    
    archivo["agencias"].push(agencia);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('agencias.json', data);

}); 

app.get("/agencias/ver", function(req,res){
    var agencias = JSON.parse(fs.readFileSync('agencias.json'));
    res.status(200).json(agencias);
    return;
});

app.get("/agencias/:id", function(req,res){
    var id = req.params.id;
    var agencias = JSON.parse(fs.readFileSync('agencias.json'));

    for(var i=0; i<agencias.agencias.length; i++){
        if(agencias.agencias[i].id == id){
            res.status(200).json(agencias.agencias[i]);
        }
    }
});

app.post("/agencia/modificar", function(req,res){
    var nuevaAgencia = req.body.nuevaAgencia;
    var agencias = JSON.parse(fs.readFileSync('agencias.json'));

    for(var j=0; j<agencias.agencias.length; j++){
        if(agencias.agencias[j].id == nuevaAgencia.id){
            agencias.agencias[j] = nuevaAgencia;
            res.status(200).json(agencias.agencias[j]);
        }
    }
    let data = JSON.stringify(agencias, null, 2);
    fs.writeFileSync('agencias.json', data);
});

app.delete("/agencia/borrar/:id", function(req,res){
    var idAgencia = req.params.id;
    var agencias = JSON.parse(fs.readFileSync('agencias.json'));
    var nuevoArray = {"agencias":[]}
    for(var k=0; k<agencias.agencias.length; k++){
        if(agencias.agencias[k].id != idAgencia){
            nuevoArray["agencias"].push(agencias.agencias[k]);
        };
    };
    console.log(nuevoArray);
    let data = JSON.stringify(nuevoArray, null, 2);
    fs.writeFileSync('agencias.json', data);
    res.status(200).json(nuevoArray);
    
});

// AUTORES

app.post('/autor/nuevo', function(req,res){
    var autor = req.body.nuevo;
    var rawdata = fs.readFileSync('autores.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["autores"].length > 0){
        ultimoID = archivo["autores"][archivo["autores"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }

    autor.id = nuevoID;

    archivo["autores"].push(autor);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('autores.json', data);
});

app.get("/autores/ver", function(req,res){
    var autores = JSON.parse(fs.readFileSync('autores.json'));
    res.status(200).json(autores);
    return;
});

app.get("/autores/:id", function(req,res){
    var id = req.params.id;
    var autores = JSON.parse(fs.readFileSync('autores.json'));

    for(var i=0; i<autores.autores.length; i++){
        if(autores.autores[i].id == id){
            res.status(200).json(autores.autores[i]);
        }
    }
});

app.post("/autor/modificar", function(req,res){
    var nuevoAutor = req.body.nuevoAutor;
    var autores = JSON.parse(fs.readFileSync('autores.json'));

    for(var j=0; j<autores.autores.length; j++){
        if(autores.autores[j].id == nuevoAutor.id){
            autores.autores[j] = nuevoAutor;
            res.status(200).json(autores.autores[j]);
        }
    }
    let data = JSON.stringify(autores, null, 2);
    fs.writeFileSync('autores.json', data);
});

app.delete("/autor/borrar/:id", function(req,res){
    var id = req.params.id;
    var autores = JSON.parse(fs.readFileSync('autores.json'));
    var nuevoAutores = {"autores":[]};
    for(var k=0; k<autores.autores.length; k++){
        if(autores.autores[k].id != id){
            nuevoAutores["autores"].push(autores.autores[k]);
        };
    };
    let data = JSON.stringify(nuevoAutores, null, 2);
    fs.writeFileSync('autores.json', data);
    res.status(200).json(nuevoAutores);
});

// FORMATOS

app.post('/formato/nuevo', function(req,res){
    var formato = req.body.nuevo;
    var rawdata = fs.readFileSync('formatos.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["formatos"].length > 0){
        ultimoID = archivo["formatos"][archivo["formatos"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }

    formato.id = nuevoID;

    archivo["formatos"].push(formato);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('formatos.json', data);
});

app.get("/formatos/ver", function(req,res){
    var formatos = JSON.parse(fs.readFileSync('formatos.json'));
    res.status(200).json(formatos);
    return;
});

app.get("/formatos/:id", function(req,res){
    var id = req.params.id;
    var formatos = JSON.parse(fs.readFileSync('formatos.json'));

    for(var i=0; i<formatos.formatos.length; i++){
        if(formatos.formatos[i].id == id){
            res.status(200).json(formatos.formatos[i]);
        }
    }
});

app.post("/formato/modificar", function(req,res){
    var nuevoFormato = req.body.nuevoFormato;
    var formatos = JSON.parse(fs.readFileSync('formatos.json'));

    for(var j=0; j<formatos.formatos.length; j++){
        if(formatos.formatos[j].id == nuevoFormato.id){
            formatos.formatos[j] = nuevoFormato;
            res.status(200).json(formatos.formatos[j]);
        }
    }
    let data = JSON.stringify(formatos, null, 2);
    fs.writeFileSync('formatos.json', data);
});

app.delete("/formato/borrar/:id", function(req,res){
    var id = req.params.id;
    var formatos = JSON.parse(fs.readFileSync('formatos.json'));
    var nuevoFormatos = {"formatos":[]};
    for(var k=0; k<formatos.formatos.length; k++){
        if(formatos.formatos[k].id != id){
            nuevoFormatos["formatos"].push(formatos.formatos[k]);
        };
    };
    let data = JSON.stringify(nuevoFormatos, null, 2);
    fs.writeFileSync('formatos.json', data);
    res.status(200).json(nuevoFormatos);
});

// MEDIOS

app.post('/medio/nuevo', function(req,res){
    var medio = req.body.nuevo;
    var rawdata = fs.readFileSync('medios.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["medios"].length > 0){
        ultimoID = archivo["medios"][archivo["medios"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }

    medio.id = nuevoID;
    
    archivo["medios"].push(medio);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('medios.json', data);
});

app.get("/medios/ver", function(req,res){
    var medios = JSON.parse(fs.readFileSync('medios.json'));
    res.status(200).json(medios);
    return;
});

app.get("/medios/:id", function(req,res){
    var id = req.params.id;
    var medios = JSON.parse(fs.readFileSync('medios.json'));

    for(var i=0; i<medios.medios.length; i++){
        if(medios.medios[i].id == id){
            res.status(200).json(medios.medios[i]);
        }
    }
});

app.post("/medio/modificar", function(req,res){
    var nuevoMedio = req.body.nuevoMedio;
    var medios = JSON.parse(fs.readFileSync('medios.json'));

    for(var j=0; j<medios.medios.length; j++){
        if(medios.medios[j].id == nuevoMedio.id){
            medios.medios[j] = nuevoMedio;
            res.status(200).json(medios.medios[j]);
        }
    }
    let data = JSON.stringify(medios, null, 2);
    fs.writeFileSync('medios.json', data);
});

app.delete("/medio/borrar/:id", function(req,res){
    var id = req.params.id;
    var medios = JSON.parse(fs.readFileSync('medios.json'));
    var nuevoMedios = {"medios":[]};
    for(var k=0; k<medios.medios.length; k++){
        if(medios.medios[k].id != id){
            nuevoMedios["medios"].push(medios.medios[k]);
        };
    };
    let data = JSON.stringify(nuevoMedios, null, 2);
    fs.writeFileSync('medios.json', data);
    res.status(200).json(nuevoMedios);
});

// MUNICIPIOS

app.post('/municipio/nuevo', function(req,res){
    var municipio = req.body.nuevo;
    var rawdata = fs.readFileSync('municipios.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["municipios"].length > 0){
        ultimoID = archivo["municipios"][archivo["municipios"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }
    
    municipio.id = nuevoID;

    archivo["municipios"].push(municipio);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('municipios.json', data);
});

app.get("/municipios/ver", function(req,res){
    var municipios = JSON.parse(fs.readFileSync('municipios.json'));
    res.status(200).json(municipios);
    return;
});

app.get("/municipios/:id", function(req,res){
    var id = req.params.id;
    var municipios = JSON.parse(fs.readFileSync('municipios.json'));

    for(var i=0; i<municipios.municipios.length; i++){
        if(municipios.municipios[i].id = id){
            res.status(200).json(municipios.municipios[i]);
            console.log(municipios.municipios[i]);
        }
    }
});

app.post("/municipio/modificar", function(req,res){
    var nuevoMunicipio = req.body.nuevoMunicipio;
    var municipios = JSON.parse(fs.readFileSync('municipios.json'));

    for(var j=0; j<municipios.municipios.length; j++){
        if(municipios.municipios[j].id == nuevoMunicipio.id){
            municipios.municipios[j] = nuevoMunicipio;
            res.status(200).json(municipios.municipios[j]);
        }
    }
    let data = JSON.stringify(municipios, null, 2);
    fs.writeFileSync('municipios.json', data);
});

app.delete("/municipio/borrar/:id", function(req,res){
    var id = req.params.id;
    var municipios = JSON.parse(fs.readFileSync('municipios.json'));
    var nuevoMunicipios = {"municipios":[]};
    for(var k=0; k<municipios.municipios.length; k++){
        if(municipios.municipios[k].id != id){
            nuevoMunicipios["municipios"].push(municipios.municipios[k]);
        };
    };
    let data = JSON.stringify(nuevoMunicipios, null, 2);
    fs.writeFileSync('municipios.json', data);
    res.status(200).json(nuevoMunicipios);
});

// NATURALEZAS

app.post('/naturaleza/nueva', function(req,res){
    var naturaleza = req.body.nueva;
    var rawdata = fs.readFileSync('naturalezas.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["naturalezas"].length > 0){
        ultimoID = archivo["naturalezas"][archivo["naturalezas"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }

    naturaleza.id = nuevoID;

    archivo["naturalezas"].push(naturaleza);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('naturalezas.json', data);
});

app.get("/naturalezas/ver", function(req, res){
    var naturalezas = JSON.parse(fs.readFileSync('naturalezas.json'));
    res.status(200).json(naturalezas);
    return;
});

app.get("/naturalezas/:id", function(req,res){
    var id = req.params.id;
    var naturalezas = JSON.parse(fs.readFileSync('naturalezas.json'));

    for(var i=0; i<naturalezas.naturalezas.length; i++){
        if(naturalezas.naturalezas[i].id == id){
            res.status(200).json(naturalezas.naturalezas[i]);
        }
    }
});

app.post("/naturaleza/modificar", function(req,res){
    var nuevaNaturaleza = req.body.nuevaNaturaleza;
    var naturalezas = JSON.parse(fs.readFileSync('naturalezas.json'));

    for(var j=0; j<naturalezas.naturalezas.length; j++){
        if(naturalezas.naturalezas[j].id == nuevaNaturaleza.id){
            naturalezas.naturalezas[j] = nuevaNaturaleza;
            res.status(200).json(naturalezas.naturalezas[j]);
        }
    }
    let data = JSON.stringify(naturalezas, null, 2);
    fs.writeFileSync('naturalezas.json', data);
});

app.delete("/naturaleza/borrar/:id", function(req,res){
    var id = req.params.id;
    var naturalezas = JSON.parse(fs.readFileSync('naturalezas.json'));
    var nuevoNaturalezas = {"naturalezas":[]};
    for(var k=0; k<naturalezas.naturalezas.length; k++){
        if(naturalezas.naturalezas[k].id != id){
            nuevoNaturalezas["naturalezas"].push(naturalezas.naturalezas[k]);
        };
    };
    let data = JSON.stringify(nuevoNaturalezas, null, 2);
    fs.writeFileSync('naturalezas.json', data);
    res.status(200).json(nuevoNaturalezas);
});

// PROVINCIAS

app.post('/provincia/nueva', function(req,res){
    var provincia = req.body.nueva;
    var rawdata = fs.readFileSync('provincias.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["provincias"].length > 0){
        ultimoID = archivo["provincias"][archivo["provincias"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }

    provincia.id = nuevoID;

    archivo["provincias"].push(provincia);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('provincias.json', data);
});

app.get("/provincias/ver", function(req,res){
    var provincias = JSON.parse(fs.readFileSync('provincias.json'));
    res.status(200).json(provincias);
    return;
});

app.get("/provincias/:id", function(req,res){
    var id = req.params.id;
    var provincias = JSON.parse(fs.readFileSync('provincias.json'));

    for(var i=0; i<provincias.provincias.length; i++){
        if(provincias.provincias[i].id == id){
            res.status(200).json(provincias.provincias[i]);
        }
    }
});

app.post("/provincia/modificar", function(req,res){
    var nuevaProvincia = req.body.nuevaProvincia;
    var provincias = JSON.parse(fs.readFileSync('provincias.json'));

    for(var j=0; j<provincias.provincias.length; j++){
        if(provincias.provincias[j].id == nuevaProvincia.id){
            provincias.provincias[j] = nuevaProvincia;
            res.status(200).json(provincias.provincias[j]);
        }
    }
    let data = JSON.stringify(provincias, null, 2);
    fs.writeFileSync('provincias.json', data);
});

app.delete("/provincia/borrar/:id", function(req,res){
    var id = req.params.id;
    var provincias = JSON.parse(fs.readFileSync('provincias.json'));
    var nuevoProvincias = {"provincias":[]};
    for(var k=0; k<provincias.provincias.length; k++){
        if(provincias.provincias[k].id != id){
            nuevoProvincias["provincias"].push(provincias.provincias[k]);
        };
    };
    let data = JSON.stringify(nuevoProvincias, null, 2);
    fs.writeFileSync('provincias.json', data);
    res.status(200).json(nuevoProvincias);
});

// PUBLICACIONES

app.post('/publicacion/nueva', function(req,res){
    var publicacion = req.body.nueva;
    var rawdata = fs.readFileSync('publicaciones.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["publicaciones"].length > 0){
        ultimoID = archivo["publicaciones"][archivo["publicaciones"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }

    publicacion.id = nuevoID;

    archivo["publicaciones"].push(publicacion);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('publicaciones.json', data);
});

app.get("/publicaciones/ver", function(req,res){
    var publicaciones = JSON.parse(fs.readFileSync('publicaciones.json'));
    res.status(200).json(publicaciones);
    return;
});

app.get("/publicaciones/:id", function(req,res){
    var id = req.params.id;
    var publicaciones = JSON.parse(fs.readFileSync('publicaciones.json'));

    for(var i=0; i<publicaciones.publicaciones.length; i++){
        if(publicaciones.publicaciones[i].id == id){
            res.status(200).json(publicaciones.publicaciones[i]);
        }
    }
});

app.post("/publicacion/modificar", function(req,res){
    var nuevaPublicacion = req.body.nuevaPublicacion;
    var publicaciones = JSON.parse(fs.readFileSync('publicaciones.json'));

    for(var j=0; j<publicaciones.publicaciones.length; j++){
        if(publicaciones.publicaciones[j].id == nuevaPublicacion.id){
            publicaciones.publicaciones[j] = nuevaPublicacion;
            res.status(200).json(publicaciones.publicaciones[j]);
        }
    }
    let data = JSON.stringify(publicaciones, null, 2);
    fs.writeFileSync('publicaciones.json', data);
});

app.delete("/publicacion/borrar/:id", function(req,res){
    var id = req.params.id;
    var publicaciones = JSON.parse(fs.readFileSync('publicaciones.json'));
    var nuevoPublicaciones = {"publicaciones":[]};
    for(var k=0; k<publicaciones.publicaciones.length; k++){
        if(publicaciones.publicaciones[k].id != id){
            nuevoPublicaciones["publicaciones"].push(publicaciones.publicaciones[k]);
        };
    };
    let data = JSON.stringify(nuevoPublicaciones, null, 2);
    fs.writeFileSync('publicaciones.json', data);
    res.status(200).json(nuevoPublicaciones);
});

// TEMÁTICAS

app.post('/tematica/nueva', function(req,res){
    var tematica = req.body.nueva;
    var rawdata = fs.readFileSync('tematicas.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["tematicas"].length > 0){
        ultimoID = archivo["tematicas"][archivo["tematicas"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }

    tematica.id = nuevoID;

    archivo["tematicas"].push(tematica);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('tematicas.json', data);
});

app.get("/tematicas/ver", function(req,res){
    var tematicas = JSON.parse(fs.readFileSync('tematicas.json'));
    res.status(200).json(tematicas);
    return;
});

app.get("/tematicas/:id", function(req,res){
    var id = req.params.id;
    var tematicas = JSON.parse(fs.readFileSync('tematicas.json'));

    for(var i=0; i<tematicas.tematicas.length; i++){
        if(tematicas.tematicas[i].id == id){
            res.status(200).json(tematicas.tematicas[i]);
        }
    }
});

app.post("/tematica/modificar", function(req,res){
    var nuevaTematica = req.body.nuevaTematica;
    var tematicas = JSON.parse(fs.readFileSync('tematicas.json'));

    for(var j=0; j<tematicas.tematicas.length; j++){
        if(tematicas.tematicas[j].id == nuevaTematica.id){
            tematicas.tematicas[j] = nuevaTematica;
            res.status(200).json(tematicas.tematicas[j]);
        }
    }
    let data = JSON.stringify(tematicas, null, 2);
    fs.writeFileSync('tematicas.json', data);
});

app.delete("/tematica/borrar/:id", function(req,res){
    var id = req.params.id;
    var tematicas = JSON.parse(fs.readFileSync('tematicas.json'));
    var nuevoTematicas = {"tematicas":[]};
    for(var k=0; k<tematicas.tematicas.length; k++){
        if(tematicas.tematicas[k].id != id){
            nuevoTematicas["tematicas"].push(tematicas.tematicas[k]);
        };
    };
    let data = JSON.stringify(nuevoTematicas, null, 2);
    fs.writeFileSync('tematicas.json', data);
    res.status(200).json(nuevoTematicas);
});

// TIPOS DE DIFUSIÓN

app.post('/tipoDifusion/nuevo', function(req,res){
    var tipoDifusion = req.body.nuevo;
    var rawdata = fs.readFileSync('tiposDifusion.json');
    var archivo = JSON.parse(rawdata);
    var ultimoID;
    var nuevoID;

    if(archivo["tiposDifusion"].length > 0){
        ultimoID = archivo["tiposDifusion"][archivo["tiposDifusion"].length-1].id;
        nuevoID = Number(ultimoID) + 1;
    }else{
        ultimoID = 1;
        nuevoID = 1;
    }

    tipoDifusion.id = nuevoID;

    archivo["tiposDifusion"].push(tipoDifusion);

    let data = JSON.stringify(archivo, null, 2);
    fs.writeFileSync('tiposDifusion.json', data);
});

app.get("/tiposDifusion/ver", function(req,res){
    var tiposDifusion = JSON.parse(fs.readFileSync('tiposDifusion.json'));
    res.status(200).json(tiposDifusion);
    return;
});

app.get("/tiposDifusion/:id", function(req,res){
    var id = req.params.id;
    var tiposDifusion = JSON.parse(fs.readFileSync('tiposDifusion.json'));

    for(var i=0; i<tiposDifusion.tiposDifusion.length; i++){
        if(tiposDifusion.tiposDifusion[i].id == id){
            res.status(200).json(tiposDifusion.tiposDifusion[i]);
        }
    }
});

app.post("/tipoDifusion/modificar", function(req,res){
    var nuevoTipoDifusion = req.body.nuevoTipoDifusion;
    var tiposDifusion = JSON.parse(fs.readFileSync('tiposDifusion.json'));

    for(var j=0; j<tiposDifusion.tiposDifusion.length; j++){
        if(tiposDifusion.tiposDifusion[j].id == nuevoTipoDifusion.id){
            tiposDifusion.tiposDifusion[j] = nuevoTipoDifusion;
            res.status(200).json(tiposDifusion.tiposDifusion[j]);
        }
    }
    let data = JSON.stringify(tiposDifusion, null, 2);
    fs.writeFileSync('tiposDifusion.json', data);
});

app.delete("/tipoDifusion/borrar/:id", function(req,res){
    var id = req.params.id;
    var tiposDifusion = JSON.parse(fs.readFileSync('tiposDifusion.json'));
    var nuevoTiposDifusion = {"tiposDifusion":[]};
    for(var k=0; k<tiposDifusion.tiposDifusion.length; k++){
        if(tiposDifusion.tiposDifusion[k].id != id){
            nuevoTiposDifusion["tiposDifusion"].push(tiposDifusion.tiposDifusion[k]);
        };
    };
    let data = JSON.stringify(nuevoTiposDifusion, null, 2);
    fs.writeFileSync('tiposDifusion.json', data);
    res.status(200).json(nuevoTiposDifusion);
});