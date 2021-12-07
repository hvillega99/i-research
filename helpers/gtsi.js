const fetch = require('node-fetch');

class Gtsi {
    constructor(){
        this.url = 'http://192.168.253.6:8081/api/Investigacion/GetProyectos';
    }

    async getProjects(author){

    }

    async getProjectsByUnit(unit){

        const response = await fetch(this.url);
        const result = await response.json();

        console.log(unit);
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