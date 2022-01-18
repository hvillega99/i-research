const fs = require('fs');
const { v4 } = require('uuid');

class Unitsdb{
    constructor(){
        this.units = require("../resources/data/unidadesAcademicas.json");
        this.filePath = './resources/data/unidadesAcademicas.json';
    }

    getUnit(nombre){
        return this.units.find(unit => unit.nombre == nombre.toLocaleUpperCase());
    }

    getUnitById(idUnit){
        return this.units.find(unit => unit.id == idUnit);
    }

    findUnit(terms) {
        let facFiltradas = this.units.filter(function (currentElement) {
            return currentElement.nombre.includes(terms.toLocaleUpperCase()) || currentElement.nombreCompleto.toLocaleUpperCase().includes(terms.toLocaleUpperCase());
        });
        return facFiltradas;
    }

    addUnit(newUnit){
        newUnit['id'] = v4();
        this.units.push(newUnit);
        fs.writeFileSync(this.filePath, JSON.stringify(this.units), 'utf-8');
    }

    removeUnit(idUnit){
        const {logo} = this.units.find(unit => unit.id == idUnit);
        fs.rmSync(`./public/${logo}`);
        this.units = this.units.filter(unit => unit.id != idUnit);
        fs.writeFileSync(this.filePath, JSON.stringify(this.units), 'utf-8');
    }

    editUnit(idUnit, unit){
        unit['id'] = idUnit;
        const index = this.units.findIndex(unit => unit.id == idUnit);
        this.units[index] = unit;
        fs.writeFileSync(this.filePath, JSON.stringify(this.units), 'utf-8');
    }
}

module.exports = Unitsdb;