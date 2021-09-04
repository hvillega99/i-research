const Scopus = require('../helpers/scopus')
const Scival = require('../helpers/scival');
const Datajson = require('../helpers/jsondata');

exports.getPerfilInvestigador = async (req, res) =>{
    const scopusId = req.params.scopusId;

    const scopus = new Scopus();
    const scival = new Scival();
    const datajson = new Datajson();

    const orcidCountsAndSubjects = await scopus.getDataAndAreas(scopusId);
    const hIndex = await scopus.getHindex(scopusId);

    //Parte 1 de los nombres de los topicos y sus frecuencias
    //Buscar los id de las publicaciones
    //const publications = await scopus.getPublicationsId(scopusId);
   

    const fcwi = await scival.getFCWI(scopusId);
    const h5index = await scival.getH5index(scopusId);
    const nameAndAffiliations = datajson.getNameAndAffiliations(scopusId);
    //await scival.getPublications(scopusId);
    //await scival.getCitations(scopusId);

    const information = {...orcidCountsAndSubjects};
    information['nombre'] = nameAndAffiliations.name;
    information['afiliaciones'] = nameAndAffiliations.affiliations;
    information['id'] = scopusId;
    information['fcwi'] = fcwi;
    information['hIndex'] = hIndex;
    information['h5Index'] = h5index;
    
    //Parte 2 de los nombres de los topicos y sus frecuencias
    /*
    var mapa = {}
    for (let propi of publications){
        const topicsid = await scival.getInfoPublications(propi);
        const nametopics = await scival.getTopicName(topicsid);
        if(nametopics in mapa){
            mapa[nametopics]++;
        }
        else{
            mapa[nametopics]=1;
        }
    }
    console.log(mapa);
    */
    res.render("../views/investigador.views.ejs", {information: information});
}