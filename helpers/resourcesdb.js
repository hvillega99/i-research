const fs = require('fs');

class Resourcesdb {

    static instance;

    constructor(){
        if(!!Resourcesdb.instance){
            return Resourcesdb.instance;
        }

        this.files = require('../resources/resources.json');

        Resourcesdb.instance = this;
    }

    save(){
        fs.writeFileSync('./resources/resources.json', JSON.stringify(this.files), 'utf-8');
    }

    getApiKey(){
        const apiKey = require(`.${this.files.path}${this.files.apikey}`);
        return apiKey['key'];
    }

    getUsers(){
        const users = require(`.${this.files.path}${this.files.users}`);
        return users['users'];
    }

}

module.exports = Resourcesdb;