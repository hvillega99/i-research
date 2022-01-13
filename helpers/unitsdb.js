const fs = require('fs');

class Unitsdb{
    constructor(){
        this.units = require("../resources/data/unidadesAcademicas.json");
        this.filePath = './resources/data/unidadesAcademicas.json';
    }

    getUnit(nombre){
        return this.units.find(unit => unit.nombre == nombre.toLocaleUpperCase());
    }

    findUnit(terms) {
        let facFiltradas = this.units.filter(function (currentElement) {
            return currentElement.nombre.includes(terms.toLocaleUpperCase()) || currentElement.nombreCompleto.toLocaleUpperCase().includes(terms.toLocaleUpperCase());
        });
        return facFiltradas;
    }

    addUnit(newUnit){
        newUnit['id'] = this.units.length + 1;
        this.units.push(newUnit);
        fs.writeFileSync(this.filePath, JSON.stringify(this.units), 'utf-8');
    }

    removeUnit(idUnit){
        this.units = this.units.filter(unit => unit.id != idUnit);
        fs.writeFileSync(this.filePath, JSON.stringify(this.units), 'utf-8');
    }

    editUnit(idUnit, unit){
        unit['id'] = idUnit;
        this.units[idUnit - 1] = unit;
        fs.writeFileSync(this.filePath, JSON.stringify(this.units), 'utf-8');
    }
}

module.exports = Unitsdb;