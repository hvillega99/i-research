const Datajson = require('../helpers/jsondata')


exports.find = (req, res) =>{
    const terms = req.body.terms;
    const thejson = new Datajson();

    let data = thejson.busquedaNombre(terms);
    //let elresult = thejson.busquedaId("56538670900");
    //console.log(elresult);
    
    res.render("../views/resultados.views.ejs", {total: data.length, resultados: data, terminos: terms});
};