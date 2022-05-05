const fetch = require('node-fetch');

class Gtsi {
    constructor(){
        this.url = 'http://192.168.253.6:8081/api/Investigacion';
    }

    countProjectsByYear = (arr) => {
        const counting = {};

        arr.forEach(item => {
            counting[item] = (counting[item] || 0) + 1;
        })

        return counting;
    }

    async getProjects(scopusId){
        try {
            const uri = `${this.url}/GetProyectosByScopusId/${scopusId}`;
            const response = await fetch(uri);
            const data = await response.json();
    
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
            const uri = `${this.url}/GetProyectosByUnidad/${unit}`;
            const response = await fetch(uri);
            const data = await response.json();

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
            return {"error": true, "message": "no se pudo obtener la información del investigador"};
        }
    }

    async getContratoByScopusId(scopusId){
        const uri = `${this.url}/GetContratoByScopusId/${scopusId}`;

        try{
            const response = await fetch(uri);
            const data = await response.json();
            return {
                'cedula': data.strIdentificacion,
                'nombres': data.strNombres,
                'apellidos': data.strApellidos,
                'sexo': data.strSexo,
                scopusId
            }
        }catch(err){
            return {"error": true, "message": "no se pudo obtener la información del investigador", scopusId};
        }
    }

    async getContratosByScopusId(scopusIdArr){
        
        const contratos = await Promise.all(
            scopusIdArr.map(async (scopusId) => this.getContratoByScopusId(scopusId))
        )

        //console.log(contratos)
        return contratos;
    }

    async getAuthorsByKeywords(keywords){
        
        const uri = `${this.url}/GetProyectosByKeyword/${keywords}`;
        var listaInv = {}
        try{
            const response = await fetch(uri);
            const data = await response.json();
            
            data.forEach( proyecto => {
                proyecto["colaboradores"].forEach( investigador => {
                    if(investigador["scopusId"]!=null){
                        if(!listaInv[investigador["scopusId"]]){
                            listaInv[investigador["scopusId"]] = {'nombre':investigador["nombre"],'cedula':investigador["cedula"]}
                        }
                       
                    }
                })
            });
            return listaInv;
        }catch(err){
            return {"error": true, "message": "no se pudo obtener la información de investigadores con estas palabras claves", keywords};
        }
    }
}

module.exports = Gtsi;