const redis = require("redis");
const config = require("./redis.config.json");

class Cache{

    static instance;

    constructor(){
            
        if(!!Cache.instance){
            return Cache.instance;
        }
    
        this.client = redis.createClient({
            url: config.url,
            password: config.password
        });
        
        this.client.connect();
        
        this.client.on('error', (err) => {
            console.log('Error en la conexión con Redis', err)
        });
        
        this.client.on('connect', () =>{
            console.log('Conectado a Redis');
        });

        this.expire = 60*60*24;

        Cache.instance = this;
        
    }

    async get(key) {
        let result;

        try{
            result = await this.client.get(key);
        }catch(err){
            result = {"error": true, "message": "no se pudo obtener el item"};
        }

        return result;
    }

    async set(key, value) {
        let result;

        try{

            result = await this.client.set(key, value, 'EX', this.expire);

        }catch(err){
            result = {"error": true, "message": "no se pudo guardar el item"};
        }

        return result;
    }

    async del(key) {
        let result;

        try{
            result = await this.client.del(key);
        }catch(err){
            result = {"error": true, "message": "no se pudo eliminar el item"};
        }

        return result;
    }

    async getKeys(pattern) {
        let result;

        try{
            result = await this.client.keys(pattern);
        }catch(err){
            result = {"error": true, "message": "no se pudieron obtener las keys"};
        }

        return result;
    }

}

module.exports = Cache;