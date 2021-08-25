class Datajson{

    constructor(){
        this.jsondatos = require("../public/data/mySciVal_Researchers_Export.json");
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

    getNameAndAffiliations(scopusId){
        const data = this.jsondatos.filter( resultado =>  resultado["Scopus Author ID"]==scopusId);
        let affiliations = data.map(item => item['Level 3']);
        affiliations = [...new Set(affiliations)];
        return {
            'name': data[0]['Author'],
            'affiliations': affiliations
        };
    }


}

module.exports = Datajson;