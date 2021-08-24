const Investigadores = require('../models/investigadores.model');

exports.find = (req, res) =>{
    console.log('HOla como estan')
    const terms = req.body.terms;
    console.log(terms);

    /*fetch("../public/data/mySciVal_Researchers_Export.json")
    .then(res => res.json())
    .then(resultado => {
        console.log(resultado)
      }
    )
    .catch(console.error);*/

    //const fs = require('fs');

    //let rawdata = fs.readFileSync('../public/data/mySciVal_Researchers_Export.json');
    //let student = JSON.parse(rawdata);
    //console.log(student)
    var resultados = require('../public/data/mySciVal_Researchers_Export.json');
    //console.log(jaison);
    let frutas = []
    for(let resultado of resultados){
        if(resultado["Author"]==terms){
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