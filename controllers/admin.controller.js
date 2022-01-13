const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');

const unitsdb = new Unitsdb();
const centersdb = new Centersdb();

exports.loadHome = (req, res) => {
    res.send('ADMIN');
}

exports.loadResearches = (req, res) => {
    res.render('../views/admin_investigadores.views.ejs');
}

exports.loadUnits = (req, res) => {
    res.render('../views/admin_unidades.views.ejs',{'units':unitsdb.units});
}

exports.loadCenters = (req, res) => {
    res.render('../views/admin_centros.views.ejs',{'centers':centersdb.centers});
}
