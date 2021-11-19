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

    async getMetrics(idArr){

        const url = `${this.uri}author_id/${idArr}?apiKey=${this.apiKey}&view=metrics`;
        const response = await fetch(url,{
            headers:{'Accept': 'application/json'}
        });
       
        const data = await response.json();
    
        return data['author-retrieval-response-list']['author-retrieval-response'];

        
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

   

    async getTopics(scopusId){
        const url = `http://api.elsevier.com/content/search/scopus?query=AU-ID(${scopusId})&apiKey=${this.apiKey}`;
        const response = await fetch(url,{
            headers:{'Accept': 'application/json'}
        });
        const information = await response.json();
        var plop = [];
        var plop2 = [];
        information['search-results']["entry"].forEach(async (element) => 
            {
                const publicationID = element['dc:identifier'].split(':')[1];
                plop.push(publicationID);
            }
            );
        var mapa = {}
        for await (let publicationID of plop){
            const endpoint2 = `https://api.elsevier.com/analytics/scival/publication/${publicationID}?apiKey=${this.apiKey}&httpAccept=application/json`;
            const response2 = await fetch(endpoint2);
            const data = await response2.json();
            const topicID = await data.publication.topicId;
            const endpoint3 = `https://api.elsevier.com/analytics/scival/topic/${topicID}?apiKey=${this.apiKey}`;
            const response3 = await fetch(endpoint3);
            const data3 = await response3.json();
            const nametopics = await data3.topic.name
            if(nametopics in mapa){
                mapa[nametopics]++;
            }
            else{
                mapa[nametopics]=1;
            }

        }

        
        return mapa;

    }

    async getPublicationsTitle(scopusId){
        const url = `http://api.elsevier.com/content/search/scopus?query=AU-ID(${scopusId})&apiKey=${this.apiKey}`;
        const response = await fetch(url,{
            headers:{'Accept': 'application/json'}
        });
        const information = await response.json();
        var plop = []
        information['search-results']["entry"].forEach(element => {
            
            var plop2 = [];
            
            var title= element['dc:title'];
            var citation = element['citedby-count'];
            
            var year = element['prism:coverDate'].split('-')[0]
            
            plop2.push(title);
            plop2.push(citation);

            plop2.push(year)

            plop.push(plop2);



        }
        );
        return plop;
    }

    async getPublicationsTitle2(scopusId){  
        var flag=0;
        var count = 1;
        var inicio=0;
        var plop = []
        while(flag==0){
            const url = `http://api.elsevier.com/content/search/scopus?query=AU-ID(${scopusId})&start=${inicio}&apiKey=${this.apiKey}`;
            const response = await fetch(url,{
                headers:{'Accept': 'application/json'}
            });
            const information = await response.json();
            var number = information['search-results']['opensearch:totalResults'];
            var iteraciones = Math.ceil(number/25);
            information['search-results']["entry"].forEach(element => {
                
                var plop2 = [];
            
                var title= element['dc:title'];
                var citation = element['citedby-count'];
                
                var year = element['prism:coverDate'].split('-')[0]
                
                plop2.push(title);
                plop2.push(citation);
    
                plop2.push(year)
    
                plop.push(plop2);
                
            }
            );
            inicio+=25;
            count+=1;
            if(count>iteraciones){
                flag+=1;
            }
          
        }
        return plop;
    }


    /*
    async getPublicationsTitle2(scopusId){  
        var flag=0;
        var count = 1;
        var espol = 0;
        var inicio=0;
        while(flag==0){
            const url = `http://api.elsevier.com/content/search/scopus?query=AU-ID(${scopusId})&start=${inicio}&apiKey=${this.apiKey}`;
            const response = await fetch(url,{
                headers:{'Accept': 'application/json'}
            });
            const information = await response.json();
            console.log(information);
            var number = information['search-results']['opensearch:totalResults'];
            var iteraciones = Math.ceil(number/25);
            information['search-results']["entry"].forEach(element => {
                
                element['affiliation'].forEach(institution =>{
                    if(institution['affilname']=='Escuela Superior Politecnica del Litoral Ecuador'){
                        espol+=1;
                    }
                } )
                
            }
            );
            inicio+=25;
            count+=1;
            if(count>iteraciones){
                flag+=1;
            }
          
        }
        return espol;
    }
    */

   

}

module.exports = Scopus;