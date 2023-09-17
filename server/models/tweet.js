const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    tweet_text: {
        type: String,
        required: [true, 'Please provide a tweet text'],
    },
    tweet_image: {
        id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    name : {
        type: String
    },
    username: {
        type: String
    },
    user_photo_url : {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tweet', tweetSchema);