const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMid")
const { getAppoint, sendAppoint, updateAppoint, deleteAppoint } = require('../controllers/appointController')



router.route('/').get(protect, getAppoint).post(protect, sendAppoint)
router.route('/:id').put(protect, updateAppoint).delete(protect, deleteAppoint)

module.exports = router



