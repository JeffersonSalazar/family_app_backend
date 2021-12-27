/* 
    AUTH_S: this constant contains the file 
    where we define the database schema
*/
const AUTH_S = require('../database/schema/auth_s');

/**/
// const AUTHENTICATE = require('./middlewares/authorizations/authenticate')

/* 
    VALIDATION_B: this constant contains the file 
    where We define the body of the validations
*/
const VALIDATION_B = require('./middlewares/validations/auth_v');

/* 
    MAIL_M: this constant contains the file 
    where we define the nodemailer middleware
*/
const MAIL_M = require('./middlewares/emails/mail_m');

/*
    router: this variable contains express and its Router method,
    this allows us to implement post, get, delete, update in the routes 
*/
let router = require('express').Router();

/*
    { validationResult } express-validator: allows us to validate data
    bcryptjs: allows us to encrypt passwords
    jsonwebtoken: allows us to generate a token
*/
let { validationResult } = require('express-validator'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');

/* 
    actions in SIGNUP route: 
    #01 receive the data sent from the frontend, 
    #02 validate the data sent from the frontend, 
    #03 validate that the email does not exist in the database 
    #04 encrypt the password
    #05 generate a token
    #06 implement the nodemailer middleware 
    #07 generate the response
*/
router.post('/signup', VALIDATION_B, async (req, res) => {

    /* 
        #01 data reception area: here we receives the data sent from the 
        frontend through the request
    */
    let { name, email, password } = req.body;

    /* 
    */
    if (!name || !email || !password) return res.status(400).json({ errBack: 'All fields are required' });

    /* 
        #02 data validation area: we use validationResult to verify  
        if the data sent from the frontend comply with the validations 
    */
    const ERR_FIELDS = validationResult(req);
    if (!ERR_FIELDS.isEmpty()) return res.status(400).json({ errBack: ERR_FIELDS.array() });

    /*
        #03 email validation area: we use the file AUTH_S and its 
        findOne method to validate if the email sent by the user is 
        already registered in the database
    */
    const VERIFY_EMAIL = await AUTH_S.findOne({ email });
    if (VERIFY_EMAIL) return res.status(400).json({ errBack: 'this email already in use' });

    /*
        #04 password encryption area: we use bcryptjs and its hash
        method to perform password encryption
    */
    let encryptPass = await bcrypt.hash(password, 10);

    /* 
        #05 token generation area: we use jasonwebtoken and its sign method 
        to generate a token, with this the user will confirm their registration. this
        token receives the same data the from req.body plus the encrypted password 
    */
    const token = jwt.sign(
        { name, email, password: encryptPass }, process.env.JWT_KEY, { expiresIn: '20m' }
    );

    /*
        #06 nodemailer implementation area: here we use the file MAIL
        and its sendMailUser method defined in the nodemailer middleware.
        to send the name, email and token as parameter
    */
    MAIL_M.sendMailUser(name, email, token);

    /*
        #07 response generation area: this is the response we send 
        from the backend to the frontend if SIGNUP is successful
    */
    res.json({
        name: name,
        email: email,
        // es posible que resBack y token no lo usemos
        resBack: 'check your email to activate your account',
        token: token
    });
});


/* 
    actions in ACTIVE-ACCOUNT route: 
    #01 receive the verification token 
    #02 validate that exist a token 
    #03 validate if the token is valid and has not expired 
    #04 decode the token
    #05 validate that the email does not exist in the database 
    #06 register a user
    #07 generate the response
*/
router.post('/active_account', (req, res) => {

    /*
        #01 token reception area: here we do a destructuring that 
        allows us to recover the user's data
    */
    let { token } = req.body

    /*
        #02 token validation area: now we validate that the user enters 
        a token
    */
    if (!token) return res.status(400).json({ errBack: 'there is no token to verify' });

    /*
        #03 token verification area: we use jasonwebtoken and 
        its verify method to validate if the entered token is valid or
        has expired
    */
    jwt.verify(token, process.env.JWT_KEY, { expiresIn: '20m' }, async (err, decoded) => {

        if (err) return res.status(400).json({ errBack: 'invalid or expired token, please try again' });

        /* 
            #04 token decoding area: here we make a destructuring  
        */
        let { name, email, password } = decoded;

        /*
            #05 email validation area: we use the file AUTH_S and its 
            findOne method to validate if the email sent by the user is 
            already have account
        */
        const EXIST_EMAIL = await AUTH_S.findOne({ email });
        if (EXIST_EMAIL) return res.status(400).json({ errBack: 'this email already have account' });

        /*
            #06 user registration area: finally we use the file AUTH_S
            to register the user if the account verification is successful 
        */
        const SIGNUP_USER = new AUTH_S({
            name, email, password
        });

        SIGNUP_USER.save();

        /*
            #07 response generation area: this is the response we send 
            from the backend to the frontend if ACTIVATE_ACCOUNT is successful
        */
        res.json({
            name: name,
            email: email,
            // es posible que resBack y token no lo usemos
            resBack: 'user register successfully',
            token: token,
        });
    });
})


/* 
    actions in SIGNIN route: 
    #01 receive the data sent from the frontend 
    #02 validate that the email exists in the database 
    #03 validate that the password corresponds to the email
    #04 generate a token if signin is successful
*/
router.post('/signin', async (req, res) => {

    /*
        #01 data reception area: here we receives the data sent from the 
        frontend through the request
    */
    let { email, password } = req.body;

    /*
        #02 email validation area: we use the file AUTH_S and its 
        findOne method to validate if the email sent by the user is 
        registered in the database
     */
    const SIGNIN_USER = await AUTH_S.findOne({ email });
    if (!SIGNIN_USER) return res.status(400).json({ errBack: 'the email is not valid' });

    /*
        #03 password validation area: we use bcryptjs and its 
        compare method to validate if the password send by the user 
        corresponds to the email
    */
    const ERROR_PASS = await bcrypt.compare(password, SIGNIN_USER.password);
    if (!ERROR_PASS) return res.status(400).json({ errBack: 'the password is not valid' });

    /*
        #04 token generation area: we use jasonwebtoken and its 
        sign method to generate a token if SIGNIN is successful
    */
    jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '86400' }, (err, token) => {
        (err) ? res.status(400) : res.json({
            name: SIGNIN_USER.name,
            email: SIGNIN_USER.email,
            // es posible que resBack y token no lo usemos
            resBack: 'singnin successful',
            token: token
        });
    });

});


// export file (auth_r)
module.exports = router;