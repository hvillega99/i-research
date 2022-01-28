const CsvParser = require('./csvParser');
const Unitsdb = require('./unitsdb');
const Centersdb = require('./centersdb');

const unitsdb = new Unitsdb();
const centersdb = new Centersdb();
const parser = new CsvParser();

class Researchersdb{

    static instance;

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

    async update(){
        this.researchers = await parser.getResearchers();
    }

    searchById(scopusId){
        const result = this.researchers.find(e => e['Scopus Author ID'] == scopusId);
        return result;
    }
   

    searchByName(name){    
        const nombres = []
        return this.researchers.filter( resultado =>
            {  
                if(resultado["Author"].toLocaleLowerCase().includes(name.toLocaleLowerCase())){
                    if(nombres.indexOf(resultado["Author"])==-1){
                        nombres.push(resultado["Author"])
                        return true;
                    }
                }
                return false;
            }
        )
    }

    getResearchersByUnit(unit){
        const arr = [];
        const result = this.researchers.filter(item => {
            if(item['Level 3'] == unit.toLocaleUpperCase() && !arr.includes(item["Scopus Author ID"])){
                arr.push(item["Scopus Author ID"]);
                return true;
            }
            return false;
        });

        return result.map(item => ({autor: item['Author'], id: item["Scopus Author ID"]}));
    }

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

    getAllScopusId(){
        let arrScopusId = this.researchers.map(item => item["Scopus Author ID"]);
        arrScopusId = [...new Set(arrScopusId)];
        return arrScopusId;
    }
}

module.exports = Researchersdb;