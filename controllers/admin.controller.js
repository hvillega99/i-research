const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');
const Researchersdb = require('../helpers/researchersdb');

const Resourcesdb = require('../helpers/resourcesdb');
const resources = new Resourcesdb();

const Cache = require('../cache/cache');
const cache = new Cache();

//const fs = require('fs');
const path = require('path');

const unitsdb = new Unitsdb();
const centersdb = new Centersdb();
const researchersdb = new Researchersdb();


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

exports.uploadResearchers = async (req, res) => {
    try {
        
        const {file} = req.files;

        let name = file.name;
        
        if(name == resources.files.researchers){
            const elements = name.split('.');
            const ext = elements.pop();
            name = `${elements.join('')}(1).${ext}`;
        }

        //fs.rmSync(`${resources.files.path}${resources.files.researchers}`);
        
        resources.files.researchers = name;
        resources.save()
        file.mv(resources.files.path + name);

        await researchersdb.update();
        
        const keys = await cache.getKeys('*');

        if(!keys.error){
            const saveKeys = ['sdg', 'map'];
            const delKeys = keys.filter(key => !saveKeys.includes(key));
            
            await cache.del(delKeys);
        }

        message.content = 'Archivo de investigadores actualizado.';
        message.show = true;
        res.redirect('/admin');

    } catch (err) {

        message.content = 'Algo salió mal en la actualización de investigadores, intente de nuevo por favor.';
        message.type = 'danger';
        message.show = true;
        console.log(err);
        res.redirect('/admin');
    }
}

exports.uploadDocuments = (req, res) => {
    try {
        
        const {file} = req.files;

        let name = file.name;
        
        if(name == resources.files.documents){
            const elements = name.split('.');
            const ext = elements.pop();
            name = `${elements.join('')}(1).${ext}`;
        }

        //fs.rmSync(`${resources.files.path}${resources.files.documents}`);
        
        resources.files.documents = name;
        resources.save();
        file.mv(resources.files.path + name);

        message.content = 'Archivo de publicaciones por áreas actualizado.';
        message.show = true;
        res.redirect('/admin');

    } catch (err) {

        message.content = 'Algo salió mal en la actualización de publicaciones por áreas, intente de nuevo por favor.';
        message.type = 'danger';
        message.show = true;
        console.log(err);
        res.redirect('/admin');
    }
}

exports.uploadUsers = (req, res) => {
    try {
        
        const {file} = req.files;

        let name = file.name;
        
        if(name == resources.files.users){
            const elements = name.split('.');
            const ext = elements.pop();
            name = `${elements.join('')}(1).${ext}`;
        }
        
        resources.files.users = name;
        resources.save();
        file.mv(resources.files.path + name);

        message.content = 'Archivo de usuarios con privilegios actualizado.';
        message.show = true;
        res.redirect('/admin');

    } catch (err) {

        message.content = 'No se pudo actualizar el archivo de usuarios con privilegios.';
        message.type = 'danger';
        message.show = true;
        console.log(err);
        res.redirect('/admin');
    }
}

exports.uploadApiKey = (req, res) => {
    try {
        
        const {file} = req.files;
        
        let name = file.name;
        
        if(name == resources.files.apikey){
            const elements = name.split('.');
            const ext = elements.pop();
            name = `${elements.join('')}(1).${ext}`;
        }
        
        resources.files.apikey = name;
        resources.save();
        file.mv(resources.files.path + name);

        message.content = 'Archivo de API Key actualizado.';
        message.show = true;
        res.redirect('/admin');

    } catch (err) {

        message.content = 'No se pudo actualizar el archivo de API Key.';
        message.type = 'danger';
        message.show = true;
        console.log(err);
        res.redirect('/admin');
    }
}

exports.downloadResearchers = (req, res) => {
    const file = `${resources.files.path}${resources.files.researchers}`;
    res.download(file);
}

exports.downloadDocuments = (req, res) => {
    const file = `${resources.files.path}${resources.files.documents}`;
    res.download(file);
}

exports.downloadUsers = (req, res) => {
    const file = `${resources.files.path}${resources.files.users}`;
    res.download(file);
}

exports.downloadApiKey = (req, res) => {
    const file = `${resources.files.path}${resources.files.apikey}`;
    res.download(file);
}

exports.addUnit = (req, res) => {

    try {
        
        const {logo} = req.files;
        const {color, nombre, siglas, link} = req.body;
        const nameLogo = Date.now() + path.extname(logo.name)
        logo.mv('./public/logos/' + nameLogo);

        const newUnit = {
            color,
            link,
            nombre: siglas,
            nombreCompleto: nombre,
            logo: `/logos/${nameLogo}`
        }
    
        unitsdb.addUnit(newUnit);
        messageUnit.show = true;
        messageUnit.content = 'Se agregó nueva unidad académica.';
        res.redirect('/admin/unidades');


    } catch (err) {

        messageUnit.content = 'No se pudo agregar la unidad académica.';
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
        const {color, nombre, siglas, link} = req.body;
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
            color,
            link,
            nombre: siglas,
            nombreCompleto: nombre,
            logo: pathLogo
        }
    
        unitsdb.editUnit(idUnit, unit);
        messageUnit.show = true;
        messageUnit.content = 'Información de la unidad académica actualizada.';
        res.redirect('/admin/unidades');

    } catch (err) {

        messageUnit.content = 'No se pudo editar la información de la unidad académica.';
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
        "documentFile": resources.files.documents, 
        "researcherFile": resources.files.researchers,
        "usersFile": resources.files.users,
        "apikeyFile": resources.files.apikey,
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
        const {color, nombre, siglas, link} = req.body;
        const nameLogo = Date.now() + path.extname(logo.name)
        logo.mv('./public/logos/' + nameLogo);

        const newCenter = {
            color,
            link,
            nombre: siglas,
            nombreCompleto: nombre,
            logo: `/logos/${nameLogo}`
        }

        centersdb.addCenter(newCenter);
        messageCenter.show = true;
        messageCenter.content = 'Se agregó nuevo centro de investigación.';
        res.redirect('/admin/centros');

    } catch (err) {
        messageCenter.content = 'No se pudo agregar el centro de investigación.';
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
        const {color, nombre, siglas, link} = req.body;
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
            color,
            link,
            nombre: siglas,
            nombreCompleto: nombre,
            logo: pathLogo
        }
    
        centersdb.editCenter(idCenter, center);
        messageCenter.show = true;
        messageCenter.content = 'Información del centro de investigación actualizada.';
        res.redirect('/admin/centros');

    } catch (err) {

        messageCenter.content = 'No se pudo editar la información del centro de investigación.';
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
