//const Investigadores = require('../models/investigadores.model');
const Datajson = require('../helpers/jsondata')


exports.find = (req, res) =>{
    const terms = req.body.terms;
    const thejson = new Datajson();

    let data = thejson.busquedaNombre(terms);
    //let elresult = thejson.busquedaId("56538670900");
    //console.log(elresult);
    
    res.render("../views/resultados.views.ejs", {total: data.length, resultados: data, terminos: terms});

    /*Investigadores.find({Autor: terms}, (err, docs) => {

        if(err) return res.status(500).send(err.message);
        res.render("../views/resultados.views.ejs", {total: docs.length, resultados: docs, terminos: terms});
    });*/
};