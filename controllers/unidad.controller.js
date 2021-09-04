const Datajson = require('../helpers/jsondata');

exports.getPerfilUnidad = async(req, res) =>{
    const nombreUnidad = req.params.uaName;
    const datajson = new Datajson();
    const informacion = datajson.getInformacionUnidad(nombreUnidad);

    if(informacion){
        const investigadores = datajson.getInvestigadores(nombreUnidad);
        res.render("../views/unidad_academica.views.ejs", {siglas: informacion.nombre, 
                                                            nombre: informacion.nombreCompleto,
                                                            totalInvestigadores: investigadores.length,
                                                            'investigadores': investigadores});
    }else{
        res.send("No existe la url ingresada");
    }

}