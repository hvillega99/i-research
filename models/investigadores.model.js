const {Schema, model} = require('mongoose')

const investigadorSchema = new Schema({
    Autor: {
        type: String
    },
    ScopusID: {
        type: String
    },
    Institucion: {
        type: String
    },
    Unidad_Academica: {
        type: String
    },
    Centros_Investigacion:{
        type: String
    }
});

module.exports = model('investigadores', investigadorSchema, 'investigadores');