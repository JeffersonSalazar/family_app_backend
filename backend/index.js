// requiring and implementing express
let express = require('express'),
    app = express();

// save port number
let port = process.env.PORT || 3000;

/*
    here We require the dotenv file where We have defined our
    environment variables
*/
require('dotenv').config();

// require file (auth_r)
const AUTH_R = require('./src/routes/auth_r');
// const HANDLER_PASS = require('./routes/handler_password');

// require (morgan - cors)
let morgan = require('morgan'),
    cors = require('cors');

// middlewares config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// implementing (auth_r)
app.use('/auth', AUTH_R);
// app.use('/handler_password', HANDLER_PASS);

// config server call
app.listen(port, (err) => {
    (err) ? console.log(err) : console.log(`server on port ${port}`);
});