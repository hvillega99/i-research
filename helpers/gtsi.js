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
        const data = result.filter(item => item["instituciones"]["institucionesEspol"].some(e => e["unidad"].includes(unit.toUpperCase())));
        let current = data.filter(item => item["estado"]==="EN EJECUCION");
        let finished = data.filter(item => item["estado"]==="FINALIZADO");
        return {current, finished};
    }
}

module.exports = Gtsi;