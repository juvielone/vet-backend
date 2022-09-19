
// @desc middleware handling exceptions inside of async 
// express routes and passing them to our express error handlers
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Owner = require('../models/ownerModel');



// @desc    Registers User
// @route   POST api/owners/register
// @acess   Public
const registerUser = asyncHandler(async (req, res) => {
    const { fname, lname, email, phone, city, streetNo, password } = req.body

    //Checks all null fields
    if (!fname || !lname || !email || !phone || !city || !streetNo || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Checks if user exists
    const userExists = await Owner.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('Email already registered')
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await Owner.create({
        fname,
        lname,
        email,
        phone,
        streetNo,
        city,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            phone: user.phone,
            streetNo: user.streetNo,
            city: user.city,
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }

})





// @desc    Authenticate User
// @route   POST api/owners/login
// @acess   Public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await Owner.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            phone: user.phone,
            streetNo: user.streetNo,
            city: user.city,
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }


})



// @desc    Get user info
// @route   POST api/owners/me
// @acess   Private
const getMe = asyncHandler(async (req, res) => {

    res.status(200).json(req.user)

})











// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}



module.exports = {
    registerUser, loginUser, getMe
}


