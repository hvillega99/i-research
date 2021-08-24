class Datajson{

    constructor(){
        this.jsondatos = require("../public/data/mySciVal_Researchers_Export.json");
    }

    busquedaNombre(nombre){

        let  data = []
        let nombres = []

        for(let resultado of this.jsondatos){
            //Con el archivo original
            if(resultado["Author"]==nombre){
            //Con el archivo pulido (autores no repetidos) //
            //if(resultado["Autor"]==terms){
                
                //Esto se lo puede usar (diccionario) en caso de que se necesite la informacion
                /*
                let nombre = resultado["Author"]
                let scopuID = resultado["Scopus Author ID"]
                let v = {
                    "Author" : nombre,
                    "Scopus Author ID" : scopuID
                }*/
                if(nombres.indexOf(resultado["Author"])==-1){
                    nombres.push(resultado["Author"])
                    data.push(resultado);
                    console.log(resultado);
                }
            }
        }

        return data;
    }

    

}

module.exports = Datajson;