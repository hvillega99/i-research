const fetch = require('node-fetch');
const Resourcesdb = require('./resourcesdb');
const resources = new Resourcesdb();

class Scopus{

    constructor(){
        this.uri = "https://api.elsevier.com/content/author/";
    }

    //Usado
    async getDataAndAreas(scopusId){

        const apiKey = resources.getApiKey();

        try{
            const url = `${this.uri}author_id/${scopusId}?apiKey=${apiKey}`;
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
        }catch (err) {
            console.log(err);
            return {
                orcid: -1,
                documentos: -1,
                citas: -1,
                areas: -1,
                error: true,
                message: 'servicio no disponible'
            };
        }
    }
    
    //Usado
    async getHindex(scopusId){
        const apiKey = resources.getApiKey();
        try{
            const url = `${this.uri}author_id/${scopusId}?apiKey=${apiKey}&view=metrics`;
            const response = await fetch(url,{
                headers:{'Accept': 'application/json'}
            });
    
            let data = await response.json();
            data = data['author-retrieval-response'][0]['h-index'];
    
            return data;
        }catch (err) {
            return -1
        }
    }

    async getMetrics(idArr){
        const apiKey = resources.getApiKey();
        try {
            const url = `${this.uri}author_id/${idArr}?apiKey=${apiKey}&view=metrics`;
            const response = await fetch(url,{
                headers:{'Accept': 'application/json'}
            });
           
            const data = await response.json();
        
            return data['author-retrieval-response-list']['author-retrieval-response'];
        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }  
    }

    async getPublicationsId(scopusId){
        const apiKey = resources.getApiKey();
        const url = `http://api.elsevier.com/content/search/scopus?query=AU-ID(${scopusId})&apiKey=${apiKey}`;
        const response = await fetch(url,{
            headers:{'Accept': 'application/json'}
        });
        const information = await response.json();
        var plop = []
        information['search-results']["entry"].forEach(element => plop.push(element['dc:identifier'].split(':')[1]));
        return plop;
    }

   

    async getTopics(scopusId){
        const apiKey = resources.getApiKey();
        const url = `http://api.elsevier.com/content/search/scopus?query=AU-ID(${scopusId})&apiKey=${apiKey}`;
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
            const endpoint2 = `https://api.elsevier.com/analytics/scival/publication/${publicationID}?apiKey=${apiKey}&httpAccept=application/json`;
            const response2 = await fetch(endpoint2);
            const data = await response2.json();
            const topicID = await data.publication.topicId;
            const endpoint3 = `https://api.elsevier.com/analytics/scival/topic/${topicID}?apiKey=${apiKey}`;
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
        const apiKey = resources.getApiKey();

        const url = `http://api.elsevier.com/content/search/scopus?query=AU-ID(${scopusId})&apiKey=${apiKey}`;
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
        const apiKey = resources.getApiKey();

        try{
            var flag=0;
            var count = 1;
            var inicio=0;
            var plop = []
            while(flag==0){
                const url = `http://api.elsevier.com/content/search/scopus?query=AU-ID(${scopusId})&start=${inicio}&apiKey=${apiKey}`;
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
                    var elscopus = element['dc:identifier'].split(':')[1];
                    
                    plop2.push(title);
                    plop2.push(citation);
        
                    plop2.push(year);
                    plop2.push(elscopus);
        
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
        }catch(err){
            return -1;
        }
    }
    
    async getCoauthors(arrayIds,elID){

        var flag=0;
        const plop = {};
        const plop2 = [];
        var inicio = 0;
        var fin = arrayIds.length;
        var size = arrayIds.length;
        
        if(fin>25){
            fin = 25;
        }

        while(flag==0){        
            const url = `https://bibliometrics.pythonanywhere.com/decinv/${arrayIds.slice(inicio, fin)}/citation_overview/`;
            const response = await fetch(url,{
                headers:{'Accept': 'application/json'}
            });
            const information = await response.json();
            information['abstract-citations-response']['citeInfoMatrix']['citeInfoMatrixXML']['citationMatrix']['citeInfo'].forEach(element => {
                element['author'].forEach(e => {
                    if(e['authid']!=elID){
                        plop[e['authid']] = e['index-name'];
                    }
                });
            });

            if(fin==size){
                flag+=1;
            }
            else{//aumentar lo debido
                inicio = fin;
                var cuentaF = size - inicio;

                if(cuentaF>25){
                    fin= inicio + 25;
                }
                else{
                    fin = size;
                }
                
            }
            
        }

        for (var i in plop){
            plop2.push({'id': i, 'author': plop[i] });
        }
        return plop2 ;
    }
   
    //Usado
    async getInfoPublications(scopusID){
        const apiKey = resources.getApiKey();

        try{

            const url = `http://api.elsevier.com/content/abstract/scopus_id/${scopusID}?field=authors,title,publicationName,volume,issueIdentifier,prism:pageRange,coverDate,article-number,doi,citedby-count,prism:aggregationType&apiKey=${apiKey}`;
            const response = await fetch(url,{
                headers:{'Accept': 'application/json'}
            });
            const information = await response.json();
            var plop = [];
            for(let x of information['abstracts-retrieval-response']['authors']['author']){
                plop.push(x['ce:indexed-name']);
            }
    
            var articlenum;
            if(information['abstracts-retrieval-response']['coredata']['prism:pageRange']){
                articlenum = information['abstracts-retrieval-response']['coredata']['prism:pageRange'];
            }
            else{
                articlenum = information['abstracts-retrieval-response']['coredata']['article-number'];
            }
            var respuesta = {
                "authors" : plop,
                "title" : information['abstracts-retrieval-response']['coredata']['dc:title'],
                "journal" : information['abstracts-retrieval-response']['coredata']['prism:publicationName'],
                "volume" : information['abstracts-retrieval-response']['coredata']['prism:volume'],
                "articlenum" : articlenum,
                "date" : information['abstracts-retrieval-response']['coredata']['prism:coverDate'],
                "doi" : information['abstracts-retrieval-response']['coredata']['prism:doi'],
                "cites" : information['abstracts-retrieval-response']['coredata']['citedby-count']
            }
            
            return respuesta;
        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }
    }

}

module.exports = Scopus;