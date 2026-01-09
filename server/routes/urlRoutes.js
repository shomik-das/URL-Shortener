const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/shorten', authMiddleware, urlController.shortenUrl);
router.get('/my-urls', authMiddleware, urlController.getMyUrls);
router.delete('/:id', authMiddleware, urlController.deleteUrl);


module.exports = router;
