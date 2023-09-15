require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');


const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');


// regular middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

// cookies and file middleware
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// morgan middleware
app.use(morgan('tiny'));


// import all routes here
const user = require('./routes/user');
const tweet = require('./routes/tweet');


// router middleware
app.use('/api/v1', user);
app.use('/api/v1', tweet);

// export app js
module.exports = app;