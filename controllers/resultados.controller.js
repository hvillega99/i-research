const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');
const Researchersdb = require('../helpers/researchersdb');

const researches = new Researchersdb();
const unitsdb = new Unitsdb();
const centersdb = new Centersdb();

exports.find = (req, res) =>{
    const terms = req.body.terms;

    let data = researches.searchByName(terms);
    const resultadosCentros = centersdb.findCenter(terms);
    const resultadosFacultades = unitsdb.findUnit(terms);
    const totalResultados = data.length + resultadosCentros.length + resultadosFacultades.length;
    
    res.render("../views/resultados.views.ejs", {total: totalResultados, 
                                                resultados: data, 
                                                facultades: resultadosFacultades, 
                                                centros: resultadosCentros, 
                                                terminos: terms});
};