const Scival = require('../helpers/scival');
const Datajson = require('../helpers/jsondata');

const dbController = new Datajson();
const scival = new Scival();

exports.getMainPage = async (req, res) => {
    const arrScopusId = dbController.getAllScopusId();

    let authors = [];
    let faculties = [];

    dbController.facultades.forEach(element => {
        faculties.push(element);
    });

    for(let i=0; i<10; i++){
       let subArray = await scival.getTopH5Index(arrScopusId.slice(Math.round((i/10)*arrScopusId.length), Math.round(((i+1)/10)*arrScopusId.length)));
       authors = [...authors, ...subArray];
    }

    authors.sort((x, y) => y.h5 - x.h5);
    authors = authors.slice(0, 10);

    res.render("../views/main.views.ejs", {authors, faculties});
}