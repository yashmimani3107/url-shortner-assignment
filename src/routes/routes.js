const express  = require('express');
const { shortenUrlHandler, redirectHandler, statsHandler } = require('../controller/controller')

const router = express.Router();

router.post('/shorten', shortenUrlHandler);
router.get('/:shortUrl', redirectHandler);
router.get('/stats/:shortUrl', statsHandler);

module.exports = router;