exports.loadHome = (req, res) => {
    res.render('./../views/admin_inicio.views.ejs');
}

exports.loadResearches = (req, res) => {
    res.render('./../views/admin_investigadores.views.ejs');
}

exports.loadUnits = (req, res) => {
    res.render('./../views/admin_unidades.views.ejs');
}

exports.loadCenters = (req, res) => {
    res.render('./../views/admin_centros.views.ejs');
}
