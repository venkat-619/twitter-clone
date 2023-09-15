const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [40, 'Name should be under 40 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        validate: [validator.isEmail, 'Please enter email in correct format'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Please provide an username'],
        unique: [true, 'Please provide new username since previous one is taken by other person...']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'password should be atleast 6 char'],
        select: false
    },
    country: {
        type: String,
        required: [true, 'Please provide a country']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide a Phone number'],
        minlength: [10, 'Please provide valid 10 digit phone number'],
        maxlength: [10, 'Please provide valid 10 digit phone number']
    },
    photo: {
        id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// encrypt password before save - HOOKs
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// method
// validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function(userSendPassword) {
    return await bcrypt.compare(userSendPassword, this.password);
};

// create and return jwt token
userSchema.methods.getJwtToken = function() {
    return jwt.sign(
        {id : this._id}, // payload
        process.env.JWT_SECRET, // signature
        {expiresIn: process.env.JWT_EXPIRY} // expiry
    );
};

// generate forgot password token (string)
userSchema.methods.getForgotPasswordToken = function(){
    // generate a lnog and random string
    const forgotToken = crypto.randomBytes(20).toString('hex');

    // getting a hash - make sure to get a hash on backend
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex');

    // time of token expiry is 20 min
    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

    return forgotToken;
}

module.exports = mongoose.model('User', userSchema);