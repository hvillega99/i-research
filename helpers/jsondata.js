class Datajson{

    constructor(){
        this.jsondatos = require("../public/data/mySciVal_Researchers_Export.json");
    }

    busquedaNombre(nombre){

        let  data = []
        let nombres = []

        //const  nombres2= this.jsondatos.filter( resultado =>  resultado["Author"].toLocaleLowerCase().includes(nombre.toLocaleLowerCase()))
        for(let resultado of this.jsondatos){
            if(resultado["Author"].toLocaleLowerCase().includes(nombre.toLocaleLowerCase())){
                if(nombres.indexOf(resultado["Author"])==-1){
                    nombres.push(resultado["Author"])
                    data.push(resultado);
                }
            }
        }

        return data;
    }
    

    busquedaId(scopuID){
        return this.jsondatos.filter( resultado =>  resultado["Scopus Author ID"]==scopuID )
    }


}

module.exports = Datajson;