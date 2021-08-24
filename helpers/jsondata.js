class Datajson{

    constructor(){
        this.jsondatos = require("../public/data/mySciVal_Researchers_Export.json");
    }

    busquedaNombre(nombre){    
        let nombres = []
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

    busquedaId(scopuID){
        return this.jsondatos.filter( resultado =>  resultado["Scopus Author ID"]==scopuID )
    }


}

module.exports = Datajson;