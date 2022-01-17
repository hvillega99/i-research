const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');

const unitsdb = new Unitsdb();
const centersdb = new Centersdb();

exports.loadHome = (req, res) => {
    res.send('ADMIN');
}

exports.addUnit = (req, res) => {

    const {filename} = req.file;
    const {nombre, siglas, publicaciones, citas} = req.body;

    const newUnit = {
        nombre: siglas,
        nombreCompleto: nombre,
        logo: `/logos/${filename}`,
        publicaciones,
        citas
    }

    unitsdb.addUnit(newUnit);
    res.redirect('/admin/unidades');
}

exports.deleteUnit = (req, res) => {
    const {idUnit} = req.params;
    unitsdb.removeUnit(idUnit);
    res.redirect('/admin/unidades');
}

exports.editUnit = (req, res) => {
    const {idUnit} = req.params;
    const {nombre, siglas, publicaciones, citas} = req.body; 
    let logo = '';

    if(req.file){
        const {filename} = req.file;
        logo = `/logos/${filename}`;
    }else{
        logo = unitsdb.getUnitById(idUnit).logo;
    }

    const unit = {
        nombre: siglas,
        nombreCompleto: nombre,
        logo,
        publicaciones,
        citas
    }

    unitsdb.editUnit(idUnit, unit);
    res.redirect('/admin/unidades');
}

exports.loadEditUnitForm = (req, res) => {
    const {idUnit} = req.params;
    const unit = unitsdb.getUnitById(idUnit);
    res.render('../views/admin_edit.views.ejs',{'type':'unidad académica', unit});
}

exports.loadUnits = (req, res) => {
    res.render('../views/admin_unidades.views.ejs',{'units':unitsdb.units});
}

exports.loadResearches = (req, res) => {
    res.render('../views/admin_investigadores.views.ejs');
}
exports.loadCenters = (req, res) => {
    res.render('../views/admin_centros.views.ejs',{'centers':centersdb.centers});
}
