const fs = require('fs');
const { v4 } = require('uuid');

/**
 * Clase para manejar el archivo de centros de investigación
 */

class Centersdb{

    static instance;

    constructor(){

        if(!!Centersdb.instance){
            return Centersdb.instance;
        }
        
        this.centers = require("../resources/data/centros.json");
        this.filePath = './resources/data/centros.json';
        Centersdb.instance = this;
    }

    /**
     * Busca centro por nombre
     * @param {String} nombre Nombre del centro
     * @returns {{nombre: String, nombreCompleto: String, vinculacion: String, logo: String, id: String, link: String, color: String}} Centro de investigación
     */

    getCenter(nombre){
        return this.centers.find(unit => unit.nombre == nombre.toLocaleUpperCase());
    }

    /**
     * Busca centro por id
     * @param {String} idCenter Id del centro
     * @returns {{nombre: String, nombreCompleto: String, vinculacion: String, logo: String, id: String, link: String, color: String}} Centro de investigación
     */

    getCenterById(idCenter){
        return this.centers.find(center => center.id == idCenter);
    }

    /**
     * Busca centros de investigación
     * @param {String} terms términos de búsqueda
     * @returns {Array<{nombre: String, nombreCompleto: String, vinculacion: String, logo: String, id: String, link: String, color: String}>} Centros de investigación
     */

    findCenter(terms) {
        let results = this.centers.filter(function (currentElement) {
            return currentElement.nombre.includes(terms.toLocaleUpperCase()) || currentElement.nombreCompleto.toLocaleUpperCase().includes(terms.toLocaleUpperCase());
        });
        return results;
    }

    /**
     * Crea nuevo centro de investigación
     * @param {{nombre: String, nombreCompleto: String, vinculacion: String, logo: String, link: String, color: String}} newCenter Nuevo centro de investigación
     */

    addCenter(newCenter){
        newCenter['id'] = v4();
        this.centers.push(newCenter);
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }

    /**
     * Elimina centros de investigación
     * @param {String} idCenter Id del centro
     */

    removeCenter(idCenter){
        const {logo} = this.centers.find(center => center.id == idCenter);
        fs.rmSync(`./public/${logo}`);
        this.centers = this.centers.filter(center => center.id != idCenter);
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }

    /**
     * Elimina todos los centros vinculados a una unidad
     * @param {String} idUnit Siglas de la unidad académica a la que se encuentra vinculado el centro
     */

    removeAttachedCenters(idUnit){
        const attachedCenters = this.centers.filter(center => center.vinculacion == idUnit);

        attachedCenters.forEach(center => {
            fs.rmSync(`./public/${center.logo}`);
        } );

        this.centers = this.centers.filter(center => center.vinculacion != idUnit);
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }

    /**
     * Actualiza centro de investigación
     * @param {String} idCenter Id del centro
     * @param {{nombre: String, nombreCompleto: String, vinculacion: String, logo: String, link: String, color: String}} center Centro de investigación
     */

    editCenter(idCenter, center){
        center['id'] = idCenter;
        const index = this.centers.findIndex(center => center.id == idCenter);
        this.centers[index] = center;
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }
}

module.exports = Centersdb;