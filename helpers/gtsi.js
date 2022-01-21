const fetch = require('node-fetch');

class Gtsi {
    constructor(){
        this.url = 'http://192.168.253.6:8081/api/Investigacion';
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
        try {
            const uri = `${this.url}/GetProyectos`;
            const response = await fetch(uri);
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

        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }
    }

    async getProjectsByUnit(unit){

        try{
            const uri = `${this.url}/GetProyectos`;
            const response = await fetch(uri);
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
        }catch(err){
            return {"error": true, "message": "servicio no disponible"};
        }

    }

    async getContratoByOrcid(orcid){
        const uri = `${this.url}/GetContratoByOrcid/${orcid}`;

        try{
            const response = await fetch(uri);
            const data = await response.json();
            return {
                'cedula': data.strIdentificacion,
                'nombres': data.strNombres,
                'apellidos': data.strApellidos
            }
        }catch(err){
            return {"error": true, "message": "servicio no disponible"};
        }
    }
}

module.exports = Gtsi;