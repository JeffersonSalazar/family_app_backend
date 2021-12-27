// // require file (auth_s)
// const AUTH_S = require('../database/schema/auth_s');
// const AUTHENTICATE = require('../routes/middlewares/authorizations/authenticate');

// require('dotenv').config();

// // require {router} of express package
// let router = require('express').Router();

// // require { validator - bcryptjs - jsonwebtoken }
// let { body, validationResult } = require('express-validator'),
//     bcrypt = require('bcryptjs'),
//     jwt = require('jsonwebtoken');

// const mailgun = require("mailgun-js");
// const DOMAIN = process.env.MAILGUN_DOMAIN;
// const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

// router.put('/forgot', async (req, res) => {
//     let { email } = req.body;

//     const DATA_EMAIL = await AUTH_S.findOne({ email });
//     if (!DATA_EMAIL) {
//         return res.status(401).json({ err: 'This email is no exist' });
//     } else {
//         const TOKEN = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '20m' });

//         const data = {
//             from: 'noreply@info.com',
//             to: email,
//             subject: 'Reset password',
//             html: `
//                 <h2>Haga click en el enlace para formatiar la contraseña</h2>
//                 <p>${process.env.URL_ACTIVE}/reset_password/${TOKEN}</p>
//             `
//         }

//         mg.messages().send(data, function (err, body) {
//             if (err) {
//                 return res.status(401).json({ error: err.message });
//             } else {
//                 return res.json({ msn: 'the email send, follow the instructions' });
//             }
//         });
//     }

//     // return email.updateOne({ resetLink: TOKEN }, (err, success) => {
//     //     if (err) {
//     //         return res.status(400).json({ err: 'reset password link error' });
//     //     } else {
//     //         mg.messages().send(data, function (err, body) {
//     //             if (err) {
//     //                 return res.status(401).json({ error: err.message });
//     //             } else {
//     //                 return res.json({ msn: 'the email send, follow the instructions' });
//     //             }
//     //         });
//     //     }
//     // });
// })


// router.put('/change', async (req, res) => {

//     let { email, password, newPassword, confirmPassword } = req.body;

//     // const ERROR_EMAIL = await AUTH_S.findOne({ email });
//     // if (!ERROR_EMAIL) return res.status(400).json({ err: 'this email is wrong' });

//     // const ERROR_PASS = await bcrypt.compare(password, ERROR_EMAIL.password);
//     // if (!ERROR_PASS) return res.status(400).json({ err: 'this password is wrong' });

//     // if (newPassword !== confirmPassword) {
//     //     return res.status(400).json({ err: 'this passwords dont equal' });
//     // } else {
//     //     password = confirmPassword;
//     // }

//     // const UPDATE = {
//     //     password
//     // }

//     // await AUTH_S.findByIdAndUpdate('61ba7e92078c1ab3c3c88c08', UPDATE, (err, result) => {
//     //     (err) ? res.status(400) : res.json({ update: result });
//     // });

//     res.json({ resBack: 'enpoint correct' });
// })

// // export file (auth_r)
// module.exports = router;









