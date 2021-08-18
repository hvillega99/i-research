exports.getPerfilInvestigador = (req, res) =>{
    const scopusId = req.params.scopusId;
    res.render("../views/investigador.views.ejs")
}