const Scival = require('../helpers/scival');
const Datajson = require('../helpers/jsondata');
const Scopus = require('../helpers/scopus');
const Gtsi = require('../helpers/gtsi');

const dbController = new Datajson();
const scival = new Scival();
const gtsi = new Gtsi();
const scopus = new Scopus();

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
    const projects = await gtsi.getProjects(author);
    res.send(projects);
}

exports.getProjectsByUnit = async (req, res) => {
    const {ua} = req.params;
    const projects = await gtsi.getProjectsByUnit(ua);
    res.send(projects);
}

exports.getPublicationsInfo = async (req, res) => {
    const {id} = req.params;
    const info = await scopus.getInfoPublications(id);
    res.send(info);
}