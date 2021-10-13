const fetch = require('node-fetch');

class Scival{

    constructor(){
        this.uri = "https://api.elsevier.com/analytics/scival/author/metrics?";
        this.apiKey = "d2f270ed229df1d1aa750351fa2c101b";
    }

    async getH5index(scopusId){
        const endpoint = `${this.uri}metricTypes=HIndices&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=h5Index&apiKey=${this.apiKey}`

        const response = await fetch(endpoint);
        const data = await response.json();

        const values = data.results[0].metrics[0].valueByYear;
        const keys = Object.keys(values);

        return values[keys[keys.length - 1]];
    }

    async getFCWI(scopusId){
        const endpoint = `${this.uri}metricTypes=FieldWeightedCitationImpact&authors=${scopusId}&yearRange=3yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&apiKey=${this.apiKey}`;
        
        const response = await fetch(endpoint);
        const data = await response.json();

        const values = data.results[0].metrics[0].valueByYear;
        const keys = Object.keys(values);

        return values[keys[keys.length - 1]];
    }

    async getPublications(scopusId){
        const endpoint = `${this.uri}metricTypes=ScholarlyOutput&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=hIndex&apiKey=${this.apiKey}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        //const values = data.results[0].metrics[0].valueByYear;
        const values = data.results.map(item => item.metrics[0].valueByYear);
        return values;
        //this.saveData(values, 'publicaciones.json');
    }
    
    async getCitations(scopusId){
        const endpoint = `${this.uri}metricTypes=CitationCount&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=hIndex&apiKey=${this.apiKey}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        //const values = data.results[0].metrics[0].valueByYear;
        const values = data.results.map(item => item.metrics[0].valueByYear);
        return values;
        //this.saveData(values, 'citaciones.json');
    }

    async getInfoPublications(publicationID){
        const endpoint = `https://api.elsevier.com/analytics/scival/publication/${publicationID}?apiKey=${this.apiKey}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.publication.topicId;
    }

    async getTopicName(topicID){
        const endpoint = `https://api.elsevier.com/analytics/scival/topic/${topicID}?apiKey=${this.apiKey}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.topic.name;
    }

    saveData(data, filename){
        var dictstring = JSON.stringify(data);
        var fs = require('fs');
        fs.writeFile(`./public/data/${filename}`, dictstring, function(err, result) {
            if(err) console.log('error', err);
        });
    }

}

module.exports = Scival;