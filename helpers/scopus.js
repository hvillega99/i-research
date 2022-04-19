const fetch = require('node-fetch');
const Resourcesdb = require('./resourcesdb');
const resources = new Resourcesdb();
const sdgQueries = require('./sdgQueries');
//Pequeña prueba

class Scopus{

    constructor(){
        this.uri = "https://api.elsevier.com/content/";   
    }

    //Usado -
    async getDataAndAreas(scopusId){
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken();
        try{
            const url = `${this.uri}author/author_id/${scopusId}?apiKey=${apiKey}&insttoken=${insttoken}`;
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
    
    //Usado -
    async getHindex(scopusId){
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken();
        try{
            const url = `${this.uri}author/author_id/${scopusId}?apiKey=${apiKey}&insttoken=${insttoken}&view=metrics`;
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

    //Usado -
    async getMetrics(idArr){
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken();
        try {
            const url = `${this.uri}author/author_id/${idArr}?apiKey=${apiKey}&insttoken=${insttoken}&view=metrics`;
            const response = await fetch(url,{
                headers:{'Accept': 'application/json'}
            });
           
            const data = await response.json();
        
            return data['author-retrieval-response-list']['author-retrieval-response'];
        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }  
    }
   
    //Usado +
    async getPublicationsTitle(scopusId){
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken();  
        try{
            var flag=0;
            var count = 1;
            var inicio=0;
            var plop = []
            while(flag==0){
                const url = `${this.uri}search/scopus?query=AU-ID(${scopusId})&start=${inicio}&apiKey=${apiKey}&insttoken=${insttoken}`;
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
    
    //Usado +
    /**
     * Obtiene el número de publicaciones y citaciones de una unidad académica en un año determinado
     * @param {Array} arrayIDS - Array de Scopus ID de los investigadores de la unidad
     * @param {Number} year - Año de la búsqueda
     * @returns 
     */
    async getNPublications(arrayIDS, year){     
        //Concatenacion de los ID'S de los investigadores de una facultad o centro en especifico
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken();
        var xlr = 1;
        var designio = ''
        arrayIDS.forEach(dato => {
            if(xlr!=arrayIDS.length){
                var tetra = `AU-ID(${dato}) OR `
                designio+= tetra
                xlr++;
            }
            else{
                var tetra2 = `AU-ID(${dato})`
                designio+= tetra2
            }
        })
        try{
            var flag=0;
            var count = 1;
            var inicio=0;
            var plop = {};
            var acu = 0;
            while(flag==0){
                const url = `${this.uri}search/scopus?query=${designio} AND AF-ID(60072061) AND PUBYEAR IS ${year}&start=${inicio}&apiKey=${apiKey}&insttoken=${insttoken}`;
                const response = await fetch(url,{
                    headers:{'Accept': 'application/json'}
                });
                const information = await response.json();
                var number = information['search-results']['opensearch:totalResults'];
                var iteraciones = Math.ceil(number/25);
                information['search-results']["entry"].forEach(element => {
                    acu+= parseInt(element['citedby-count']);
                }
                );
                inicio+=25;
                count+=1;
                if(count>iteraciones){
                    plop = {'publications': parseInt(number), 'citations':acu, 'year':year};
                    flag+=1;
                }
                  
            }
            return plop;
        }catch(err){
            return {"error": true, "message": "servicio no disponible"};
        }


    }

    //Usado +
    /**
     * Devuelve la cantidad de publicaciones relacionadas con un ODS
     * 
     * @param {String} SDG_number - Número de ODS
     * @returns 
     */

    async getSDGdocumentCount(SDG_number){
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken();
        const query = sdgQueries[`sdg${SDG_number}`];
        try{
                const url = `${this.uri}search/scopus?query=${query} AND AF-ID(60072061)&apiKey=${apiKey}&insttoken=${insttoken}`;
                const response = await fetch(url,{
                    headers:{'Accept': 'application/json'}
                });
                const information = await response.json();
                var number = information['search-results']['opensearch:totalResults'];
                var plop = {'sdg': SDG_number, 'publications': parseInt(number)}
                return plop;
        }catch(err){
            console.log(`***ODS: ${SDG_number}***:`, err);
            return {"error": true, "message": "servicio no disponible"};
        }
    }

    //Usado +
    /**
     * Devuelve las publicaciones relacionadas con un ODS
     * 
     * @param {String} SDG_number - Número de ODS
     * @returns {Object} - Objeto con los datos de las publicaciones del ODS
     */

    async getSDGpublications(SDG_number){
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken();
        const query = sdgQueries[`sdg${SDG_number}`];
        try{
            var flag=0;
            var count = 1;
            var inicio=0;
            var plop = []
            while(flag==0){
                const url = `${this.uri}search/scopus?query=${query} AND AF-ID(60072061)&start=${inicio}&apiKey=${apiKey}&insttoken=${insttoken}`;
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
            return {"error": true, "message": "servicio no disponible"};
        }
    }

     //Usado *
     async getCoauthors(arrayIds,elID){
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken(); 
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
            const url = `${this.uri}abstract/citations?scopus_id=${arrayIds.slice(inicio, fin)}&apiKey=${apiKey}&insttoken=${insttoken}`;
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
   
    //Usado *
    async getInfoPublications(scopusID){
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken();
        try{

            const url = `${this.uri}abstract/scopus_id/${scopusID}?field=authors,title,publicationName,volume,issueIdentifier,prism:pageRange,coverDate,article-number,doi,citedby-count,prism:aggregationType&apiKey=${apiKey}&insttoken=${insttoken}`;
            const response = await fetch(url,{
                headers:{'Accept': 'application/json'}
            });
            const information = await response.json();
            var plop = [];
            for(let x of information['abstracts-retrieval-response']['authors']['author']){
                plop.push({ 
                            'name': x['ce:indexed-name'], 
                            'scopusId': x['@auid']
                        });
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