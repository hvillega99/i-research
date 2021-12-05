const Scival = require('../helpers/scival');
const Datajson = require('../helpers/jsondata');
const fetch = require('node-fetch');

const dbController = new Datajson();
const scival = new Scival();

exports.getUACitationsByYear = async (req, res) => {
    const ua = req.params.ua;
    
    const investigadores = dbController.getInvestigadores(ua);
    const arrScopusId = investigadores.map(item => item.id)
    const data = await scival.getCitations(arrScopusId.join(','));

    const years = Object.keys(data[0]);
    const values = {};
    years.forEach(year => {
        values[year] = 0;
    })

    data.forEach(item => {
        years.forEach(year => {
            values[year] += item[year]
        })
    })

    res.send(values);
}

exports.getUAPublicationsByYear = async (req, res) => {
    const ua = req.params.ua;
    
    const investigadores = dbController.getInvestigadores(ua);
    const arrScopusId = investigadores.map(item => item.id)
    const data = await scival.getPublications(arrScopusId.join(','));

    const years = Object.keys(data[0]);
    const values = {};
    years.forEach(year => {
        values[year] = 0;
    })

    data.forEach(item => {
        years.forEach(year => {
            values[year] += item[year]
        })
    })

    res.send(values);
}

exports.getEspolCitationsByYear = async (req, res) => {
    const citations = await scival.getInstitutionCitations('701420');
    res.send(citations);
}

exports.getEspolPublicationsByYear = async (req, res) => {
    const publications = await scival.getInstitutionPublications('701420');
    res.send(publications); 
}

exports.getTopAuthors = async (req, res) => {
    
    const arrScopusId = dbController.getAllScopusId();
    let authors = [];

    for(let i=0; i<10; i++){
        let subArray = await scival.getHIndexAll(arrScopusId.slice(Math.round((i/10)*arrScopusId.length), Math.round(((i+1)/10)*arrScopusId.length)));
        authors = [...authors, ...subArray];
     }
 
     authors.sort((x, y) => y.h - x.h);
     authors = authors.slice(0, 10);

     res.json(authors);
}

exports.getCollaborators = async (req, res) => {
    const {scopusId, publications} = req.params;

    const collaborators = await scival.getCoauthors(publications.split(','),scopusId);

    res.json(collaborators);
}

exports.getProjectsByAuthor = async (req, res) => {
    const {author} = req.params;
    

}

exports.getProjectsByUnit = async (req, res) => {
    const {ua} = req.params;
    console.log('fetching')
    const response = await fetch('http://192.168.253.6:8081/api/Investigacion/GetProyectos');
    const result = await response.json();
    console.log('flag');
    const data = result.filter(item => item["instituciones"]["institucionesEspol"].some(e => e["unidad"].includes(ua)));
    let current = data.filter(item => item["estado"]==="EN EJECUCION");
    let finished = data.filter(item => item["estado"]==="FINALIZADO");
    res.json({current, finished});
}