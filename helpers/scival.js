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
        const endpoint = `${this.uri}metricTypes=FieldWeightedCitationImpact&authors=${scopusId}&yearRange=3yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&apiKey=${this.apiKey}`
        
        const response = await fetch(endpoint);
        const data = await response.json();

        const values = data.results[0].metrics[0].valueByYear;
        const keys = Object.keys(values);

        return values[keys[keys.length - 1]];
    }

}

module.exports = Scival;