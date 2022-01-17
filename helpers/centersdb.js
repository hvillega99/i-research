const fs = require('fs');

class Centersdb{
    constructor(){
        this.centers = require("../resources/data/centros.json");
        this.filePath = './resources/data/centros.json';
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
        newCenter['id'] = this.centers.length + 1;
        this.centers.push(newCenter);
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }

    removeCenter(idCenter){
        const {logo} = this.centers.find(center => center.id == idCenter);
        fs.rmSync(`./public/${logo}`);
        this.centers = this.centers.filter(center => center.id != idCenter);
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }

    editCenter(idCenter, center){
        center['id'] = idCenter;
        this.centers[idCenter - 1] = center;
        fs.writeFileSync(this.filePath, JSON.stringify(this.centers), 'utf-8');
    }
}

module.exports = Centersdb;