const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');
const resources = require('../resources/resources.json');
const fs = require('fs');
const path = require('path');

const unitsdb = new Unitsdb();
const centersdb = new Centersdb();


const message = {
    show: false,
    content: '',
    type: 'success'
}

const messageUnit = {
    show: false,
    content: '',
    type: 'success'
}

const messageCenter = {
    show: false,
    content: '',
    type: 'success'
}

exports.uploadResearchers = (req, res) => {
    try {
        
        const {file} = req.files;
        file.mv(resources.path + file.name);

        resources.researchers = file.name;
        fs.writeFileSync('./resources/resources.json', JSON.stringify(resources), 'utf-8');
        
        message.content = 'Lista de investigadores actualizada';
        message.show = true;
        res.redirect('/admin');

    } catch (err) {

        message.content = 'No se pudo actualizar la lista de investigadores';
        message.type = 'danger';
        message.show = true;
        console.log(err);
        res.redirect('/admin');
    }
}

exports.uploadDocuments = (req, res) => {
    try {
        
        const {file} = req.files;
        file.mv(resources.path + file.name);

        resources.documents = file.name;
        fs.writeFileSync('./resources/resources.json', JSON.stringify(resources), 'utf-8');

        message.content = 'Archivo de publicaciones por áreas actualizado';
        message.show = true;
        res.redirect('/admin');

    } catch (err) {

        message.content = 'No se pudo actualizar el archivo de publicaciones por áreas';
        message.type = 'danger';
        message.show = true;
        console.log(err);
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
        const nameLogo = Date.now() + path.extname(logo.name)
        logo.mv('./public/logos/' + nameLogo);

        const newUnit = {
            nombre: siglas,
            nombreCompleto: nombre,
            logo: `/logos/${nameLogo}`,
            publicaciones,
            citas
        }
    
        unitsdb.addUnit(newUnit);
        messageUnit.show = true;
        messageUnit.content = 'Se agregó nueva unidad académica.';
        res.redirect('/admin/unidades');


    } catch (err) {

        messageUnit.content = 'No se pudo agregar la unidad académica';
        messageUnit.type = 'danger';
        messageUnit.show = true;
        res.redirect('/admin/unidades');
    }
}

exports.deleteUnit = (req, res) => {
    try {

        const {idUnit} = req.params;
        unitsdb.removeUnit(idUnit);
        messageUnit.show = true;
        messageUnit.content = 'Unidad académica eliminada.';
        res.redirect('/admin/unidades');

    } catch (err) {
        messageUnit.content = 'No se pudo eliminar la unidad académica';
        messageUnit.type = 'danger';
        messageUnit.show = true;
        console.error(err);
        res.redirect('/admin/unidades');
    }
}

exports.editUnit = (req, res) => {
    try {
        const {idUnit} = req.params;
        const {nombre, siglas, publicaciones, citas} = req.body;
        let pathLogo;

        if(req.files){
            const {logo} = req.files;
            const nameLogo = Date.now() + path.extname(logo.name)
            logo.mv('./public/logos/' + nameLogo);
            pathLogo = `/logos/${nameLogo}`;
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
        messageUnit.show = true;
        messageUnit.content = 'Información de la unidad académica actualizada.';
        res.redirect('/admin/unidades');

    } catch (err) {

        messageUnit.content = 'No se pudo editar la información de la unidad académica';
        messageUnit.show = true;
        messageUnit.type = 'danger'
        res.redirect('/admin/unidades');
    }
}

exports.loadUnitEditForm = (req, res) => {
    const {idUnit} = req.params;
    const unit = unitsdb.getUnitById(idUnit);
    res.render('../views/admin_edit.views.ejs',{'type':'unidades', 'title':'unidad académica', unit});
}

exports.loadUnits = (req, res) => {
    res.render('../views/admin_unidades.views.ejs',{'units':unitsdb.units, messageUnit});
    messageUnit.show=false;
    messageUnit.type = 'success';
}

exports.loadResearchers = (req, res) => {
    res.render('../views/admin_investigadores.views.ejs', 
    {
        "documentFile": resources.documents, 
        "researcherFile": resources.researchers,
        message
    });
    message.show = false;
    message.type = 'success';
}

exports.loadCenters = (req, res) => {
    res.render('../views/admin_centros.views.ejs',{'centers':centersdb.centers, messageCenter});
    messageCenter.show = false;
    messageCenter.type = 'success';
}

exports.addCenter = (req, res) => {
    try {
        
        const {logo} = req.files;
        const {nombre, siglas, publicaciones, citas} = req.body;
        const nameLogo = Date.now() + path.extname(logo.name)
        logo.mv('./public/logos/' + nameLogo);

        const newCenter = {
            nombre: siglas,
            nombreCompleto: nombre,
            logo: `/logos/${nameLogo}`,
            publicaciones,
            citas
        }
    
        centersdb.addCenter(newCenter);
        messageCenter.show = true;
        messageCenter.content = 'Se agregó nuevo centro de investigación.';
        res.redirect('/admin/centros');

    } catch (err) {
        messageCenter.content = 'No se pudo agregar el centro de investigación';
        messageCenter.type = 'danger';
        messageCenter.show = true;
        res.redirect('/admin/centros');
    }
}

exports.deleteCenter = (req, res) => {
    
    try{
        const {idCenter} = req.params;
        centersdb.removeCenter(idCenter);
        messageCenter.show = true;
        messageCenter.content = 'Centro de investigación eliminado.';
        res.redirect('/admin/centros');

    } catch(err){
        messageCenter.content = 'No se pudo eliminar el centro de investigación';
        messageCenter.type = 'danger';
        messageCenter.show = true;
        console.error(err);
        res.redirect('/admin/centros');
    }
}

exports.editCenter = (req, res) => {

    try {
        const {idCenter} = req.params;
        const {nombre, siglas, publicaciones, citas} = req.body;
        let pathLogo;

        if(req.files){
            const {logo} = req.files;
            const nameLogo = Date.now() + path.extname(logo.name);
            logo.mv('./public/logos/' + nameLogo);
            pathLogo = `/logos/${nameLogo}`;
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
        messageCenter.show = true;
        messageCenter.content = 'Información del centro de investigación actualizada.';
        res.redirect('/admin/centros');

    } catch (err) {

        messageCenter.content = 'No se pudo editar la información del centro de investigación';
        messageCenter.type = 'danger';
        messageCenter.show = true;
        res.redirect('/admin/centros');
    }
}

exports.loadCenterEditForm = (req, res) => {
    const {idCenter} = req.params;
    const unit = centersdb.getCenterById(idCenter);
    res.render('../views/admin_edit.views.ejs',{'type':'centros', 'title':'centro de investigación', unit});
}
