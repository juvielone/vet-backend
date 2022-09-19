const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'Please add first name']
    },

    lname: {
        type: String,
        required: [true, 'Please add last name']
    },

    email: {
        type: String,
        required: [true, 'Please add email']
    },

    phone: {
        type: String,
        required: [true, 'Please add phone number']
    },

    streetNo: {
        type: String,
        required: [true, 'Please add address']
    },

    city: {
        type: String,
        required: [true, 'Please add City']
    },



    password: {
        type: String,
        required: [true, 'Please add password']
    },
})

module.exports = mongoose.model('Owner', ownerSchema)