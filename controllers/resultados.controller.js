const Investigadores = require('../models/investigadores.model');

exports.find = (req, res) =>{
    const terms = req.body.terms;
    Investigadores.find({Autor: terms}, (err, docs) => {

        if(err) return res.status(500).send(err.message);
        res.render("../views/resultados.views.ejs", {total: docs.length, resultados: docs, terminos: terms});
    });
};