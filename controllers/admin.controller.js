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

exports.loadUnitEditForm = (req, res) => {
    const {idUnit} = req.params;
    const unit = unitsdb.getUnitById(idUnit);
    res.render('../views/admin_edit.views.ejs',{'type':'unidades', 'title':'unidad académica', unit});
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

exports.addCenter = (req, res) => {

    const {filename} = req.file;
    const {nombre, siglas, publicaciones, citas} = req.body;

    const newCenter = {
        nombre: siglas,
        nombreCompleto: nombre,
        logo: `/logos/${filename}`,
        publicaciones,
        citas
    }

    centersdb.addCenter(newCenter);
    res.redirect('/admin/centros');
}

exports.deleteCenter = (req, res) => {
    const {idCenter} = req.params;
    centersdb.removeCenter(idCenter);
    res.redirect('/admin/centros');
}

exports.editCenter = (req, res) => {
    const {idCenter} = req.params;
    const {nombre, siglas, publicaciones, citas} = req.body; 
    let logo = '';

    if(req.file){
        const {filename} = req.file;
        logo = `/logos/${filename}`;
    }else{
        logo = centersdb.getCenterById(idCenter).logo;
    }

    const center = {
        nombre: siglas,
        nombreCompleto: nombre,
        logo,
        publicaciones,
        citas
    }

    centersdb.editCenter(idCenter, center);
    res.redirect('/admin/centros');
}

exports.loadCenterEditForm = (req, res) => {
    const {idCenter} = req.params;
    const unit = centersdb.getCenterById(idCenter);
    res.render('../views/admin_edit.views.ejs',{'type':'centros', 'title':'centro de investigación', unit});
}
