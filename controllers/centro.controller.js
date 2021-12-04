const Datajson = require('../helpers/jsondata');
const Scopus = require('../helpers/scopus');
const scopus = new Scopus();
const datajson = new Datajson();

exports.getPerfilCentro = async(req, res) =>{
    const nombreCentro = req.params.ciName;
    const informacion = datajson.getInformacionCentro(nombreCentro);

    if(informacion){
        const investigadores = datajson.getInvestigadores(nombreCentro);
        const idArr = investigadores.map(item => item.id);
        const data = await scopus.getMetrics(idArr);
        data.forEach(element => {
            const scopusId = element['coredata']['dc:identifier'].split(':')[1];
            const publicaciones = element['coredata']['document-count'];
            const citaciones = element['coredata']['citation-count'];
            const investigador = investigadores.find(item => item.id == scopusId);
            
            investigador['publicaciones'] = publicaciones;
            investigador['citaciones'] = citaciones;
        });

        const arrPublicaciones = investigadores.map(element => parseInt(element.publicaciones,10));
        const totalPublicaciones = arrPublicaciones.reduce((i,s) => {
            if(i){
                return i+s;
            }else{
                return s;
            }
        });
        
        const arrCitaciones = investigadores.map(element => parseInt(element.citaciones,10));
        const totalCitaciones = arrCitaciones.reduce((i,s) => {
            if(i){
                return i+s;
            }else{
                return s;
            }
        });

        res.render("../views/centro_investigacion.views.ejs", {siglas: informacion.nombre, 
                                                            nombre: informacion.nombreCompleto,
                                                            logo: informacion.logo,
                                                            totalInvestigadores: investigadores.length,
                                                            totalPublicaciones,
                                                            totalCitaciones,
                                                            'investigadores': investigadores});
    }else{
        res.send("No existe la url ingresada");
    }
}