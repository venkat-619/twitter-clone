const User = require('../models/user');
const Tweet = require('../models/tweet');
const BigPromise = require('../middlewares/bigPromise');
const customErrorClass = require('../utils/customError');
const cloudinary = require('cloudinary');
const fs = require('fs');


exports.tweetPost = BigPromise(async (req, res, next) => {
    const user = req.user.id;
    const {tweet_text} = req.body;

    // console.log(req.body.file);

    // if(!req.files){
    //     if(!tweet_text){
    //         return next(new customErrorClass('Please Enter tweet text', 400));
    //     }

    //     let file = req.files.file;
    //     const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    //         folder: "users",
    //         width: 150,
    //         crop: "scale",
    //     });

    //     const user1 = await User.findById(req.user.id);

    //     const tweet = await Tweet.create({
    //         tweet_text,
    //         tweet_image : {
    //             id: result.public_id,
    //             secure_url: result.secure_url,
    //         },
    //         name: user1.name,
    //         username: user1.username,
    //         user: req.user.id
    //     });

    //     res.status(200).json({
    //         success:true,
    //         message: "Tweet was Posted Successfully..."
    //     });
    //     return;
    // }


    if(!tweet_text){
        return next(new customErrorClass('Please Enter tweet text', 400));
    }

    const user1 = await User.findById(req.user.id);


    const tweet = await Tweet.create({
        tweet_text,
        name: user1.name,
        username: user1.username,
        user: req.user.id
    });

    res.status(200).json({
        success:true,
        message: "Tweet was Posted Successfully..."
    });
});

exports.getAllTweets = BigPromise(async (req, res, next) => {
    
    const tweets = await Tweet.find();
    const countTweets = await Tweet.countDocuments();
    const itemsArray = Object.values(tweets);
    

    itemsArray.sort((a, b) => {
        return b.createdAt - a.createdAt;
    });

    const sortedtweets = Object.fromEntries(
    itemsArray.map(item => [item.id, item]) 
    );
    
    res.status(200).json({
        success: true,
        itemsArray,
        countTweets
    });

    console.log({
        success: true,
        itemsArray,
        countTweets
    })

});