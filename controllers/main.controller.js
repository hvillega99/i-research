const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');

const unitsdb = new Unitsdb();
const centersdb = new Centersdb();

exports.getMainPage = async (req, res) => {

    let faculties = [];
    let centros = [];

    centersdb.centers.forEach(element => {
        centros.push(element);
    });

    unitsdb.units.forEach(element => {
        faculties.push(element);
    });

    res.render("../views/main.views.ejs", {faculties, centros});
}