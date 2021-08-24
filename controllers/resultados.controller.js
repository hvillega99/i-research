const Investigadores = require('../models/investigadores.model');

exports.find = (req, res) =>{
    console.log('HOla como estan')
    const terms = req.body.terms;
    console.log(terms);
    //El archivo original
    //var resultados = require('../public/data/mySciVal_Researchers_Export.json');
    //El archivo pulido (autores no repetidos)
    var resultados = require('../public/data/investigadores_data.json');
    let frutas = []
    for(let resultado of resultados){
        //Con el archivo original
        //if(resultado["Author"]==terms){
        //Con el archivo pulido (autores no repetidos) //
        if(resultado["Autor"]==terms){
            frutas.push(resultado);
            console.log(resultado);
        }
    }
    res.render("../views/resultados.views.ejs", {total: frutas.length, resultados: frutas, terminos: terms});

    /*Investigadores.find({Autor: terms}, (err, docs) => {

        if(err) return res.status(500).send(err.message);
        res.render("../views/resultados.views.ejs", {total: docs.length, resultados: docs, terminos: terms});
    });*/
};