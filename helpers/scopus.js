const fetch = require('node-fetch');

class Scopus{

    constructor(){
        this.uri = "https://api.elsevier.com/content/author/";
        this.apiKey = "d2f270ed229df1d1aa750351fa2c101b";
    }

    async getOrcidAndCounts(scopusId){
        const url = `${this.uri}author_id/${scopusId}?apiKey=${this.apiKey}`;
        const response = await fetch(url,{
            headers:{'Accept': 'application/json'}
        });

        let data = await response.json();
        data = data['author-retrieval-response'][0].coredata;

        return {
            orcid: data.orcid,
            documentos: data['document-count'],
            citas: data['citation-count']
        };
    }

    async getHindex(scopusId){
        const url = `${this.uri}author_id/${scopusId}?apiKey=${this.apiKey}&view=metrics`;
        const response = await fetch(url,{
            headers:{'Accept': 'application/json'}
        });

        let data = await response.json();
        data = data['author-retrieval-response'][0]['h-index'];

        return data;
    }

    async getSubjectAreas(scopusId){

    }

}

module.exports = Scopus;