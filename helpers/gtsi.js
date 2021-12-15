const fetch = require('node-fetch');

class Gtsi {
    constructor(){
        this.url = 'http://192.168.253.6:8081/api/Investigacion/GetProyectos';
    }

    removeAccents = (str) => {
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U','Š':'S','š':'s'};
	    return str.split('').map( letra => acentos[letra] || letra).join('').toString();	
    }

    countProjectsByYear = (arr) => {
        const counting = {};

        arr.forEach(item => {
            counting[item] = (counting[item] || 0) + 1;
        })

        return counting;
    }

    async getProjects(author){

        const response = await fetch(this.url);
        const result = await response.json();

        const [name, lastname] = author.split('-');


        const data = result.filter(item => item["colaboradores"].some(e => {
            return e["nombre"].includes(this.removeAccents(name).toUpperCase()) && e["nombre"].includes(this.removeAccents(lastname).toUpperCase());
        }));

        const years = data.map(item => item["fechainicio"].split('/')[2]);
        const counting = this.countProjectsByYear(years);

        let current = data.filter(item => item["estado"]==="EN EJECUCION");
        let finished = data.filter(item => item["estado"]==="FINALIZADO");
        return {current, finished, counting};
    }

    async getProjectsByUnit(unit){

        const response = await fetch(this.url);
        const result = await response.json();

        const [name, acronym] = unit.split('-');

        const data = result.filter(item => item["instituciones"]["institucionesEspol"].some(e => {
            return e["unidad"].includes(this.removeAccents(acronym).toUpperCase()) || e["unidad"].includes(this.removeAccents(name).toUpperCase());
        }));

        const years = data.map(item => item["fechainicio"].split('/')[2]);
        const counting = this.countProjectsByYear(years);

        let current = data.filter(item => item["estado"]==="EN EJECUCION");
        let finished = data.filter(item => item["estado"]==="FINALIZADO");
        return {current, finished, counting};
    }
}

module.exports = Gtsi;