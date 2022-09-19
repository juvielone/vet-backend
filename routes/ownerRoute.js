const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/ownerController')
const { protect } = require('../middleware/authMid')




router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.get('/mydashboard', protect, getMe)

module.exports = router



