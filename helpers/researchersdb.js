const CsvParser = require('./csvParser');
const Unitsdb = require('./unitsdb');
const Centersdb = require('./centersdb');

const unitsdb = new Unitsdb();
const centersdb = new Centersdb();
const parser = new CsvParser();

/**
 * Clase para manejar los investigadores
 */

class Researchersdb{

    static instance;

    /**
     * 
     * Constructor de la clase
     */

    constructor(){

        if(!!Researchersdb.instance){
            return Researchersdb.instance;
        }

        this.researchers = []
        parser.getResearchers()
        .then(data => {
            this.researchers = data;
        })
        
        Researchersdb.instance = this;
    }

    /**
     * Actualiza investigadores
     */

    async update(){
        this.researchers = await parser.getResearchers();
    }

    /**
     * Busca investigador por Scopus ID
     * @param {String} scopusId Scopus ID del investigador
     * @returns {{autor: String, scopusId: String, afiliaciones: {unidades: String[], centros: String[]}}}
     */

    searchById(scopusId){
        const result = this.researchers.find(e => e['Scopus Author ID'] == scopusId);
        
        if(result){
            return {
                autor: result['Author'], 
                scopusId: result["Scopus Author ID"],
                afiliaciones: this.getNameAndAffiliations(result["Scopus Author ID"]).affiliations
            }
        }else{
            return undefined;
        }
    }

   /**
    * Busca investigador por nombre
    * @param {String} name Nombre del investigador
    * @returns {Array<{autor: String, scopusId: String, afiliaciones: {unidades: String[], centros: String[]}}>}
    */

    searchByName(name){    
        const nombres = []
        let results = this.researchers.filter( resultado =>
            {   
                
                let terms = name.trim().replace('.', '');
                terms = terms.split(' ');
                const condition = terms.every(term => resultado['Author'].toLocaleLowerCase().includes(term.toLocaleLowerCase()));

                if(condition){
                    if(nombres.indexOf(resultado["Author"])==-1){
                        nombres.push(resultado["Author"])
                        return true;
                    }
                }
                return false;
            }
        )

        results = results.map(item => ({
            autor: item['Author'], 
            scopusId: item["Scopus Author ID"],
            afiliaciones: this.getNameAndAffiliations(item["Scopus Author ID"]).affiliations
        }));

        return results;
    }

    /**
     * Devuelve todos los investigadores de la unidad
     * @param {String} unit Nombre de la unidad
     * @returns {Array<{autor: String, id: String}>}
     */

    getResearchersByUnit(unit){
        const arr = [];
        const data = this.researchers.filter(item => {
            if(item['Level 3'].trim() == unit.toLocaleUpperCase() && !arr.includes(item["Scopus Author ID"])){
                arr.push(item["Scopus Author ID"]);
                return true;
            }
            return false;
        });

        const result = data.map(item => ({autor: item['Author'], id: item["Scopus Author ID"]}));

        result.sort((x, y) =>  x['autor'].localeCompare(y['autor'], {ignorePunctuation: true}));

        return result;
    }

    /**
     * Devuelve las unidades a las que pertenece el investigador
     * @param {String} scopusId Scopus ID del investigador
     * @returns {{name: String, affiliations: {unidades: String[], centros: String[]}}}
     */

    getNameAndAffiliations(scopusId){
        const data = this.researchers.filter( resultado =>  resultado["Scopus Author ID"]==scopusId);
        let result = data.map(item => item['Level 3']);
        result = [...new Set(result)];
        
        const affiliations = {
            unidades: result.filter(item => unitsdb.units.find(element => element.nombre == item)),
            centros: result.filter(item => centersdb.centers.find(element => element.nombre == item))
        }

        return {
            'name': data[0]['Author'],
            'affiliations': affiliations
        };
    }

    /**
     * Devuelve los Scopus Id de todos los investigadores
     * @returns {Array<String>}
     */

    getAllScopusId(){
        let arrScopusId = this.researchers.map(item => item["Scopus Author ID"]);
        arrScopusId = [...new Set(arrScopusId)];
        return arrScopusId;
    }
}

module.exports = Researchersdb;