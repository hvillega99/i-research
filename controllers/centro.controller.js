const Scopus = require('../helpers/scopus');
const Centersdb = require('../helpers/centersdb');
const Researchersdb = require('../helpers/researchersdb');

const researches = new Researchersdb();
const scopus = new Scopus();
const centersdb = new Centersdb();

exports.getPerfilCentro = async(req, res) =>{
    const nombreCentro = req.params.ciName;
    const informacion = centersdb.getCenter(nombreCentro);

    if(informacion){
        const investigadores = researches.getResearchersByUnit(nombreCentro);

        if(investigadores.length > 0){
            const idArr = investigadores.map(item => item.id);

            const data = await scopus.getMetrics(idArr);

            if(!data.error){
                data.forEach(element => {
                    const scopusId = element['coredata']['dc:identifier'].split(':')[1];
                    const publicaciones = element['coredata']['document-count'];
                    const citaciones = element['coredata']['citation-count'];
                    const investigador = investigadores.find(item => item.id == scopusId);
                    
                    investigador['publicaciones'] = publicaciones;
                    investigador['citaciones'] = citaciones;
                });
            }else{
                investigadores.map(investigador => {
                    investigador['publicaciones'] = '#';
                    investigador['citaciones'] = '#';
                })
            }
            
        } 
        res.render("../views/centro_investigacion.views.ejs", {siglas: informacion.nombre, 
                                                            nombre: informacion.nombreCompleto,
                                                            logo: informacion.logo,
                                                            totalInvestigadores: investigadores.length,
                                                            totalPublicaciones: informacion.publicaciones ,
                                                            totalCitaciones: informacion.citas,
                                                            'investigadores': investigadores});
    }else{
        res.send("No existe la url ingresada");
    }
}