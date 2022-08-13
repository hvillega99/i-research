const fs = require('fs');
const { v4 } = require('uuid');

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

    getCenter(nombre){
        return this.centers.find(unit => unit.nombre == nombre.toLocaleUpperCase());
    }

    getCenterById(idCenter){
        return this.centers.find(center => center.id == idCenter);
    }

    findCenter(terms) {
        let results = this.centers.filter(function (currentElement) {
            return currentElement.nombre.includes(terms.toLocaleUpperCase()) || currentElement.nombreCompleto.toLocaleUpperCase().includes(terms.toLocaleUpperCase());
        });
        return results;
    }

    addCenter(newCenter){
        newCenter['id'] = v4();
        this.centers.push(newCenter);
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }

    removeCenter(idCenter){
        const {logo} = this.centers.find(center => center.id == idCenter);
        fs.rmSync(`./public/${logo}`);
        this.centers = this.centers.filter(center => center.id != idCenter);
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }

    removeAttachedCenters(idUnit){
        const attachedCenters = this.centers.filter(center => center.vinculacion == idUnit);

        attachedCenters.forEach(center => {
            fs.rmSync(`./public/${center.logo}`);
        } );

        this.centers = this.centers.filter(center => center.vinculacion != idUnit);
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }

    editCenter(idCenter, center){
        center['id'] = idCenter;
        const index = this.centers.findIndex(center => center.id == idCenter);
        this.centers[index] = center;
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }
}

module.exports = Centersdb;