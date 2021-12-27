/*
    { body } express-validator: allows us to validate data 
*/
let { body } = require('express-validator');

/*
    VALIDATION_B: this constant stores the body of the validations 
    that we implement to the data that sent a user
*/
const VALIDATION_B = [
    body('name')
        .trim()
        .matches(/^[a-zA-Z ]{3,50}$/)
        .withMessage('between 3/20 digits no numbers no symbols'),
    body('email')
        .trim()
        .matches(/^[\w]+@{1}[\w]+\.[a-z]{2,3}$/)
        .withMessage('the email is not valid'),
    body('password')
        .trim()
        .matches(/^(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\S{8,16}$/)
        .withMessage('between 8/16 digits minimum 1 capital letter and 1 number no spaces')
];

// export file (validation_b)
module.exports = VALIDATION_B;
