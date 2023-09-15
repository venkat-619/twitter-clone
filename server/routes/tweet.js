const express = require('express');
const router = express.Router();

const { tweetPost, getAllTweets} = require('../controllers/tweetController');


const { isLoggedIn} = require('../middlewares/user');

router.route('/tweet').post(isLoggedIn, tweetPost);
router.route('/getalltweets').get(isLoggedIn, getAllTweets)


module.exports = router;