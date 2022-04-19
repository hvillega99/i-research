const fetch = require('node-fetch');
const Resourcesdb = require('./resourcesdb');
const resources = new Resourcesdb();

class Scival{
    
    constructor(){
        this.uri = "https://api.elsevier.com/analytics/scival/author/metrics?";
        this.uriInstitution = "https://api.elsevier.com/analytics/scival/institution/metrics?"
    }

    async comunX(urlX){
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken();
        const url = `${urlX}apiKey=${apiKey}&insttoken=${insttoken}`;
        const response = await fetch(url,{
            headers: {
                "Accept": "application/json"
            },
            redirect: "follow"
        });
        const The_information = await response.json();
        return The_information;
    }

    //Usado
    async getPublicationsInTopJournalPercentiles(instId){
        const url = `${this.uriInstitution}metricTypes=PublicationsInTopJournalPercentiles&institutionIds=${instId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&`; 
        let data;
        try {
            data = await this.comunX(url);
            data = data["results"][0]["metrics"][0]["values"];
        }catch(err){
            data = {"error": true, "message": "servicio no disponible"};
        }

        return data;
    }

    //Usado
    async getInstitutionCitations(insId){
        const url = `${this.uriInstitution}metricTypes=CitationCount&institutionIds=${insId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&`;
        let data;
        try{
            data = await this.comunX(url);
            data = data["results"][0]["metrics"][0]["valueByYear"]
        }catch(err){
            data = {"error": true, "message": "servicio no disponible"};
        }
        
        return data;
    }

    //Usado
    async getInstitutionPublications(insId){
        const url = `${this.uriInstitution}metricTypes=ScholarlyOutput&institutionIds=${insId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&`;
        let data;
        try{
            data = await this.comunX(url);
            data = data["results"][0]["metrics"][0]["valueByYear"]
        }catch (err) {
            data = {"error": true, "message": "servicio no disponible"};
        }
        return data;
    }

    //Usado
    async getHIndexAll(scopusIdArr){
        const scopusId = scopusIdArr.join(',');
        const url = `${this.uri}metricTypes=HIndices&authors=${scopusId}&yearRange=5yrs&includeSelfCitations=true&byYear=false&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=hIndex&`
        try{
            let data = await this.comunX(url);
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
    
    //Usado
    async getH5index(scopusId){
        const url = `${this.uri}metricTypes=HIndices&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=h5Index&`
        try{
            const data = await this.comunX(url);
            const values = data.results[0].metrics[0].valueByYear;
            const keys = Object.keys(values);
            return values[keys[keys.length - 1]];
        }catch(err){
            return -1;
        }
    }

    //Usado
    async getFCWI(scopusId){
        const url = `${this.uri}metricTypes=FieldWeightedCitationImpact&authors=${scopusId}&yearRange=3yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&`;    
        try{
            const data = await this.comunX(url);
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

    //Usado
    async getPublications(scopusId){
        const url = `${this.uri}metricTypes=ScholarlyOutput&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=hIndex&`;
        try{
            const data = await this.comunX(url);
            const values = data.results.map(item => item.metrics[0].valueByYear);
            return values;
        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }
    }
    
    //Usado
    async getCitations(scopusId){
        const url = `${this.uri}metricTypes=CitationCount&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=hIndex&`;
        try{
            const data = await this.comunX(url);
            const values = data.results.map(item => item.metrics[0].valueByYear);
            return values;
        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }
    }

}

module.exports = Scival;