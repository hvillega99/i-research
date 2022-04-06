const Scopus = require('../helpers/scopus')
const Scival = require('../helpers/scival');
const Gtsi = require('../helpers/gtsi');

const Researchersdb = require('../helpers/researchersdb');
const researches = new Researchersdb();

const scopus = new Scopus();
const scival = new Scival();
const gtsi = new Gtsi();

exports.getPerfilInvestigador = async (req, res) =>{
    const scopusId = req.params.scopusId;
    const result = researches.searchById(scopusId);
    
    if(!!result){
        let [orcidCountsAndSubjects, 
                hIndex, 
                publications2, 
                fcwi, 
                h5index
            ] = await Promise.all([scopus.getDataAndAreas(scopusId), 
                                    scopus.getHindex(scopusId), 
                                    scopus.getPublicationsTitle2(scopusId),
                                    scival.getFCWI(scopusId),
                                    scival.getH5index(scopusId)
                                ]);                       
                                
        const information = {...orcidCountsAndSubjects};

        const contrato = await gtsi.getContratoByOrcid(information.orcid);
        
        const nameAndAffiliations = researches.getNameAndAffiliations(scopusId);
        
        let srcFoto;

        if(contrato.error){
            srcFoto = '/img/author.png';
            information['nombre'] = nameAndAffiliations.name;
        }else{
            srcFoto = `https://talentohumano.espol.edu.ec/imgEmpleado/${contrato.cedula}.jpg`;
            information['nombre'] = `${contrato.apellidos} ${contrato.nombres}`;
        }
        
        information['srcFoto'] = srcFoto;
        information['nombreScopus'] = nameAndAffiliations.name;
        information['afiliaciones'] = nameAndAffiliations.affiliations;
        information['id'] = scopusId;
        information['fcwi'] = fcwi;
        information['hIndex'] = hIndex;
        information['h5Index'] = h5index;
        information['publicaciones'] = publications2;
        
        res.render("../views/investigador.views.ejs", {information});
        
    }else{
        res.render('../views/notFound.views.ejs');
    }
    
}