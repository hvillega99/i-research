const fetch = require('node-fetch');

class Scopus{

    constructor(){
        this.uri = "https://api.elsevier.com/content/author/";
        this.apiKey = "d65494974182038129c6a7821afc8b56";
    }

    async getDataAndAreas(scopusId){

        const url = `${this.uri}author_id/${scopusId}?apiKey=${this.apiKey}`;
        const response = await fetch(url,{
            headers:{'Accept': 'application/json'}
        });

        const information = await response.json();
        const data = information['author-retrieval-response'][0].coredata;
        const areas = information['author-retrieval-response'][0]['subject-areas']['subject-area'];

        return {
            orcid: data.orcid,
            documentos: data['document-count'],
            citas: data['citation-count'],
            areas: areas.map(item => item['$']).slice(0,6)
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

    async getMetrics(scopusId){

        const url = `${this.uri}author_id/${scopusId}?apiKey=${this.apiKey}&view=metrics`;
        const response = await fetch(url,{
            headers:{'Accept': 'application/json'}
        });

        let data = await response.json();
        data = data['author-retrieval-response'][0]['coredata'];

        const result = {
            id: scopusId,
            publications: data['document-count'],
            citations: data['citation-count']
        }

        return result;

        /*const results = [];
        for(let i=0; i<arrId.length; i++){

            const scopusId = arrId[i];
            const url = `${this.uri}author_id/${scopusId}?apiKey=${this.apiKey}&view=metrics`;

            const response = await fetch(url,{
                headers:{'Accept': 'application/json'}
            });

            let data = await response.json();
            data = data['author-retrieval-response'][0]['coredata'];
            const result = {
                id: scopusId,
                publications: data['document-count'],
                citations: data['citation-count']
            }
            results.push(result);
       }

       console.log(results);*/
    }

    async getPublicationsId(scopusId){
        const url = `http://api.elsevier.com/content/search/scopus?query=AU-ID(${scopusId})&apiKey=${this.apiKey}`;
        const response = await fetch(url,{
            headers:{'Accept': 'application/json'}
        });
        const information = await response.json();
        var plop = []
        information['search-results']["entry"].forEach(element => plop.push(element['dc:identifier'].split(':')[1]));
        return plop;
    }

}

module.exports = Scopus;