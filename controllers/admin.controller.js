const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');
const resources = require('../resources/resources.json');
const fs = require('fs');

const unitsdb = new Unitsdb();
const centersdb = new Centersdb();

let showMessageUnit = false;
let messageUnit = '';

let showMessageCenter = false;
let messageCenter = '';

exports.uploadResearchers = (req, res) => {
    try {
        
        const {file} = req.files;
        file.mv(resources.path + file.name);

        resources.researchers = file.name;
        fs.writeFileSync('./resources/resources.json', JSON.stringify(resources), 'utf-8');
        
        res.redirect('/admin');

    } catch (err) {

        console.log('No se pudo subir el archivo');
        res.redirect('/admin');
    }
}

exports.uploadDocuments = (req, res) => {
    try {
        
        const {file} = req.files;
        file.mv(resources.path + file.name);

        resources.documents = file.name;
        fs.writeFileSync('./resources/resources.json', JSON.stringify(resources), 'utf-8');

        res.redirect('/admin');

    } catch (err) {

        console.log('No se pudo subir el archivo');
        res.redirect('/admin');
    }
}

exports.downloadResearchers = (req, res) => {
    const file = `${resources.path}${resources.researchers}`;
    res.download(file);
}

exports.downloadDocuments = (req, res) => {
    const file = `${resources.path}${resources.documents}`;
    res.download(file);
}

exports.addUnit = (req, res) => {

    try {
        
        const {logo} = req.files;
        const {nombre, siglas, publicaciones, citas} = req.body;
        logo.mv('./public/logos/' + logo.name);

        const newUnit = {
            nombre: siglas,
            nombreCompleto: nombre,
            logo: `/logos/${logo.name}`,
            publicaciones,
            citas
        }
    
        unitsdb.addUnit(newUnit);
        showMessageUnit = true;
        messageUnit = 'Se agregó nueva unidad académica.';
        res.redirect('/admin/unidades');


    } catch (err) {

        console.log('No se pudo agregar la unidad académica');
        res.redirect('/admin/unidades');
    }
}

exports.deleteUnit = (req, res) => {
    const {idUnit} = req.params;
    unitsdb.removeUnit(idUnit);
    showMessageUnit = true;
    messageUnit = 'Unidad académica eliminada.';
    res.redirect('/admin/unidades');
}

exports.editUnit = (req, res) => {
    try {
        const {idUnit} = req.params;
        const {nombre, siglas, publicaciones, citas} = req.body;
        let pathLogo;

        if(req.files){
            const {logo} = req.files;
            logo.mv('./public/logos/' + logo.name);
            pathLogo = `/logos/${logo.name}`;
        }else{
            pathLogo = unitsdb.getUnitById(idUnit).logo;
        }

        const unit = {
            nombre: siglas,
            nombreCompleto: nombre,
            logo: pathLogo,
            publicaciones,
            citas
        }
    
        unitsdb.editUnit(idUnit, unit);
        showMessageUnit = true;
        messageUnit = 'Información de la unidad académica actualizada.';
        res.redirect('/admin/unidades');

    } catch (err) {

        console.log('No se pudo editar la información de la unidad académica');
        res.redirect('/admin/unidades');
    }
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

exports.loadResearchers = (req, res) => {
    res.render('../views/admin_investigadores.views.ejs', 
    {
        "documentFile": resources.documents, 
        "researcherFile": resources.researchers
    });
}

exports.loadCenters = (req, res) => {
    res.render('../views/admin_centros.views.ejs',{'centers':centersdb.centers, showMessageCenter, messageCenter});
    showMessageCenter=false;
}

exports.addCenter = (req, res) => {
    try {
        
        const {logo} = req.files;
        const {nombre, siglas, publicaciones, citas} = req.body;
        logo.mv('./public/logos/' + logo.name);

        const newCenter = {
            nombre: siglas,
            nombreCompleto: nombre,
            logo: `/logos/${logo.name}`,
            publicaciones,
            citas
        }
    
        centersdb.addCenter(newCenter);
        showMessageCenter = true;
        messageCenter = 'Se agregó nuevo centro de investigación.';
        res.redirect('/admin/centros');

    } catch (err) {

        console.log('No se pudo agregar el centro de investigación');
        res.redirect('/admin/centros');
    }
}

exports.deleteCenter = (req, res) => {
    const {idCenter} = req.params;
    centersdb.removeCenter(idCenter);
    showMessageCenter = true;
    messageCenter = 'Centro de investigación eliminado.';
    res.redirect('/admin/centros');
}

exports.editCenter = (req, res) => {

    try {
        const {idCenter} = req.params;
        const {nombre, siglas, publicaciones, citas} = req.body;
        let pathLogo;

        if(req.files){
            const {logo} = req.files;
            logo.mv('./public/logos/' + logo.name);
            pathLogo = `/logos/${logo.name}`;
        }else{
            pathLogo = centersdb.getCenterById(idCenter).logo;
        }

        const center = {
            nombre: siglas,
            nombreCompleto: nombre,
            logo: pathLogo,
            publicaciones,
            citas
        }
    
        centersdb.editCenter(idCenter, center);
        showMessageCenter = true;
        messageCenter = 'Información del centro de investigación actualizada.';
        res.redirect('/admin/centros');

    } catch (err) {

        console.log('No se pudo editar la información del centro de investigación', err);
        res.redirect('/admin/centros');
    }
}

exports.loadCenterEditForm = (req, res) => {
    const {idCenter} = req.params;
    const unit = centersdb.getCenterById(idCenter);
    res.render('../views/admin_edit.views.ejs',{'type':'centros', 'title':'centro de investigación', unit});
}
