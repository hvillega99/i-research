class Datajson{

    constructor(){
        this.jsondatos = require("../resources/data/mySciVal_Researchers_Export.json");
        this.facultades = require("../resources/data/unidadesAcademicas.json");
        this.centros = require("../resources/data/centros.json");
    }

    busquedaNombre(nombre){    
        const nombres = []
        return this.jsondatos.filter( resultado =>
            {  
                if(resultado["Author"].toLocaleLowerCase().includes(nombre.toLocaleLowerCase())){
                    if(nombres.indexOf(resultado["Author"])==-1){
                        nombres.push(resultado["Author"])
                        return true;
                    }
                }
                return false;
            }
        )
    }

    busquedaFacultad(nombre){
        //return this.facultades.filter(facultad => facultad.nombre.includes(nombre.toLocaleUpperCase()));
        let facFiltradas = this.facultades.filter(function (currentElement) {
            if(currentElement.nombre.includes(nombre.toLocaleUpperCase()) || currentElement.nombreCompleto.toLocaleUpperCase().includes(nombre.toLocaleUpperCase())){
                return true;
            }
            else{
                return false;
            }
        });
        return facFiltradas;
    }

    busquedaCentro(nombre){
        return this.centros.filter(centro => centro.nombre.includes(nombre.toLocaleUpperCase()));
    }

    getInformacionUnidad(nombre){
        return this.facultades.find(facultad => facultad.nombre == nombre.toLocaleUpperCase());
    }

    getInformacionCentro(nombre){
        return this.centros.find(centro => centro.nombre == nombre.toLocaleUpperCase());
    }

    getInvestigadores(nombre){
        const arr = [];
        const result = this.jsondatos.filter(item => {
            if(item['Level 3'] == nombre.toLocaleUpperCase() && !arr.includes(item["Scopus Author ID"])){
                arr.push(item["Scopus Author ID"]);
                return true;
            }
            return false;
        });

        return result.map(item => ({autor: item['Author'], id: item["Scopus Author ID"]}));
    }

    getNameAndAffiliations(scopusId){
        const data = this.jsondatos.filter( resultado =>  resultado["Scopus Author ID"]==scopusId);
        let result = data.map(item => item['Level 3']);
        result = [...new Set(result)];
        
        const affiliations = {
            unidades: result.filter(item => this.facultades.find(element => element.nombre == item)),
            centros: result.filter(item => this.centros.find(element => element.nombre == item))
        }

        return {
            'name': data[0]['Author'],
            'affiliations': affiliations
        };
    }

    getAllScopusId(){
        let arrScopusId = this.jsondatos.map(item => item["Scopus Author ID"]);
        arrScopusId = [...new Set(arrScopusId)];
        return arrScopusId;
    }
}

module.exports = Datajson;