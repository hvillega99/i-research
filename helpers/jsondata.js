class Datajson{

    constructor(){
        this.jsondatos = require("../public/data/mySciVal_Researchers_Export.json");
    }

    busquedaNombre(nombre){

        let  data = []
        let nombres = []

        for(let resultado of this.jsondatos){
            //Con el archivo original
            //En este caso tendrias que poner nombres o apellidos con mayusculas en la primera letra (Case Sensitive)
            //if(resultado["Author"].includes(nombre)){
            if(resultado["Author"].toLocaleLowerCase().includes(nombre.toLocaleLowerCase())){
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

    busquedaId(scopuID){

        //let  data = []
        //let nombres = []
        //let mapa= new Map();
        var vacio ={};

        for(let resultado of this.jsondatos){

            if(resultado["Scopus Author ID"]==scopuID){
                if(resultado["Level 2"]=="Unidades Académicas"){
                    console.log(resultado);
                    var result = {
                        'nombre' : resultado["Author"],
                        'facultad' : resultado["Level 3"]
                    }
                    return result;
                }
                
                //mapa.set(resultado["Scopus Author ID"],resultado["Author"])

                /*if(nombres.indexOf(resultado["Author"])==-1){
                    nombres.push(resultado["Author"])
                    data.push(resultado);
                    console.log(resultado);
                }*/
            }
        }

        return vacio;
    }

    

}

module.exports = Datajson;