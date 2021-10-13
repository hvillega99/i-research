const Scopus = require('../helpers/scopus');
const Scival = require('../helpers/scival');
const Datajson = require('../helpers/jsondata');

const dbController = new Datajson();
const scival = new Scival();
const scopus = new Scopus();

exports.getMetrics = async (req, res) => {
    const scopusId = req.params.scopusId;
    const metrics = await scopus.getMetrics(scopusId);
    res.send(metrics);
}

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