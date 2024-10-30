const redis  = require('redis');

const client  = redis.createClient('redis://localhost:6379');

client.on('connect', () => {
    console.log('Connected to redis');
});

client.on('error',(err) =>{
    console.log('Redis connection error',err);
});

(async () => {
    await client.connect(); 
  })();

module.exports = client;