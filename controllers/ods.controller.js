const tags = {
    'poverty': 1,
    'hunger': 2,
    'health': 3,
    'education': 4,
    'gender-equality': 5,
    'water': 6,
    'energy': 7,
    'economic-growth': 8,
    'insfrastructure': 9,
    'inequality': 10,
    'cities': 11,
    'sustainable-consumption-production': 12,
    'climate-change': 13,
    'oceans': 14,
    'biodiversity': 15,
    'peace': 16
}


exports.showOdsInfo = (req, res) => {
    const {tag} = req.params;

    const odsId = tags[tag];

    if (odsId) {
        res.render("../views/ods.views.ejs", {odsId});
    } else {
        res.render("../views/notFound.views.ejs");
    }

}