const Scopus = require('../helpers/scopus')
const Scival = require('../helpers/scival');
const Datajson = require('../helpers/jsondata');

exports.getPerfilInvestigador = async (req, res) =>{
    const scopusId = req.params.scopusId;

    const scopus = new Scopus();
    const scival = new Scival();
    const datajson = new Datajson();

    const orcidCountsAndSubjects = await scopus.getDataAndAreas(scopusId);
    const hIndex = await scopus.getHindex(scopusId);

    //Parte 1 de los nombres de los topicos y sus frecuencias
    //Buscar los id de las publicaciones
    //const publications = await scopus.getPublicationsId(scopusId);
    const publications2 = await scopus.getPublicationsTitle2(scopusId);
   

    const fcwi = await scival.getFCWI(scopusId);
    const h5index = await scival.getH5index(scopusId);
    
    const nameAndAffiliations = datajson.getNameAndAffiliations(scopusId);
    
    
    //CON ESTO SE SACA LOS 
    /*
    const array_pub = publications2.map( (e) => e[3]);
    const coauthores = await scopus.newCoauthors(array_pub,scopusId);
    console.log(coauthores);
    */
    //CON ESTO SE SACA LOS COAUTHORES

    
    //solo con uno
    /*
    const eltopicid = await scival.getInfoPublications(85081370144);
    const topicname = await scival.getTopicName(eltopicid);
    console.log(topicname);
    */
    //

    //5

    /*
    const idpublicaciones = [85081370144,85045144932,85026803380,84919346826,85062090915];
    for await (let idp of idpublicaciones) {
        //console.log(idpublicaciones[i]);
        var eltopicid = await scival.getInfoPublications(idp);
        var topicname = await scival.getTopicName(eltopicid);
        console.log(topicname);
     }
    */

    //const nametopic = await scopus.getTopics(scopusId);
    
    //console.log(nametopic);
    //await scival.getPublications(scopusId);
    //await scival.getCitations(scopusId);

    //Prueba de informacion detallada de una publicacion
    /*
    var helloXD = await scopus.getInfoPublications(85107130067);
    console.log(helloXD);
    */
   

    const information = {...orcidCountsAndSubjects};
    information['nombre'] = nameAndAffiliations.name;
    information['afiliaciones'] = nameAndAffiliations.affiliations;
    information['id'] = scopusId;
    information['fcwi'] = fcwi;
    information['hIndex'] = hIndex;
    information['h5Index'] = h5index;
    information['publicaciones'] = publications2;
    /* var thescopus = [];
    publications2.forEach( id => { thescopus.push(id[3])}); */
    
    
    //const losco = await scival.getCoauthors(thescopus,scopusId);
    //const coauthor = await scopus.getCoauthors(thescopus,scopusId);
    //information['coauthor'] = losco;
    //var zs= new set(coauthor);
    
    //console.log(information['coauthor']);
    //console.log(information['coauthor'].length);

    //console.log(losco);

    //console.log(publications);
    //console.log(publications2);
    //Parte 2 de los nombres de los topicos y sus frecuencias
    /*
    var mapa = {}
    for await (let propi of publications){
        const topicsid = await scival.getInfoPublications(propi);
        console.log(topicsid);
        
        const nametopics = await scival.getTopicName(topicsid);
        console.log(nametopics);
        
        
        if(nametopics in mapa){
            mapa[nametopics]++;
        }
        else{
            mapa[nametopics]=1;
        }
        
        
    }
    */
    //console.log(mapa);
    
    res.render("../views/investigador.views.ejs", {information: information});
}