const { Router } = require('express');
const router = Router();
const fs = require('fs');

const json_noticias = fs.readFileSync('src/noticias.json', 'utf-8');
let noticias = JSON.parse(json_noticias);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        noticias
    })
});

router.get('/new-entry', (req, res) => {
    res.render('new-entry');
});

router.post('/new-entry', (req,res) =>{
    const {id, fecha, titulo, texto, audiencia, usuarios, menciones, ambito, tematica, formato, autor, municipio, imagen, id_vinculo, tipo_vinculo, agencia } = req.body;
    if(!id || !fecha || !titulo || !texto || !audiencia || !usuarios || !menciones || !ambito || !tematica || !formato || !autor || !municipio || !imagen || !id_vinculo || !tipo_vinculo || !agencia){
        res.status(400).send('Debes rellenar todos los campos');
        return;
    }
    let nuevaNoticia = {
        id,
        fecha,
        titulo,
        texto,
        audiencia,
        usuarios,
        menciones,
        ambito,
        tematica,
        formato,
        autor,
        municipio,
        imagen,
        id_vinculo,
        tipo_vinculo,
        agencia
    };
    
    noticias.push(nuevaNoticia);


    const json_noticias = JSON.stringify(noticias);
    fs.writeFileSync('src/noticias.json', json_noticias, 'utf-8');

    res.redirect('/');
});

router.get('/delete/:id', (req,res) => {
    noticias = noticias.filter(noticia => noticia.id != req.params.id);
    const json_noticias = JSON.stringify(noticias);
    fs.writeFileSync('src/noticias.json', json_noticias, 'utf-8');
    res.redirect('/');
});

module.exports = router;