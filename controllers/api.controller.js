const Scival = require('../helpers/scival');
const Scopus = require('../helpers/scopus');
const Gtsi = require('../helpers/gtsi');
const CsvParser = require('../helpers/csvParser');

const Researchersdb = require('../helpers/researchersdb');
const dbController = new Researchersdb();

const scival = new Scival();
const gtsi = new Gtsi();
const scopus = new Scopus();
const parser = new CsvParser();

exports.getBibliometricsUnit = async (req, res) => {
    const {ua} = req.params;
    const researchers = dbController.getResearchersByUnit(ua);
    const arrScopusId = researchers.map(item => item.id);

    const date = new Date();
    const lastYear = date.getFullYear() - 1;
    const years = [lastYear-5, lastYear-4, lastYear-3, lastYear-2, lastYear-1, lastYear];

    const data = await Promise.all(
        years.map(year => scopus.getNPublications(arrScopusId, year))
    );

    res.send(data);
}

exports.getEspolCitationsByYear = async (req, res) => {
    const citations = await scival.getInstitutionCitations('701420');
    res.send(citations);
}

exports.getEspolPublicationsByYear = async (req, res) => {
    const publications = await scival.getInstitutionPublications('701420');
    res.send(publications); 
}

exports.getTopJournalInst = async (req, res) => {
    const topJournals = await scival.getPublicationsInTopJournalPercentiles('701420');
    res.send(topJournals);
}

exports.getTopAuthors = async (req, res) => {
    
    const arrScopusId = dbController.getAllScopusId();
    let authors = [];

    try{
        for(let i=0; i<10; i++){
            let subArray;
            subArray = await scival.getHIndexAll(arrScopusId.slice(Math.round((i/10)*arrScopusId.length), Math.round(((i+1)/10)*arrScopusId.length)));
            authors = [...authors, ...subArray];
        }
     
        authors.sort((x, y) => y.h - x.h);
        authors = authors.slice(0, 10);
    
        res.json(authors);
    }catch (err) {
        res.json({"error": true, "message": "servicio no disponible"});
    }
}

exports.getCollaborators = async (req, res) => {
    const {scopusId, publications} = req.params;

    let collaborators = [];

    try{
        collaborators = await scopus.getCoauthors(publications.split(','),scopusId);
        collaborators.forEach(e => {
            const result = dbController.searchById(e.id);
            e["fromEspol"] = result != undefined;
        })
        res.json(collaborators);
    }catch (err) {
        res.json({error: true, message: 'servicio no disponible'});
    }

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

exports.getPublicationsByArea = async (req, res) => {
    const data = await parser.getDocumentsByArea();
    let total = 0;

    data.forEach(item => {
        total += parseInt(item.Documents);
    })

    data.forEach(item => {
        const percent = (parseInt(item.Documents)/total)*100;
        item["Percent"] = percent;
    })

    res.json(data);
}