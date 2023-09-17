const User = require('../models/user');
const BigPromise = require('./bigPromise');
const customErrorClass = require('../utils/customError');
const jwt = require('jsonwebtoken');

exports.isLoggedIn = BigPromise(async (req, res, next) => {
    // header is for mobile sometimes comes from mobile thorugh headers
    // const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
    const token = req.cookies.token;

    if(!token) {
        return next( new customErrorClass(`Login first to access this page ...`, 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
});