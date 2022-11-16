const fs = require('fs');
const { v4 } = require('uuid');

/**
 * Clase para manejar el archivo de unidades de académicas
 */

class Unitsdb{

    static instance;

    constructor(){

        if(!!Unitsdb.instance){
            return Unitsdb.instance;
        }

        this.units = require("../resources/data/unidadesAcademicas.json");
        this.filePath = './resources/data/unidadesAcademicas.json';
        Unitsdb.instance = this;
    }

    /**
     * Busca unidad por nombre
     * @param {String} nombre Nombre de la unidad
     * @returns {{nombre: String, nombreCompleto: String, logo: String, id: String, link: String, color: String}} Unidad académica
     */

    getUnit(nombre){
        return this.units.find(unit => unit.nombre == nombre.toLocaleUpperCase());
    }

    /**
     * Busca unidad por id
     * @param {String} idCenter Id de la unidad
     * @returns {{nombre: String, nombreCompleto: String, logo: String, id: String, link: String, color: String}} Unidad académica
     */

    getUnitById(idUnit){
        return this.units.find(unit => unit.id == idUnit);
    }

    /**
     * Busca unidades académicas
     * @param {String} terms términos de búsqueda
     * @returns {Array<{nombre: String, nombreCompleto: String, logo: String, id: String, link: String, color: String}>} Unidades académicas
     */

    findUnit(terms) {
        let facFiltradas = this.units.filter(function (currentElement) {
            return currentElement.nombre.includes(terms.toLocaleUpperCase()) || currentElement.nombreCompleto.toLocaleUpperCase().includes(terms.toLocaleUpperCase());
        });
        return facFiltradas;
    }

    /**
     * Crea nueva unidad académica
     * @param {{nombre: String, nombreCompleto: String, logo: String, link: String, color: String}} newUnit Nueva unidad académica
     */    

    addUnit(newUnit){
        newUnit['id'] = v4();
        this.units.push(newUnit);
        fs.writeFileSync(this.filePath, JSON.stringify(this.units), 'utf-8');
    }
    
    /**
     * Elimina unidades académicas
     * @param {String} idCenter Id de la unidad
     */

    removeUnit(idUnit){
        const {logo} = this.units.find(unit => unit.id == idUnit);
        fs.rmSync(`./public/${logo}`);
        this.units = this.units.filter(unit => unit.id != idUnit);
        fs.writeFileSync(this.filePath, JSON.stringify(this.units), 'utf-8');
    }

    /**
     * Actualiza unidade académica
     * @param {String} idCenter Id de la unidad
     * @param {{nombre: String, nombreCompleto: String, logo: String, link: String, color: String}} unit Unidad académica
     */

    editUnit(idUnit, unit){
        unit['id'] = idUnit;
        const index = this.units.findIndex(unit => unit.id == idUnit);
        this.units[index] = unit;
        fs.writeFileSync(this.filePath, JSON.stringify(this.units), 'utf-8');
    }
}

module.exports = Unitsdb;