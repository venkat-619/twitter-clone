const express = require('express');
const router = express.Router();

const {signup, 
        login, 
        logout,
        getLoggedInDetails} = require('../controllers/userController');


const { isLoggedIn} = require('../middlewares/user');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/userdashboard').get(isLoggedIn, getLoggedInDetails);


module.exports = router;