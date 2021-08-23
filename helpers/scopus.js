const fetch = require('node-fetch');
const convert = require('xml-js');

class Scopus{

    constructor(){
        this.uri = "https://api.elsevier.com/content/author/";
        this.apiKey = "d2f270ed229df1d1aa750351fa2c101b";
    }

    async getOrcidAndCounts(scopusId){
        const response = await fetch(`${this.uri}author_id/${scopusId}?apiKey=${this.apiKey}`);
        const xml = await response.text();
        const text = convert.xml2json(xml, {compact: true, spaces: 4});
        const data =  JSON.parse(text)['author-retrieval-response'];
        return {
            orcid: data.coredata.orcid._text,
            documentos: data.coredata['document-count']._text,
            citas: data.coredata['citation-count']._text,
        }
    }

    async getHindex(scopusId){
        const response = await fetch(`${this.uri}author_id/${scopusId}?apiKey=${this.apiKey}&view=metrics`);
        const xml = await response.text();
        const text = convert.xml2json(xml, {compact: true, spaces: 4});
        const data = JSON.parse(text)['author-retrieval-response'];
        return data['h-index']._text;
    }

    async getSubjectAreas(scopusId){

    }

}

module.exports = Scopus;