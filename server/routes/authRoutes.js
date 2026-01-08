const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.post('/logout', auth.logout);
router.get('/me', authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
})

module.exports = router;
