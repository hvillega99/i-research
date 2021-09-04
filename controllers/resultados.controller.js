const Datajson = require('../helpers/jsondata')


exports.find = (req, res) =>{
    const terms = req.body.terms;
    const thejson = new Datajson();

    let data = thejson.busquedaNombre(terms);
    const resultadosCentros = thejson.busquedaCentro(terms);
    const resultadosFacultades = thejson.busquedaFacultad(terms);
    const totalResultados = data.length + resultadosCentros.length + resultadosFacultades.length;
    
    res.render("../views/resultados.views.ejs", {total: totalResultados, 
                                                resultados: data, 
                                                facultades: resultadosFacultades, 
                                                centros: resultadosCentros, 
                                                terminos: terms});
};