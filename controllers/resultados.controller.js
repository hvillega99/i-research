const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');
const Researchersdb = require('../helpers/researchersdb');
const Gtsi = require('../helpers/gtsi');
const Translator = require('../helpers/msTranslator');

const researches = new Researchersdb();
const unitsdb = new Unitsdb();
const centersdb = new Centersdb();
const gtsi = new Gtsi();
const translator = new Translator();

exports.find = async (req, res) =>{
    const {terms} = req.body;

    let data = researches.searchByName(terms);

    let investigadores = [];

    for(let i = 0; i < data.length; i++){

        const investigador = data[i];

        const contrato = await  gtsi.getPerfilByScopusId(investigador.scopusId);

        let srcFoto;

        if(contrato.error){
            srcFoto = '/img/author.png';
        }else if(contrato.foto.srcFoto){
            srcFoto = contrato.foto.srcFoto;
        }else{
            srcFoto = `https://talentohumano.espol.edu.ec/imgEmpleado/${contrato.cedula}.jpg`;
        }
        

        const afiliaciones = [investigador.afiliaciones.unidades.join(' '), investigador.afiliaciones.centros.join(' ')];

        investigadores.push({
            scopusId: investigador.scopusId,
            name: investigador.autor,
            afiliaciones: afiliaciones.join(' '), 
            srcFoto
        })
    }

    //Por aqui debo trabajar con los sinonimos, y/o palabras en ingles/español
    const the_sinonimos = require('../resources/data/sinonimos.json');
    const palabras = terms.split(' ');

    /*
    for(const palabras_s of the_sinonimos){
        if( palabras_s.includes(palabra)){
            console.log(palabras_s);
            break;
        }
    }
    */
    var sugerencias = [];
    for (const palabra of palabras){
        for(const palabras_s of the_sinonimos){
            for(const the_palabra of palabras_s){
                if( the_palabra.toUpperCase() === palabra.toUpperCase() ){
                    sugerencias = sugerencias.concat(palabras_s)
                }
            }
        }
    }

    const las_sugerencias = [...new Set(sugerencias)]
    const total_sug = las_sugerencias.length;

    let idList = [];
    let [termsEn, termsEs] = await Promise.all([translator.esToEn(terms), translator.enToEs(terms)]);
    let kwResults = {};

    if (!termsEs.error){
        const results = await gtsi.getAuthorsByKeywords(termsEs.replace(' ', ';').toLowerCase());
        if (!results.error) {
            kwResults = {...kwResults, ...results};
            idList.push(...Object.keys(kwResults));
        }
    }
    
    if (!termsEn.error){
        const results = await gtsi.getAuthorsByKeywords(termsEn.replace(' ', ';').toLowerCase());
        if (!results.error){
            kwResults = {...kwResults, ...results};
            idList.push(...Object.keys(kwResults));
        }
    }
    
    if (idList.length === 0) {
        // Si no se obtuvieron resultados con las traducciones, realizar la búsqueda con los términos originales
        const results = await gtsi.getAuthorsByKeywords(terms.replace(' ', ';'));
        if (!results.error){
            kwResults = {...kwResults, ...results};
            idList.push(...Object.keys(kwResults));
        }
    }

    idList = [...new Set(idList)];

    const autByKw = [];

    idList.forEach(scopusId => {
        const result = researches.searchById(scopusId);
        if(result){
            const afiliaciones = [result.afiliaciones.unidades.join(' '), result.afiliaciones.centros.join(' ')];
            const name = result.autor;
            const ci = kwResults[scopusId].cedula;
            autByKw.push({
                scopusId,
                name,
                afiliaciones: afiliaciones.join(' '),
                srcFoto: `https://talentohumano.espol.edu.ec/imgEmpleado/${ci}.jpg`
            });
        }
    });
        
    const resultadosCentros = centersdb.findCenter(terms);
    const resultadosFacultades = unitsdb.findUnit(terms);
    const totalResultados = data.length + resultadosCentros.length + resultadosFacultades.length;
    
    res.render("../views/resultados.views.ejs", {total: totalResultados, 
                                                investigadores, 
                                                facultades: resultadosFacultades, 
                                                centros: resultadosCentros, 
                                                autoresKw: autByKw,
                                                totalKw: autByKw.length,
                                                terminos: terms,
                                                totalSug: total_sug,
                                                temas_sugeridos: las_sugerencias});
};

exports.renderFinder = (req, res) => {
    res.render("../views/busqueda.views.ejs");
}