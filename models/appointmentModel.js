const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Owner',
    },

    apmStatus: {
        type: String,
        required: [true, 'Please add City']
    },

    date: {
        type: String,
        required: [true, 'Please add a date']
    },

    time: {
        type: String,
        required: [true, 'Please add a time']

    },

    petName: {
        type: String,
        required: [true, 'Please add a pet name']
    },

    petType: {
        type: String,
        required: [true, 'Please add a pet type']
    },

    petAge: {
        type: String,
        required: [true, 'Please add pet age']
    },

    breed: {
        type: String,
        required: [true, 'Please add a breed']
    },

    service: {
        type: String,
        required: [true, 'Please add service']
    }
})

module.exports = mongoose.model('Appointment', appointmentSchema)