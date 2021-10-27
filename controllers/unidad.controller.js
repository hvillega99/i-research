const Datajson = require('../helpers/jsondata');
const Scopus = require('../helpers/scopus');
const scopus = new Scopus();
const datajson = new Datajson();

exports.getPerfilUnidad = async(req, res) =>{
    const nombreUnidad = req.params.uaName;
    const informacion = datajson.getInformacionUnidad(nombreUnidad);
    if(informacion){
        const investigadores = datajson.getInvestigadores(nombreUnidad);
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

        res.render("../views/unidad_academica.views.ejs", {siglas: informacion.nombre, 
                                                            nombre: informacion.nombreCompleto,
                                                            totalInvestigadores: investigadores.length,
                                                            totalPublicaciones,
                                                            totalCitaciones,
                                                            'investigadores': investigadores});
    }else{
        res.send("No existe la url ingresada");
    }

}