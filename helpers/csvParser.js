const fs = require('fs');
const path = require('path');
const parser = require('csv-parser');

const Resourcesdb = require('./resourcesdb');
const resources = new Resourcesdb();

class CsvParser{

    static instance;
    
    constructor(){

        if(!!CsvParser.instance){
            return CsvParser.instance;
        }

        CsvParser.instance = this;
    }

    getResearchers(){

        const researchersPath = `${resources.files.path}${resources.files.researchers}`;

        return new Promise((resolve, reject) => {
            fs.exists(researchersPath,(e) => {
                if(e){
                    const data = [];
                    fs.createReadStream(researchersPath)
                        .pipe(parser({
                            separator: ',',
                            newline: '\n',
                            skipLines: 1,
                            headers: ["Author","Scopus Author ID","Tags",
                                    "Level 1","Level 2","Level 3","Level 4",
                                    "Level 5","Level 6","Level 7","Level 8",
                                    "Level 9","Level 10"]
                        }))                       
                        .on('data', row => data.push(row))
                        .on('end', () => resolve(data))
                        .on('error',() => reject(new Error('No se pudo leer el archivo')))
                }else{
                    reject(new Error('No se pudo leer el archivo'));
                }
            });
        })


    }

    getDocumentsByArea(){

        const documentsPath = `${resources.files.path}${resources.files.documents}`;

        return new Promise((resolve, reject) => {
            fs.exists(documentsPath,(e) => {

                if(e){
                    const data = [];
                    fs.createReadStream(documentsPath)
                        .pipe(parser({
                            separator: ',',
                            newline: '\n',
                            skipLines: 8,
                            headers: ["Subject areas","Documents"]
                        }))
                        .on('data', row => data.push(row))
                        .on('end', () => resolve(data))
                        .on('error',() => reject(new Error('No se pudo leer el archivo')))
                }else{
                    reject(new Error('No se pudo leer el archivo'));
                }
            })
        })
    }
}

module.exports = CsvParser;