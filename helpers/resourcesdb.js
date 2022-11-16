const fs = require('fs');

/**
 * Clase para manejar los recursos 
 */

class Resourcesdb {

    static instance;

    /**
     * Constructor de la clase
     */

    constructor(){
        if(!!Resourcesdb.instance){
            return Resourcesdb.instance;
        }

        this.files = require('../resources/resources.json');

        Resourcesdb.instance = this;
    }

    /**
     * Guarda en disco el archivo de recursos
     */

    save(){
        fs.writeFileSync('./resources/resources.json', JSON.stringify(this.files), 'utf-8');
    }

    /**
     * Devuelve el api key
     * @returns {String} api key
     */

    getApiKey(){
        const apiKey = require(`.${this.files.path}${this.files.apikey}`);
        return apiKey['key'];
    }

    /**
     * Devuelve el token institucional
     * @returns {String} token institucional
     */

    getInsttoken(){
        const apiKey = require(`.${this.files.path}${this.files.apikey}`);
        return apiKey['insttoken'];
    }

    /**
     * Devuelve los usuarios administradores
     * @returns {Array<String>} lista de usuarios con permisos de administrador
     */

    getUsers(){
        const users = require(`.${this.files.path}${this.files.users}`);
        return users['users'];
    }

}

module.exports = Resourcesdb;