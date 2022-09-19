const express = require('express');
const router = express.Router();
const { getOwners, getOne, getApm, updateAppoint, deleteAppoint } = require('../controllers/adminController')

// Get All Owners
router.route('/owners').get(getOwners);

// Get All Appointments
router.route('/sched').get(getApm);

// Get Certain User
router.route('/:id').get(getOne)


// Update and Delete Specific Appointment
router.route('/:id').put(updateAppoint).delete(deleteAppoint)





module.exports = router