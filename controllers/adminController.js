
// @desc middleware handling exceptions inside of async 
// express routes and passing them to our express error handlers
const asyncHandler = require('express-async-handler');
const Owner = require('../models/ownerModel');
const Appointment = require('../models/appointmentModel');


// @desc See all Users
const getOwners = asyncHandler(async (req, res) => {
    const owners = await Owner.find({})
    res.send(owners);

})

// @desc See One Users
const getOne = asyncHandler(async (req, res) => {
    const id = req.params.id

    const owner = await Owner.findById(id)

    if (!owner) {
        res.status(400);
        throw new Error('No User exists');
    }
    res.send(owner);

})


// @desc See all Appointments
const getApm = asyncHandler(async (req, res) => {
    const appointment = await Appointment.find({})
    res.send(appointment);

})


// @desc Update Appointment
const updateAppoint = asyncHandler(async (req, res) => {
    const id = req.params.id

    const exist = await Appointment.findById(id);

    if (!exist) {
        res.status(400);
        throw new Error('No Appointment exists');


    }

    const updatedApm = await Appointment.findByIdAndUpdate(id, req.body, { new: true })
    res.json(updatedApm);

});




//  @desc Delete Appointment
const deleteAppoint = asyncHandler(async (req, res) => {
    const id = req.params.id

    const exist = await Appointment.findById(id);

    if (!exist) {
        res.status(400);
        throw new Error('No Appointment exists');


    }

    await exist.remove()

    res.json({ id: req.params.id });

});


module.exports = {
    getOwners, getOne, getApm, updateAppoint, deleteAppoint
}
