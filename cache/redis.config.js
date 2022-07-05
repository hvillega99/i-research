const redis = require("redis");

const client = redis.createClient({
    url: 'redis://redis-18093.c16.us-east-1-2.ec2.cloud.redislabs.com:18093',
    password: 'uD1y19Y9za2AepuURZXdi6eQE5s2D5Ml'
});

client.connect();

client.on('error', (err) => {
    console.log('Redis Client Error', err)
});

client.on('connect', () =>{
    console.log('Redis client connected');
});

module.exports = client;