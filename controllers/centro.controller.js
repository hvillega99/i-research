const Datajson = require('../helpers/jsondata');

exports.getPerfilCentro = async(req, res) =>{
    const nombreCentro = req.params.ciName;
    const datajson = new Datajson();
    const informacion = datajson.getInformacionCentro(nombreCentro);

    if(informacion){
        const investigadores = datajson.getInvestigadores(nombreCentro);
        res.render("../views/centro_investigacion.views.ejs", {siglas: informacion.nombre, 
                                                            nombre: informacion.nombreCompleto,
                                                            totalInvestigadores: investigadores.length,
                                                            'investigadores': investigadores});
    }else{
        res.send("No existe la url ingresada");
    }
}