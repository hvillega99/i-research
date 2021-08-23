const Scopus = require('../helpers/scopus')
const Scival = require('../helpers/scival');


exports.getPerfilInvestigador = async (req, res) =>{
    const scopusId = req.params.scopusId;

    const scopus = new Scopus();
    const scival = new Scival();

    const orcidAndCounts = await scopus.getOrcidAndCounts(scopusId);
    const hIndex = await scopus.getHindex(scopusId);
    const fcwi = await scival.getFCWI(scopusId);
    const h5index = await scival.getH5index(scopusId);

    const information = {...orcidAndCounts};
    information['id'] = scopusId;
    information['fcwi'] = fcwi;
    information['hIndex'] = hIndex;
    information['h5Index'] = h5index;
    
    res.render("../views/investigador.views.ejs", {information: information})
}