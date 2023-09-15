const User = require('../models/user');
const BigPromise = require('../middlewares/bigPromise');
const customErrorClass = require('../utils/customError');
const cookieToken = require('../utils/cookieToken');
const cloudinary = require('cloudinary');
// const mailHelper = require('../utils/emailHelper');
const crypto = require('crypto');

exports.signup = BigPromise(async (req, res, next) => {

    if(req.files){
        let file = req.files.photo;

        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: "users",
            width: 150,
            crop: "scale",
        });
        
        const {name, email, username, country, password, phoneNumber} = req.body;

        if(!email || !password || !name || !username || !country || !phoneNumber){
            return next(new customErrorClass('Name, Email and password are required', 400));
        }

        

        const user = await User.create({
            name,
            email,
            username,
            country,
            phoneNumber,
            password,
            photo : {
                id: result.public_id,
                secure_url: result.secure_url,
            },
        });

        cookieToken(user, res);

    } else {
        const {name, email, username, country, password, phoneNumber} = req.body;

        if(!email || !password || !name || !username || !country || !phoneNumber){
            return next(new customErrorClass('Name, Email and password are required', 400));
        }

        

        const user = await User.create({
            name,
            email,
            username,
            country,
            phoneNumber,
            password,
        });

        cookieToken(user, res);

    }
});

exports.login = BigPromise(async (req, res, next) => {
    const {email, password} = req.body;

    // checking for presence of email and password
    if(!email || !password){
        return next(new customErrorClass(`please provide email and password`, 400));
    }

    // getting user from database
    const user = await User.findOne({email}).select("+password");

    // checking if user exist or not
    if(!user){
        return next(new customErrorClass(`Email or password does not match or not exist`, 400));
    }

    // matching the password
    const isCorrectPassword = await user.isValidatedPassword(password);

    // if password doesn't match
    if(!isCorrectPassword){
        return next(new customErrorClass(`Email or password does not match or not exist`, 400));
    }

    // if everything goes good we send token
    cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
    // clearing token from  cookies
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    // success message
    res.status(200).json({
        success: true,
        message: "Logout Successfull !!!"
    });
});

exports.getLoggedInDetails = BigPromise(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    // sending response here
    res.status(200).json({
        success: true,
        user
    });
    
});
