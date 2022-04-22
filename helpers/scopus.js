const fetch = require('node-fetch');
const Resourcesdb = require('./resourcesdb');
const resources = new Resourcesdb();
const sdgQueries = require('./sdgQueries');
//Pequeña prueba

class Scopus{

    constructor(){
        this.uri = "https://api.elsevier.com/content/";   
    }

    async comunX(urlX){
        const apiKey = resources.getApiKey();
        const insttoken = resources.getInsttoken();
        const url = `${this.uri}${urlX}apiKey=${apiKey}&insttoken=${insttoken}`;
        const response = await fetch(url,{
            headers:{'Accept': 'application/json'}
        });
        const The_information = await response.json();
        return The_information;
    }

    async comunX2(urlX){
        var flag=0;
        var count = 1;
        var inicio=0;
        var plop = []
        while(flag==0){
            const part_url = `${urlX}&start=${inicio}&`;
            const information = await this.comunX(part_url);
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
    }

    async comunX3(urlX){
        var flag=0;
        var count = 1;
        var inicio=0;
        var plop = {};
        var acu = 0;
        while(flag==0){
            const part_url = `${urlX}&start=${inicio}&`;
            const information = await this.comunX(part_url);
            var number = information['search-results']['opensearch:totalResults'];
            var iteraciones = Math.ceil(number/25);
            information['search-results']["entry"].forEach(element => {
                acu+= parseInt(element['citedby-count']);
            }
            );
            inicio+=25;
            count+=1;
            if(count>iteraciones){
                plop = {'publications': parseInt(number), 'citations':acu};
                flag+=1;
            }
          
        }
        return plop;
    }

    async comunX4(urlX,the_country){
        var flag=0;
        var count = 1;
        var inicio=0;
        var plop = []
        var universities = [];
        while(flag==0){
            const part_url = `${urlX}&start=${inicio}&`;
            const information = await this.comunX(part_url);
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

                
                //CODIGO QUE GUARDARA LAS UNIVERSIDADES
                if(element['affiliation']){
                    element['affiliation'].forEach( uInformation => {
                        if(uInformation['affiliation-country']==the_country){
                            universities.push(uInformation['affilname'])
                        }
                    });
                }
                //**********
                
                
            }
            );
            inicio+=25;
            count+=1;
            if(count>iteraciones){
                flag+=1;
            }
          
        }
        //Conjunto de universidades sin repetir
        /*
        return {'publications': plop, 'institutions': [...new Set(universities)]};
        */
        return {'publications': plop, 'institutions': universities};
    }

    //Usado - F1 OK (Estas funciones podrian fucionarse; si es que no se tomara en cuenta las areas del investigador)
    async getDataAndAreas(scopusId){
        try{
            const part_url = `author/author_id/${scopusId}?`;
            const information = await this.comunX(part_url);
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
    
    //Usado - F1 OK (Estas funciones podrian fucionarse; si es que no se tomara en cuenta las areas del investigador)
    async getHindex(scopusId){
        try{
            const part_url = `author/author_id/${scopusId}?view=metrics&`;
            let data = await this.comunX(part_url);
            return data['author-retrieval-response'][0]['h-index'];
        }catch (err) {
            return -1
        }
    }

    //Usado - OK
    async getMetrics(idArr){
        try {
            const part_url = `author/author_id/${idArr}?view=metrics&`;
            const data = await this.comunX(part_url);
            return data['author-retrieval-response-list']['author-retrieval-response'];
        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }  
    }
   
    //Usado + OK
    async getPublicationsTitle(scopusId){  
        try{
            const url_x = `search/scopus?query=AU-ID(${scopusId})`;
            const respuesta = await this.comunX2(url_x);
            return respuesta;
        }catch(err){
            return -1;
        }
    }
    
    //Usado + OK
    /**
     * Obtiene el número de publicaciones y citaciones de una unidad académica en un año determinado
     * @param {Array} arrayIDS - Array de Scopus ID de los investigadores de la unidad
     * @param {Number} year - Año de la búsqueda
     * @returns 
     */
    async getNPublications(arrayIDS, year){     
        //Concatenacion de los ID'S de los investigadores de una facultad o centro en especifico
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
        //************** 
        try{
            const url_x = `search/scopus?query=${designio} AND AF-ID(60072061) AND PUBYEAR IS ${year}`;
            const respuesta = await this.comunX3(url_x);
            var plop = {'publications': respuesta.publications, 'citations': respuesta.citations, 'year':year};
            return plop;
        }catch(err){
            return {"error": true, "message": "servicio no disponible"};
        }
    }

    //Usado + OK
    /**
     * Devuelve la cantidad de publicaciones relacionadas con un ODS
     * 
     * @param {String} SDG_number - Número de ODS
     * @returns 
     */

    async getSDGdocumentCount(SDG_number){
        const query = sdgQueries[`sdg${SDG_number}`];
        if(SDG_number!='8'){
            try{
                const url_x = `search/scopus?query=${query} AND AF-ID(60072061)`;
                const respuesta = await this.comunX3(url_x);
                var plop = {'sdg': SDG_number, 'publications': respuesta.publications, 'citations': respuesta.citations};
                return plop;
            }catch(err){
                console.log(`***ODS: ${SDG_number}***:`, err);
                return {"error": true, "message": "servicio no disponible"};
            }
        }
        else{
            var cola = 0;
            var publicaciones = 0;
            var citaciones = 0;
            try{
                while(cola!=query.length){
                    const url_x = `search/scopus?query=${query[cola]} AND AF-ID(60072061)`;
                    const respuesta = await this.comunX3(url_x);
                    publicaciones+= respuesta.publications
                    citaciones+= respuesta.citations
                    cola+=1; 
                }
                var plop = {'sdg': SDG_number, 'publications': publicaciones, 'citations':citaciones};
                return plop;
            }catch(err){
                console.log(`***ODS: ${SDG_number}***:`, err);
                return {"error": true, "message": "servicio no disponible"};
            }
        }

    }

    //Usado + OK
    /**
     * Devuelve las publicaciones relacionadas con un ODS
     * 
     * @param {String} SDG_number - Número de ODS
     * @returns {Object} - Objeto con los datos de las publicaciones del ODS
     */

    async getSDGpublications(SDG_number){
        const query = sdgQueries[`sdg${SDG_number}`];
        if(SDG_number!='8'){
            try{
                const url_x = `search/scopus?query=${query} AND AF-ID(60072061)`;
                const respuesta = await this.comunX2(url_x);
                return respuesta;
            }catch(err){
                return {"error": true, "message": "servicio no disponible"};
            }
        }
        else{
            var cola = 0;
            var plop = [];
            try{
                while(cola!=query.length){
                    const url_x = `search/scopus?query=${query[cola]} AND AF-ID(60072061)`;
                    const respuesta = await this.comunX2(url_x);
                    plop.push(respuesta);
                    cola+=1;
                }
                var concatenacion = [].concat(...plop);
                return concatenacion;
            }catch(err){
                return {"error": true, "message": "servicio no disponible"};
            }
        }
    }

    //Pronto a usar 
    async getPublicationsByCountry(country){
        try{
            const url_x = `search/scopus?query=AF-ID(60072061) AND AFFILCOUNTRY (${country})&`;
            const respuesta = await this.comunX(url_x);
            var plop = {'country': country, 'publications': parseInt(respuesta['search-results']['opensearch:totalResults'])};
            return plop;
        }catch(err){
            return {"error": true, "message": "error al obtener los datos", country};
        }

    }

    //Pronto a usar
    async getPublicationsInfoByCountry(country){
        try{
            const url_x = `search/scopus?query=AF-ID(60072061) AND AFFILCOUNTRY (${country})&`;
            const respuesta = await this.comunX4(url_x,country);
            return respuesta;
        }catch(err){
            return {"error": true, "message": "error al obtener los datos", country};
        }

    }

    //Usado * OK
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
            const part_url = `abstract/citations?scopus_id=${arrayIds.slice(inicio, fin)}&`;
            const information = await this.comunX(part_url);
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
   
    //Usado * OK
    async getInfoPublications(scopusID){
        try{
            const part_url = `abstract/scopus_id/${scopusID}?field=authors,title,publicationName,volume,issueIdentifier,prism:pageRange,coverDate,article-number,doi,citedby-count,prism:aggregationType&`;
            const information = await this.comunX(part_url);
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