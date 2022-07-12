const redis = require("redis");

class Cache{

    static instance;

    constructor(){
            
        if(!!Cache.instance){
            return Cache.instance;
        }
    
        this.client = redis.createClient({
            url: 'redis://redis-18093.c16.us-east-1-2.ec2.cloud.redislabs.com:18093',
            password: 'uD1y19Y9za2AepuURZXdi6eQE5s2D5Ml'
        });
        
        this.client.connect();
        
        this.client.on('error', (err) => {
            console.log('Error en la conexión con Redis', err)
        });
        
        this.client.on('connect', () =>{
            console.log('Conectado a Redis');
        });

        this.expire = 60*60*15;

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

    async set(key, value, time=null) {
        let result;

        try{

            result = await this.client.set(key, value);
            if(time){
                await this.client.expire(key, time);
            }

        }catch(err){
            result = {"error": true, "message": "no se pudo guardar el item"};
        }

        return result;
    }

}

module.exports = Cache;