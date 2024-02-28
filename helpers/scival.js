const fetch = require('node-fetch');
const Resourcesdb = require('./resourcesdb');
const resources = new Resourcesdb();
const logger = require('../logger');
/**
 * Clase para manejar las consultas a Scival
 */

class Scival{

    /**
     * Constructor de la clase
     */
    
    constructor(){
        this.uri = "https://api.elsevier.com/analytics/scival/author/metrics?";
        this.uriInstitution = "https://api.elsevier.com/analytics/scival/institution/metrics?"
    }

    /**
     * Devuelve la informacion de una peticion realizada al servicio de Scival
     * 
     * @param {String} urlX Url de la peticion que se realizara al servicio de Scival
     * @returns {Promise<Object>} Respuestas de la peticion realizada a Scival, con el url especificado
     */

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

    /**
     * Devuelve el número de publicaciones de la institución en journals top
     * @param {String} insIs Id de la institución
     * @returns {Promise<Array<Object>>} Publicaciones por año de la institución en journals top
     */
    async getPublicationsInTopJournalPercentiles(instId){
        const url = `${this.uriInstitution}metricTypes=PublicationsInTopJournalPercentiles&institutionIds=${instId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&`; 
        let data;
        try {
            data = await this.comunX(url);
            data = data["results"][0]["metrics"][0]["values"];
        }catch(err){
            logger.error('scival.getPublicationsInTopJournalPercentiles. Error en API Scival institution metrics. '+err);
            data = {"error": true, "message": "servicio no disponible"};
        }

        return data;
    }

    /**
     * Devuelve el número de citas de las publicaciones de los últimos 6 años de la institución
     * @param {String} insIs Id de la institución
     * @returns {Promise<Array<Object>>} Citas por año de la institución
     */
    async getInstitutionCitations(insId){
        const url = `${this.uriInstitution}metricTypes=CitationCount&institutionIds=${insId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&`;
        let data;
        try{
            data = await this.comunX(url);
            data = data["results"][0]["metrics"][0]["valueByYear"]
        }catch(err){
            logger.error('scival.institutionCitations. Error en API Scival institution metrics. '+err);
            data = {"error": true, "message": "servicio no disponible"};
        }
        
        return data;
    }

    /**
     * Devuelve el número de publicaciones de los últimos 6 años de la institución
     * @param {String} insIs Id de la institución
     * @returns {Promise<Array<Object>>} Publicaciones por año de la institución
     */
    async getInstitutionPublications(insId){
        const url = `${this.uriInstitution}metricTypes=ScholarlyOutput&institutionIds=${insId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&`;
        let data;
        try{
            data = await this.comunX(url);
            data = data["results"][0]["metrics"][0]["valueByYear"]
        }catch (err) {
            logger.error('scival.getInstitutionPublications. Error en API Scival institution metrics. '+err);
            data = {"error": true, "message": "servicio no disponible"};
        }
        return data;
    }

    /**
     * Devuelve el H Index de un grupo de investigadores
     * @param {Array<String>} scopusIdArr Arreglo de Scopus Id de los investigadores
     * @returns {Promise<Object>} H Index por investigadores
     */
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
            logger.error('scival.getHIndexAll. Error en API Scival author metrics. '+err);
            return {"error": true, "message": "servicio no disponible"};
        }
        

    }
    
    /**
     * Devuelve el H5 Index de un investigador
     * @param {String} scopus Scopus Id del investigador
     * @returns {Promise<Number>} H5 Index del investigador
     */
    async getH5index(scopusId){
        const url = `${this.uri}metricTypes=HIndices&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=h5Index&`
        try{
            const data = await this.comunX(url);
            const values = data.results[0].metrics[0].valueByYear;
            const keys = Object.keys(values);
            return values[keys[keys.length - 1]];
        }catch(err){
            logger.error('scival.getH5index. Error en API Scival author metrics. '+err);
            return -1;
        }
    }

    /**
     * Devuelve el FCWI de un investigador
     * @param {String} scopus Scopus Id del investigador
     * @returns {Promise<Number>} FCWI del investigador
     */
    async getFCWI(scopusId){
        const url = `${this.uri}metricTypes=FieldWeightedCitationImpact&authors=${scopusId}&yearRange=3yrs&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&`;    
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
            logger.error('scival.getFCWI. Error en API Scival author metrics. '+e);
            return -1;
        }

    }

    /**
     * Devuelve el número de publicaciones de los últimos 6 años de un investigador
     * @param {String} scopusId Scopus Id del investigador
     * @returns {Promise<Array<Object>>} Publicaciones por año
     */
    async getPublications(scopusId){
        const url = `${this.uri}metricTypes=ScholarlyOutput&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=hIndex&`;
        try{
            const data = await this.comunX(url);
            const values = data.results.map(item => item.metrics[0].valueByYear);
            return values;
        }catch (err) {
            logger.error('scival.getPublications. Error en API Scival author metrics. '+err);
            return {"error": true, "message": "servicio no disponible"};
        }
    }

    /**
     * Devuelve el número de citas de las publicaciones de los últimos 6 años de un investigador
     * @param {String} scopusId Scopus Id del investigador
     * @returns {Promise<Array<Object>>} Citas por año
     */
    
    async getCitations(scopusId){
        const url = `${this.uri}metricTypes=CitationCount&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=hIndex&`;
        try{
            const data = await this.comunX(url);
            const values = data.results.map(item => item.metrics[0].valueByYear);
            return values;
        }catch (err) {
            logger.error('scival.getCitations. Error en API Scival author metrics. '+err);
            return {"error": true, "message": "servicio no disponible"};
        }
    }

}

module.exports = Scival;