const Unitsdb = require('../helpers/unitsdb');
const Centersdb = require('../helpers/centersdb');
//const Scopus = require('../helpers/scopus'); //Prueba ODS LINEA 1
//const sdgQueries = require('../helpers/sdgQueries'); //Queris de ODS

const unitsdb = new Unitsdb();
const centersdb = new Centersdb();
//const scopus = new Scopus(); // Prueba ODS LINEA 2

exports.getMainPage = async (req, res) => {

    //let infoOFODSP = await scopus.getODSpublications(sdgQueries.sdg1); // Prueba ODS LINEA 3
    //console.log('INFO de publicaciones de ODS especifico: '); // Prueba ODS LINEA 4
    //console.log(infoOFODSP);// Prueba ODS LINEA 5

    let faculties = [];
    let centros = [];

    centersdb.centers.forEach(element => {
        centros.push(element);
    });

    unitsdb.units.forEach(element => {
        faculties.push(element);
    });

    centros.sort((x, y)=> x.nombreCompleto.localeCompare(y.nombreCompleto, {ignorePunctuation: true}));
    faculties.sort((x, y)=> x.nombreCompleto.localeCompare(y.nombreCompleto, {ignorePunctuation: true}));


    res.render("../views/main.views.ejs", {faculties, centros});
}