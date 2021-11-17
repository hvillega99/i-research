const Scival = require('../helpers/scival');
const Datajson = require('../helpers/jsondata');

const dbController = new Datajson();
const scival = new Scival();

exports.getMainPage = async (req, res) => {
    const arrScopusId = dbController.getAllScopusId();

    await scival.getTopH5Index(arrScopusId);
    res.render("../views/main.views.ejs");
}