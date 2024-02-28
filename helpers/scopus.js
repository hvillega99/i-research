const fetch = require('node-fetch');
const Resourcesdb = require('./resourcesdb');
const resources = new Resourcesdb();
const sdgQueries = require('./sdgQueries');

const logger = require('../logger');

/**
 * Clase para manejar las consultas a Scopus
 */

class Scopus{

    /**
     * Constructor de la clase
     */

    constructor(){
        this.uri = "https://api.elsevier.com/content/";   
    }

    /**
     * Devuelve la informacion de una peticion realizada al servicio de Scopus
     * 
     * @param {String} urlX Url de la peticion que se realizara al servicio de Scopus
     * @returns {Promise<Object>} Respuestas de la peticion realizada a Scopus, con el url especificado
     */

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

    /**
     * Devuelve la informacion general de publicaciones
     * 
     * @param {String} urlX Url de la peticion que se realizara al servicio de Scopus para obtener informacion general de publicaciones
     * @returns {Promise<Object>} Informacion general sobre las publicaciones
     */

    async comunX2(urlX){ //No se puede tocar (La funcion que utiliza este metodo; es invocada por un promise.all)
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

                var publicationPlace = element['prism:publicationName'];
                
                plop2.push(title);
                plop2.push(citation);
    
                plop2.push(year);
                plop2.push(elscopus);

                plop2.push(publicationPlace);
    
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

    /**
     * Devuelve el numero de publicaciones y citaciones totales
     * 
     * @param {String} urlX Url de la peticion que se realizara al servicio de Scopus para obtener el numero de publicaciones y citaciones totales
     * @returns {Promise<Object>} Numero de publicaciones y citaciones totales
     */    

    async comunX3(urlX){ //No se puede tocar (La funcion que utiliza este metodo; es invocada por un promise.all)
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

    /**
     * Devuelve la informacion general de publicaciones de un determinado pais 
     * 
     * @param {String} urlX Url de la peticion que se realizara al servicio de Scopus para obtener la informacion general sobre las publicaciones de un determinado pais
     * @param {String} the_country El nombre del pais donde se buscara la informacion general de las publicaciones
     * @returns {Promise<Object>} Informacion general sobre las publicaciones de un determinado pais
     */  

    async comunX4(urlX,the_country){
        var maxPub = 200;
        var plop = {};
        const part_url = `${urlX}&`;
        const information = await this.comunX(part_url);
        var number = information['search-results']['opensearch:totalResults'];
        var p = Math.ceil(number/maxPub);
        
        for(let i=0; i<p ; i++){
            var indicesI = [];
            var q = 0;
            while(q<8){
                var indice = (i*maxPub) + (25*q)
                if(indice >= number){
                    q=8;
                }
                else{
                    indicesI.push(indice)
                    q+=1
                }
            }
            const result = await Promise.all(
                indicesI.map( elemento => this.comunX(`${urlX}&view=COMPLETE&start=${elemento}&`))
            )
            result.forEach(information =>{
                information['search-results']["entry"].forEach(element => {
                
                    var plop2 = [];
                
                    var title= element['dc:title'];
                    var citation = element['citedby-count'];
                    
                    var year = element['prism:coverDate'].split('-')[0]
                    var elscopus = element['dc:identifier'].split(':')[1];

                    var publicationPlace = element['prism:publicationName'];
                    
                    plop2.push(title);
                    plop2.push(citation);
        
                    plop2.push(year);
                    plop2.push(elscopus);

                    plop2.push(publicationPlace);
        
                    //CODIGO QUE GUARDARA LAS UNIVERSIDADES JUNTO SUS PUBLICACIONES
                    if(element['affiliation']){
                        element['affiliation'].forEach( uInformation => {
                            if(uInformation['afid']!="60072061"){
                                if(uInformation['affiliation-country']==the_country){
                                    if(plop[uInformation['affilname']]){
                                        plop[uInformation['affilname']].push(plop2);
                                    }
                                    else{
                                        plop[uInformation['affilname']] = [plop2];
                                    }
                                }
                            }

                        });
                    }
                    //**********
                    
                    
                }
                );
            })
        }
        
      
        
        return plop;
    }

    /**
     * Devuelve las áreas de investigación, orcid, document count y citation count del investigador
     * 
     * @param {String} scopusId Scopus Id del investigador
     * @returns {Promise<Object>} Informacion del investigador
     */
    
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
            logger.error(`Error en API Scopus ${this.uri}: ${err}`);
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
    
    /**
     * Devuelve el H index del investigador
     * 
     * @param {String} scopusId Scopus Id del investigador
     * @returns {Promise<number>} H index del investigador
     */

    async getHindex(scopusId){
        try{
            const part_url = `author/author_id/${scopusId}?view=metrics&`;
            let data = await this.comunX(part_url);
            return data['author-retrieval-response'][0]['h-index'];
        }catch (err) {
            return -1
        }
    }

    /**
     * Devuelve métricas de los investigadores
     * 
     * @param {Array<String>} idArr Array de Scopus Id de los investigadores
     * @returns {Promise<Array<Object>>} Métricas de los investigadores
     */

    async getMetrics(idArr){
        try {
            const part_url = `author/author_id/${idArr}?view=metrics&`;
            const data = await this.comunX(part_url);
            return data['author-retrieval-response-list']['author-retrieval-response'];
        }catch (err) {
            return {"error": true, "message": "servicio no disponible"};
        }  
    }
   
    /**
     * Devuelve informacion de todas las publicaciones de un autor determinado
     * 
     * @param {String} scopusId Es el AuthorID del autor del que se buscara la informacion de todas sus publicaciones
     * @returns Informacion general de todas las publicaciones de un autor determinado
     */

    async getPublicationsTitle(scopusId){  
        try{
            const url_x = `search/scopus?query=AU-ID(${scopusId})`;
            const respuesta = await this.comunX2(url_x);
            return respuesta;
        }catch(err){
            return -1;
        }
    }
    
    /**
     * Devuelve el número de publicaciones y citaciones de una unidad académica en un año determinado
     * 
     * @param {Array<String>} arrayIDS Array de Scopus ID de los investigadores de la unidad
     * @param {number} year Año de la búsqueda
     * @param {String} instfilter Filtro institucional
     * @returns {Promise<Object>} Publicaciones y citaciones de la unidad en el año indicado
     */

    async getNPublications(arrayIDS, year, instfilter){     
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
            let filter = '';
            
            instfilter == 'true' ? filter =  ' AND AF-ID(60072061)' : filter = '';

            const url_x = `search/scopus?query=${designio}${filter} AND PUBYEAR IS ${year}`;
            const respuesta = await this.comunX3(url_x);
            var plop = {'publications': respuesta.publications, 'citations': respuesta.citations, 'year':year};
            return plop;
        }catch(err){
            return {"error": true, "message": "servicio no disponible", "year": year};
        }
    }

    /**
     * Devuelve la cantidad de publicaciones relacionadas con un ODS
     * 
     * @param {String} SDG_number Número de ODS
     * @returns {Promise<Object>} Cantidad de publicaciones por año del ODS
     */

    async getSDGbibliometrics(SDG_number){
        const query = sdgQueries[`sdg${SDG_number}`];
        if(SDG_number!='8'){
            try{
                const url_x = `search/scopus?query=${query} AND AF-ID(60072061)`;
                const respuesta = await this.comunX3(url_x);
                var plop = {'sdg': SDG_number, 'publications': respuesta.publications, 'citations': respuesta.citations};
                return plop;
            }catch(err){
                //console.log(`***ODS: ${SDG_number}***:`, err);
                return {"error": true, "message": "servicio no disponible", "sdg": SDG_number};
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
                //console.log(`***ODS: ${SDG_number}***:`, err);
                return {"error": true, "message": "servicio no disponible"};
            }
        }

    }

    /**
     * Devuelve las publicaciones relacionadas con un ODS
     * 
     * @param {String} SDG_number Número de ODS
     * @returns {Promise<Object>} Publicaciones relacionadas con el ODS
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


     /**
     * Devuelve el nombre del pais y el numero de publicaciones (con colaboracion a ESPOL) que hay en dicho pais
     * 
     * @param {String} country Nombre del pais
     * @returns {Promise<Object>} Nombre del pais y numero de publicaciones (con colaboracion a ESPOL) de dicho pais
     */

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

    /**
     * Devuelve la informacion general de publicaciones (En colaboracion con Espol) de un determinado pais 
     * 
     * @param {String} country Nombre del pais
     * @returns {Promise<Object>} Informacion general de publicaciones (En colaboracion con Espol) de un determinado pais
     */

    async getPublicationsInfoByCountry(country){
        try{
            const url_x = `search/scopus?query=AF-ID(60072061) AND AFFILCOUNTRY (${country})&`;
            const respuesta = await this.comunX4(url_x,country);
            return respuesta;
        }catch(err){
            return {"error": true, "message": "error al obtener los datos", country};
        }

    }

    /**
     * Devuelve la informacion relacionada a los colaboradores(coautores) de un autor determinado 
     * 
     * @param {String} arrayIds ID de todas las publicaciones del autor determinado
     * @param {String} elID AuthorID del autor determinado al que se le buscara la informacion de sus correspondientes colaboradores(coautores)
     * @returns {Promise<Object>} Informacion relacionada a los colaboradores(coautores) de un autor determinado (AuthorID y el nombre)
     */

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
   
    /**
     * Devuelve informacion detallada de una pulbicacion determinada 
     * 
     * @param {String} scopusID scopusID de la publicacion de la cual se busca la informacion
     * @returns {Promise<Object>} Informacion detallada de una pulbicacion determinada 
     */
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