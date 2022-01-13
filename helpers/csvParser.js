const fs = require('fs');
const parser = require('csv-parser');

class CsvParser{

    constructor(){
        this.documentsByAreaPath = './resources/data/documents by area.csv';
        this.researchersPath = './resources/data/researches.csv';
    }

    getResearchers(){
        return new Promise((resolve, reject) => {
            const data = [];
            fs.createReadStream(this.researchersPath)
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
                .on('error',() => reject)
        })
    }

    getDocumentsByArea(){

        return new Promise((resolve, reject) => {
            const data = [];
            fs.createReadStream(this.documentsByAreaPath)
                .pipe(parser({
                    separator: ',',
                    newline: '\n',
                    skipLines: 1,
                    headers: ["Subject areas","Documents"]
                }))
                .on('data', row => data.push(row))
                .on('end', () => resolve(data))
                .on('error',() => reject)
        })
    }
}

module.exports = CsvParser;