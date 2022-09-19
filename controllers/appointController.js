
// @desc middleware handling exceptions inside of async 
// express routes and passing them to our express error handlers
const asyncHandler = require('express-async-handler');
const Appointment = require('../models/appointmentModel')






// @desc    Get Appointmnt
// @route   GET api/appointment
// @acess   Private
const getAppoint = asyncHandler(async (req, res) => {
    const appointment = await Appointment.find({ user: req.user.id })
    res.json(appointment);

})


// @desc    Set Appointmnt
// @route   POST api/appointment
// @acess   Private
const sendAppoint = asyncHandler(async (req, res) => {
    const { date, time, petName, petType, petAge, breed, service } = req.body


    //send error if any field is missing
    if (!date || !time || !petName || !petType || !petAge || !breed || !service) {
        res.status(400)
        throw new Error('Please add a text field')

    }
    const appointment = await Appointment.create({
        user: req.user.id,
        date: date,
        time: time,
        apmStatus: "Pending",
        petName: petName,
        petType: petType,
        petAge: petAge,
        breed: breed,
        service: service
    })


    res.status(200).json(appointment);

});

// @desc    Update Appointmnt
// @route   PUT api/appointment
// @acess   Private
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



// @desc    Delete Appointmnt
// @route   Delete api/appointment
// @acess   Private
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
    getAppoint, sendAppoint, updateAppoint, deleteAppoint
}
