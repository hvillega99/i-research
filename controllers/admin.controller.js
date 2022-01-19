const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');

const unitsdb = new Unitsdb();
const centersdb = new Centersdb();

let showMessageUnit = false;
let messageUnit = '';

let showMessageCenter = false;
let messageCenter = '';

exports.loadHome = (req, res) => {
    res.send('ADMIN');
}

exports.downloadResearches = (req, res) => {
    const file = './resources/data/researches.csv';
    res.download(file);
}

exports.downloadDocuments = (req, res) => {
    const file = './resources/data/documents.csv';
    res.download(file);
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
    showMessageUnit = true;
    messageUnit = 'Se agregó nueva unidad académica.';
    res.redirect('/admin/unidades');
}

exports.deleteUnit = (req, res) => {
    const {idUnit} = req.params;
    unitsdb.removeUnit(idUnit);
    showMessageUnit = true;
    messageUnit = 'Unidad académica eliminada.';
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
    showMessageUnit = true;
    messageUnit = 'Información de la unidad académica actualizada.';
    res.redirect('/admin/unidades');
}

exports.loadUnitEditForm = (req, res) => {
    const {idUnit} = req.params;
    const unit = unitsdb.getUnitById(idUnit);
    res.render('../views/admin_edit.views.ejs',{'type':'unidades', 'title':'unidad académica', unit});
}

exports.loadUnits = (req, res) => {
    res.render('../views/admin_unidades.views.ejs',{'units':unitsdb.units, showMessageUnit, messageUnit});
    showMessageUnit=false;
}

exports.loadResearches = (req, res) => {
    res.render('../views/admin_investigadores.views.ejs');
}

exports.loadCenters = (req, res) => {
    res.render('../views/admin_centros.views.ejs',{'centers':centersdb.centers, showMessageCenter, messageCenter});
    showMessageCenter=false;
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
    showMessageCenter = true;
    messageCenter = 'Se agregó nuevo centro de investigación.';
    res.redirect('/admin/centros');
}

exports.deleteCenter = (req, res) => {
    const {idCenter} = req.params;
    centersdb.removeCenter(idCenter);
    showMessageCenter = true;
    messageCenter = 'Centro de investigación eliminado.';
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
    showMessageCenter = true;
    messageCenter = 'Información del centro de investigación actualizada.';
    res.redirect('/admin/centros');
}

exports.loadCenterEditForm = (req, res) => {
    const {idCenter} = req.params;
    const unit = centersdb.getCenterById(idCenter);
    res.render('../views/admin_edit.views.ejs',{'type':'centros', 'title':'centro de investigación', unit});
}
