const fetch = require('node-fetch');

class Gtsi {
    constructor(){
        this.url = 'http://192.168.253.6:8081/api/Investigacion/GetProyectos';
    }

    async getProjects(author){
        const response = await fetch(this.url);
        const result = await response.json();

        const [name, lastname] = author.split('-');

        console.log(name, lastname);

        const data = result.filter(item => item["colaboradores"].some(e => {
            return e["nombre"].includes(name.toUpperCase()) && e["nombre"].includes(lastname.toUpperCase());
        }));

        let current = data.filter(item => item["estado"]==="EN EJECUCION");
        let finished = data.filter(item => item["estado"]==="FINALIZADO");
        return {current, finished};
    }

    async getProjectsByUnit(unit){

        const response = await fetch(this.url);
        const result = await response.json();

        const [name, acronym] = unit.split('-');

        const data = result.filter(item => item["instituciones"]["institucionesEspol"].some(e => {
            return e["unidad"].includes(acronym.toUpperCase()) || e["unidad"].includes(name.toUpperCase());
        }));

        let current = data.filter(item => item["estado"]==="EN EJECUCION");
        let finished = data.filter(item => item["estado"]==="FINALIZADO");
        return {current, finished};
    }
}

module.exports = Gtsi;