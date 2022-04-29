const Scopus = require('../helpers/scopus');
const Centersdb = require('../helpers/centersdb');
const Researchersdb = require('../helpers/researchersdb');
const Gtsi = require('../helpers/gtsi');

const researches = new Researchersdb();
const scopus = new Scopus();
const centersdb = new Centersdb();
const gtsi = new Gtsi();

exports.getPerfilCentro = async(req, res) =>{
    const nombreCentro = req.params.ciName;
    const informacion = centersdb.getCenter(nombreCentro);

    if(informacion){
        const investigadores = researches.getResearchersByUnit(nombreCentro);
        let countM = 0;
        let countF = 0;

        if(investigadores.length > 0){
            const idArr = investigadores.map(item => item.id);
            const contratos = await gtsi.getContratosByScopusId(idArr);
            const data = await scopus.getMetrics(idArr);

            if(!data.error){
                data.forEach(element => {
                    const scopusId = element['coredata']['dc:identifier'].split(':')[1];
                    const publicaciones = element['coredata']['document-count'];
                    const citaciones = element['coredata']['citation-count'];
                    const investigador = investigadores.find(item => item.id == scopusId);
                    const contrato = contratos.find(item => item.scopusId == scopusId);

                    if(contrato.sexo){
                        investigador['sexo'] = contrato.sexo
                        contrato.sexo == 'M' ? countM++ : countF++;
                    }else{
                        investigador['sexo'] = 'X';
                    }
                    
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
                                                            totalHombres: countM,
                                                            totalMujeres: countF,
                                                            totalPublicaciones: informacion.publicaciones ,
                                                            totalCitaciones: informacion.citas,
                                                            'investigadores': investigadores});
    }else{
        res.render('../views/notFound.views.ejs');
    }
}