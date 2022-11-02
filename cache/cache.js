const redis = require("redis");
const config = require("../redis.config.json");

class Cache{

    static instance;

    constructor(){
            
        if(!!Cache.instance){
            return Cache.instance;
        }

        this.status = 0;
    
        this.client = redis.createClient({
            url: config.url,
            password: config.password
        });
        
        this.client.connect();
        
        this.client.on('error', async (err) => {
            console.log('Error en la conexión con Redis', err)
            this.status = -1;
        });
        
        this.client.on('connect', () =>{
            console.log('Conectado a Redis');
            this.status = 1;
        });

        this.expire = 60*60*24*7;

        Cache.instance = this;
        
    }

    async get(key) {

        if(this.status == -1){
            return {"error": true, "message": "no se pudo conectar con Redis"};
        }

        let result;

        try{
            result = await this.client.get(key);
        }catch(err){
            result = {"error": true, "message": "no se pudo obtener el item"};
        }

        return result;
    }

    async set(key, value) {

        if(this.status == -1){
            return {"error": true, "message": "no se pudo conectar con Redis"};
        }

        let result;

        try{

            result = await this.client.set(key, value);
            await this.client.expire(key, this.expire);

        }catch(err){
            result = {"error": true, "message": "no se pudo guardar el item"};
        }

        return result;
    }

    async del(key) {

        if(this.status == -1){
            return {"error": true, "message": "no se pudo conectar con Redis"};
        }

        let result;

        try{
            result = await this.client.del(key);
        }catch(err){
            result = {"error": true, "message": "no se pudo eliminar el item"};
        }

        return result;
    }

    async getKeys(pattern) {

        if(this.status == -1){
            return {"error": true, "message": "no se pudo conectar con Redis"};
        }

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