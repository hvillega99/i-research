const tags = {
    'poverty': 1,
    'hunger': 2,
    'health': 3,
    'education': 4,
    'gender-equality': 5,
    'water-and-sanitation': 6,
    'energy': 7,
    'economic-growth': 8,
    'insfrastructure': 9,
    'inequality': 10,
    'cities': 11,
    'sustainable-consumption-production': 12,
    'climate-change': 13,
    'oceans': 14,
    'biodiversity': 15,
    'peace-justice': 16
}

const keywords = {
    1: 'poverty, Fin de la pobreza',
    2: 'hunger, Hambre cero',
    3: 'health, Salud y bienestar',
    4: 'education, Educación de calidad',
    5: 'gender-equality, Igualdad de género',
    6: 'water-and-sanitation, Agua limpia y saneamiento',
    7: 'energy, Energía asequible y no contaminante',
    8: 'economic-growth, Trabajo decente y crecimiento económico',
    9: 'infrastructure, Industria, innovación e infraestructura',
    10: 'inequality, Reducción de las desigualdades',
    11: 'cities, Ciudades y comunidades sostenibles',
    12: 'sustainable-consumption-production, Producción y consumo responsables',
    13: 'climate-change, Acción por el clima',
    14: 'oceans, Vida submarina',
    15: 'biodiversity, Vida de ecosistemas terrestres',
    16: 'peace-justice, Paz, justicia e instituciones sólidas'
}

const descriptions = {
    1: 'Descubre las publicaciones y proyectos de investigación de la ESPOL que buscan nuevas soluciones para eliminar la pobreza en el Ecuador y el mundo.',
    2: 'Explora las publicaciones y proyectos de investigación de la ESPOL que proponen iniciativas concretas para poner fin al hambre y mejorar la nutrición.',
    3: 'Conoce las publicaciones y proyectos de investigación  de la ESPOL enfocadas en garantizar una vida sana y promover el bienestar para la sociedad ecuatoriana.',
    4: 'Descubre las publicaciones y proyectos de investigación  de la ESPOL que analizan y proponen soluciones para brindar educación de calidad para todos.',
    5: 'Explora las publicaciones y proyectos de investigación de la ESPOL que promueven la igualdad de género en todos los ámbitos.',
    6: 'Conoce las publicaciones y proyectos de investigación  de la ESPOL que buscan ampliar el acceso al agua potable y mejorar el saneamiento.',
    7: 'Explora las publicaciones y proyectos de investigación  de la ESPOL que proponen el uso de energías limpias y renovables.',
    8: 'Descubre las publicaciones y proyectos de investigación de la ESPOL que analizan cómo generar trabajo digno y crecimiento económico inclusivo.',
    9: 'Conoce las publicaciones y proyectos de investigación de la ESPOL que proponen soluciones innovadoras e infraestructura resiliente.',
    10: 'Explora las publicaciones y proyectos de investigación de la ESPOL que buscan reducir la desigualdad y promover la inclusión.',
    11: 'Descubre las publicaciones y proyectos de investigación de la ESPOL que proponen modelo de ciudades y comunidades sostenibles.',
    12: 'Conoce las publicaciones y proyectos de investigación de la ESPOL que analizan modelos de producción y consumo responsable.',
    13: 'Explora las publicaciones y proyectos de investigación de la ESPOL que proponen medidas frente al cambio climático.',
    14: 'Descubre las publicaciones y proyectos de investigación de la ESPOL que buscan la conservación y el uso sostenible de los océanos.',
    15: 'Conoce las publicaciones y proyectos de investigación de la ESPOL que promueven el uso sostenible de los ecosistemas terrestres.',
    16: 'Explora las publicaciones y proyectos de investigación de la ESPOL que fomentan sociedades pacíficas e instituciones eficaces.'
}

const titles = {
    1: 'Publicaciones de la ESPOL alineado al ODS 1: Fin de la pobreza',
    2: 'Publicaciones de la ESPOL alineado al ODS 2: Hambre cero',
    3: 'Publicaciones de la ESPOL alineado al ODS 3: Salud y bienestar',
    4: 'Publicaciones de la ESPOL alineado al ODS 4: Educación de calidad',
    5: 'Publicaciones de la ESPOL alineado al ODS 5: Igualdad de género',
    6: 'Publicaciones de la ESPOL alineado al ODS 6: Agua limpia y saneamiento',
    7: 'Publicaciones de la ESPOL alineado al ODS 7: Energía asequible y no contaminante',
    8: 'Publicaciones de la ESPOL alineado al ODS 8: Trabajo decente y crecimiento económico',
    9: 'Publicaciones de la ESPOL alineado al ODS 9: Industria, innovación e infraestructura',
    10: 'Publicaciones de la ESPOL alineado al ODS 10: Reducción de las desigualdades',
    11: 'Publicaciones de la ESPOL alineado al ODS 11: Ciudades y comunidades sostenibles',
    12: 'Publicaciones de la ESPOL alineado al ODS 12: Producción y consumo responsables',
    13: 'Publicaciones de la ESPOL alineado al ODS 13: Acción por el clima',
    14: 'Publicaciones de la ESPOL alineado al ODS 14: Vida submarina',
    15: 'Publicaciones de la ESPOL alineado al ODS 15: Vida de ecosistemas terrestres',
    16: 'Publicaciones de la ESPOL alineado al ODS 16: Paz, justicia e instituciones sólidas'
}

exports.showOdsInfo = (req, res) => {
    const {tag} = req.params;

    const odsId = tags[tag];

    if (odsId) {

        const kw = keywords[odsId];
        const desc = descriptions[odsId];
        const title = titles[odsId];

        res.render("../views/ods.views.ejs", {odsId, kw, desc, title});
    } else {
        res.render("../views/notFound.views.ejs");
    }

}