// controller.js
const { shortenUrl, getUrl, getUrlStats } = require('../services/service');


async function shortenUrlHandler(req, res) {
    try {
      const { originalUrl, ttl } = req.body; 
      const shortUrl = await shortenUrl(originalUrl, ttl); 
      console.log(`Generated short URL: ${shortUrl}`);
      res.json({ shortUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to shorten URL' });
    }
  }


async function redirectHandler(req, res) {
  try {
    const { shortUrl } = req.params;
    const data = await getUrl(shortUrl);

    if (data) {
      return res.redirect(data.originalUrl);
    } else {
      res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to redirect URL' });
  }
}


async function statsHandler(req, res) {
  try {
    const { shortUrl } = req.params;
    const stats = await getUrlStats(shortUrl);

    if (stats) {
      res.json(stats);
    } else {
      res.status(404).json({ error: 'Stats not found for this short URL' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve stats' });
  }
}

module.exports = {
  shortenUrlHandler,
  redirectHandler,
  statsHandler
};
