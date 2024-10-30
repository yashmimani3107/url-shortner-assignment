const { nanoid } = require('nanoid'); // Import nanoid
const client = require('../config');


async function shortenUrl(originalUrl,ttl = null) {
  const shortUrl = nanoid(8); 
  
  const data = {
    originalUrl,
    accessCount: '0', 
    createdAt: new Date().toISOString()
  };

  
  await client.hSet(`url:${shortUrl}`, {
    originalUrl: data.originalUrl,
    accessCount: data.accessCount,
    createdAt: data.createdAt
  });

  if (ttl) {
    await client.expire(`url:${shortUrl}`, ttl);
    console.log(`Set expiration of ${ttl} seconds on url:${shortUrl}`);
}

  return shortUrl;
}


async function getUrl(shortUrl) {
  const data = await client.hGetAll(`url:${shortUrl}`);
  
  
  if (data && data.originalUrl) {
    data.accessCount = (parseInt(data.accessCount) || 0) + 1;
    await client.hSet(`url:${shortUrl}`, 'accessCount', data.accessCount.toString());
    return data;
  }
  
  return null; 
}


async function getUrlStats(shortUrl) {
  const data = await client.hGetAll(`url:${shortUrl}`);
  return data && data.originalUrl ? data : null; 
}

module.exports = {
  shortenUrl,
  getUrl,
  getUrlStats
};
