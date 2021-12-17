const fs = require('fs');
const parser = require('csv-parser');

class CsvParser{

    readDocumentsByArea(path){

        return new Promise((resolve, reject) => {
            const data = [];
            fs.createReadStream(path)
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