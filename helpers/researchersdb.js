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
                
                let terms = name.replace('.', '');
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
    }

    getResearchersByUnit(unit){
        const arr = [];
        const data = this.researchers.filter(item => {
            if(item['Level 3'] == unit.toLocaleUpperCase() && !arr.includes(item["Scopus Author ID"])){
                arr.push(item["Scopus Author ID"]);
                return true;
            }
            return false;
        });

        const result = data.map(item => ({autor: item['Author'], id: item["Scopus Author ID"]}));

        result.sort((x, y) =>  x['autor'].localeCompare(y['autor'], {ignorePunctuation: true}));

        return result;
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