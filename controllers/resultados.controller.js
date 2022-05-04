const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');
const Researchersdb = require('../helpers/researchersdb');
const Gtsi = require('../helpers/gtsi');

const researches = new Researchersdb();
const unitsdb = new Unitsdb();
const centersdb = new Centersdb();
const gtsi = new Gtsi();

exports.find = async (req, res) =>{
    const {terms} = req.body;

    console.log(req.body);

    let data = researches.searchByName(terms);

    let investigadores = [];

    for(let i = 0; i < data.length; i++){

        const investigador = data[i];

        const contrato = await  gtsi.getContratoByScopusId(investigador['Scopus Author ID']);

        let srcFoto;

        if(contrato.error){
            srcFoto = '/img/author.png';
        }else{
            srcFoto = `https://talentohumano.espol.edu.ec/imgEmpleado/${contrato.cedula}.jpg`;
        }

        investigadores.push({
            scopusId: investigador['Scopus Author ID'],
            name: investigador.Author,
            srcFoto
        })
    }
        
    console.log(investigadores);

    const resultadosCentros = centersdb.findCenter(terms);
    const resultadosFacultades = unitsdb.findUnit(terms);
    const totalResultados = data.length + resultadosCentros.length + resultadosFacultades.length;
    
    res.render("../views/resultados.views.ejs", {total: totalResultados, 
                                                investigadores, 
                                                facultades: resultadosFacultades, 
                                                centros: resultadosCentros, 
                                                terminos: terms});
};