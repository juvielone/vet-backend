const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Owner = require('../models/ownerModel');

const protect = asyncHandler(async (req, res, next) => {
    let token

    //gets https headers if they have authorization object
    //checks if authorization start with Bearer, where token is
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //@transform.(split) Bearer token = [Bearer, token]
            //@result gets array 1 =  'token'
            token = req.headers.authorization.split(' ')[1]

            //Verfify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await Owner.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorize')
        }
    }


    if (!token) {
        res.status(401)
        throw new Error('Not Authorize, no token')
    }


})

module.exports = {
    protect
}