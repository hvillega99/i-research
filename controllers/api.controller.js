const Scopus = require('../helpers/scopus');

exports.getMetrics = async (req, res) => {
    const scopus = new Scopus();
    const scopusId = req.params.scopusId;
    const metrics = await scopus.getMetrics(scopusId);
    res.send(metrics);
}