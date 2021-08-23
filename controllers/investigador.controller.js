const Scopus = require('../helpers/scopus')


exports.getPerfilInvestigador = async (req, res) =>{
    const scopusId = req.params.scopusId;

    const scopus = new Scopus();
    const orcidAndCounts = await scopus.getOrcidAndCounts(scopusId);
    const hIndex = await scopus.getHindex(scopusId);

    const information = {...orcidAndCounts, ...hIndex};
    information['id'] = scopusId;
    
    res.render("../views/investigador.views.ejs", {information: information})
}