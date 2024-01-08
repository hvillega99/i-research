const fetch = require('node-fetch');

class Gtsi {
    constructor(){
        this.investigacionURL = 'http://ws.espol.edu.ec/investigacion/api/Investigacion';
        this.carnetURL = 'https://ws.espol.edu.ec/carnetvirtual/api/FotoPerfil';
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
            const uri = `${this.investigacionURL}/GetProyectosByScopusId/${scopusId}`;
            const response = await fetch(uri);
            const data = await response.json();
    
            const years = data.map(item => item["fechainicio"].split('/')[2]);
            const counting = this.countProjectsByYear(years);

            const startYears = data.map(item => item["fechainicio"].split('/')[2]);
            const endYears = data.map(item => item["fechafin"].split('/')[2]);
            const countingStartYear = this.countProjectsByYear(startYears);
            const countingEndYear = this.countProjectsByYear(endYears);
    
            let current = data.filter(item => item["estado"]==="EN EJECUCION");
            let finished = data.filter(item => item["estado"]==="FINALIZADO");
            return {current, finished, countingStartYear, countingEndYear};

        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }
    }

    async getProjectsByUnit(unit){

        try{
            const uri = `${this.investigacionURL}/GetProyectosByUnidad/${unit}`;
            const response = await fetch(uri);
            const data = await response.json();

            const startYears = data.map(item => item["fechainicio"].split('/')[2]);
            const endYears = data.map(item => item["fechafin"].split('/')[2]);
            const countingStartYear = this.countProjectsByYear(startYears);
            const countingEndYear = this.countProjectsByYear(endYears);
    
            let current = data.filter(item => item["estado"]==="EN EJECUCION");
            let finished = data.filter(item => item["estado"]==="FINALIZADO");
            return {current, finished, countingStartYear, countingEndYear};
        }catch(err){
            return {"error": true, "message": "servicio no disponible"};
        }

    }

    async getProjectsByODS(ODS){

        try{
            const uri = `${this.investigacionURL}/GetProyectosByODSId/${ODS}`;
            const response = await fetch(uri);
            const data = await response.json();

            const startYears = data.map(item => item["fechainicio"].split('/')[2]);
            const endYears = data.map(item => item["fechafin"].split('/')[2]);
            const countingStartYear = this.countProjectsByYear(startYears);
            const countingEndYear = this.countProjectsByYear(endYears);
    
            let current = data.filter(item => item["estado"]==="EN EJECUCION");
            let finished = data.filter(item => item["estado"]==="FINALIZADO");
            return {current, finished, countingStartYear, countingEndYear};
        }catch(err){
            return {"error": true, "message": "servicio no disponible"};
        }

    }

    async getContratoByOrcid(orcid){
        const uri = `${this.investigacionURL}/GetContratoByOrcid/${orcid}`;

        try{
            const response = await fetch(uri);
            const data = await response.json();
            return {
                'cedula': data.strIdentificacion,
                'nombres': data.strNombres,
                'apellidos': data.strApellidos,
                'correo': data.strCorreo,
                'scholar': data.strScholarId,
            }
        }catch(err){
            return {"error": true, "message": "no se pudo obtener la información del investigador"};
        }
    }

    async getContratoByScopusId(scopusId){
        const uri = `${this.investigacionURL}/GetContratoByScopusId/${scopusId}`;

        try{
            const response = await fetch(uri);
            const data = await response.json();
            return {
                'cedula': data.strIdentificacion,
                'nombres': data.strNombres,
                'apellidos': data.strApellidos,
                'sexo': data.strSexo,
                'correo': data.strCorreo,
                'scholar': data.strScholarId,
                scopusId
            }
        }catch(err){
            return {"error": true, "message": "no se pudo obtener la información del investigador", scopusId};
        }
    }

    async getContratosByScopusId(scopusIdArr){
        
        let contratos = await Promise.all(
            scopusIdArr.map(async (scopusId) => this.getContratoByScopusId(scopusId))
        )

        contratos = contratos.filter(contrato => contrato!=undefined);
        contratos = contratos.filter(contrato => !contrato.error);

        return contratos;
    }

    async getAuthorsByKeywords(keywords){
        
        const uri = `${this.investigacionURL}/GetProyectosByKeyword/${keywords}`;
        var listaInv = {}
        try{
            const response = await fetch(uri, {redirect: 'follow'}); 
            
          
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
            console.log(err, keywords)
            return {"error": true, "message": "No se pudo obtener la información de investigadores con estas palabras claves", keywords};
        }
    }

    async getPhotoByUserName(username){
        const uri = `${this.carnetURL}/GetFotoPerfil?netid=${username}`;
        try{
            const response = await fetch(uri);
            const data = await response.json();
            return {srcFoto:data.fotoString};
        }catch(err){
            return {"error": true, "message": "no se pudo obtener la foto del investigador"};
        }
    }

    async getPerfilByOrcid(orcid){
        try{
            const contrato = await this.getContratoByOrcid(orcid);
            const foto = await this.getPhotoByUserName(contrato.correo.split('@')[0]);
            return {...contrato, foto, correo: `${contrato.correo.split('@')[0]}[at]espol.edu.ec`};
        }catch(err){
            return {"error": true, "message": "no se pudo obtener la información del investigador"};
        }
    }

    async getPerfilByScopusId(scopusId){
        try{
            const contrato = await this.getContratoByScopusId(scopusId);
            const foto = await this.getPhotoByUserName(contrato.correo.split('@')[0]);
            return {...contrato, foto, correo: `${contrato.correo.split('@')[0]}[at]espol.edu.ec`};
        }catch(err){
            return {"error": true, "message": "no se pudo obtener la información del investigador"};
        }
    }
}

module.exports = Gtsi;