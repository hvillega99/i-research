const fetch = require('node-fetch');
const resources = require('../resources/resources.json');
const apiKey = require(`.${resources.path}${resources.apikey}`);

class Scival{
    
    constructor(){
        this.uri = "https://api.elsevier.com/analytics/scival/author/metrics?";
        this.uriInstitution = "https://api.elsevier.com/analytics/scival/institution/metrics?"
        this.apiKey = apiKey.key;
    }

    async getPublicationsInTopJournalPercentiles(instId){
        const url = `${this.uriInstitution}metricTypes=PublicationsInTopJournalPercentiles&institutionIds=${instId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&apiKey=${this.apiKey}`; 
        let data;
        
        try {
            const response = await fetch(url,{
                headers: {
                    "Accept": "application/json"
                },
                redirect: "follow"
            });
    
            data = await response.json();
            data = data["results"][0]["metrics"][0]["values"];
        }catch(err){
            data = {"error": true, "message": "servicio no disponible"};
        }


        return data;
    }

    async getInstitutionCitations(insId){
        const url = `${this.uriInstitution}metricTypes=CitationCount&institutionIds=${insId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&apiKey=${this.apiKey}`;
        let data;
        
        try{
            const response = await fetch(url,{
                headers: {
                    "Accept": "application/json"
                },
                redirect: "follow"
            });
    
            data = await response.json();
            data = data["results"][0]["metrics"][0]["valueByYear"]
        }catch(err){
            data = {"error": true, "message": "servicio no disponible"};
        }
        
        return data;
    }

    async getInstitutionPublications(insId){
        const url = `${this.uriInstitution}metricTypes=ScholarlyOutput&institutionIds=${insId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&apiKey=${this.apiKey}`;
        let data;

        try{
            const response = await fetch(url,{
                headers: {
                    "Accept": "application/json"
                },
                redirect: "follow"
            });
    
            data = await response.json();
            data = data["results"][0]["metrics"][0]["valueByYear"]
        }catch (err) {
            data = {"error": true, "message": "servicio no disponible"};
        }
        return data;
    }

    async getHIndexAll(scopusIdArr){
        const scopusId = scopusIdArr.join(',');
        const endpoint = `${this.uri}metricTypes=HIndices&authors=${scopusId}&yearRange=5yrs&includeSelfCitations=true&byYear=false&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=hIndex&apiKey=${this.apiKey}`

        try{
            const response = await fetch(endpoint);
            let data = await response.json();
    
            data = data['results'];
    
            const authors = data.map(result => {
                const h = result['metrics'][0]['value'];
                const name = result['author']['name'];
                const id = result['author']['id'];
                return {id, name, h}
            })
    
            return authors;
        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }
        

    }
    

    async getH5index(scopusId){
        const endpoint = `${this.uri}metricTypes=HIndices&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=h5Index&apiKey=${this.apiKey}`
        
        try{
            const response = await fetch(endpoint);
            const data = await response.json();
    
            const values = data.results[0].metrics[0].valueByYear;
            const keys = Object.keys(values);
    
            return values[keys[keys.length - 1]];
        }catch(err){
            return -1;
        }
    }

    async getFCWI(scopusId){
        const endpoint = `${this.uri}metricTypes=FieldWeightedCitationImpact&authors=${scopusId}&yearRange=3yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&apiKey=${this.apiKey}`;
        
        try{
            const response = await fetch(endpoint);
            const data = await response.json();
    
            const values = data.results[0].metrics[0].valueByYear;
            const keys = Object.keys(values);
            const fcwi = values[keys[keys.length - 1]];
    
            if(fcwi){
                return fcwi.toFixed(2);
            }
            return 0;
        }catch(e){
            return -1;
        }

    }

    async getPublications(scopusId){
        const endpoint = `${this.uri}metricTypes=ScholarlyOutput&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=hIndex&apiKey=${this.apiKey}`;

        try{
            const response = await fetch(endpoint);
            const data = await response.json();
    
            const values = data.results.map(item => item.metrics[0].valueByYear);
            return values;
        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }
    }
    
    async getCitations(scopusId){
        const endpoint = `${this.uri}metricTypes=CitationCount&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=hIndex&apiKey=${this.apiKey}`;

        try{
            const response = await fetch(endpoint);
            const data = await response.json();
    
            const values = data.results.map(item => item.metrics[0].valueByYear);
            return values;
        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }
    }

}

module.exports = Scival;