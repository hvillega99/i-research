const Scival = require('../helpers/scival');
const Datajson = require('../helpers/jsondata');

const dbController = new Datajson();

exports.getMainPage = async (req, res) => {

    let faculties = [];
    let centros = [];

    dbController.centros.forEach(element => {
        centros.push(element);
    });

    dbController.facultades.forEach(element => {
        faculties.push(element);
    });

    res.render("../views/main.views.ejs", {faculties, centros});
}