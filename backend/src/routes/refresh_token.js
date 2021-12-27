// const refreshToken = jwt.sign(
//     { name, email, password: encryptPass }, process.env.JWT_REFRESH, { expiresIn: '10m' }
// );

// router.post('/refresh_token', AUTHENTICATE, async (req, res) => {

//     jwt.verify(req.token, process.env.JWT_KEY, { expiresIn: '20m' }, (err, decoded) => {
//         if (err) return res.status(400).json({ msn: 'el token caduco o es incorrecto intenta nuevamente' })

//         const refreshToken = jwt.sign({ decoded }, process.env.JWT_KEY, { expiresIn: '20s' });

//         MAIL_M.sendMailRefreshToken(decoded.name, decoded.email, refreshToken);
      
//         res.json({
//             name: decoded.name,
//             email: decoded.name,
//             // es posible que resBack y token no lo usemos
//             resBack: 'refresh email send',
//             refreshToken: refreshToken,
//         });
//     })
// })

// router.post('/active_account_refresh_code', (req, res) => {

//     let { token } = req.body

//     if (!token) return res.status(400).json({ errBack: 'there is no token to verify' });

//     jwt.verify(token, process.env.JWT_REFRESH, { expiresIn: '20m' }, async (err, decoded) => {
//         if (err) {
//             return res.status(400).json({ errBack: 'invalid or expired token, please try again' });
//         } else {

//             let { name, email, password } = decoded;

//             const EXIST_EMAIL = await AUTH_S.findOne({ email });
//             if (EXIST_EMAIL) return res.status(400).json({ errBack: 'this email already have account' });

//             const SIGNUP_USER = new AUTH_S({
//                 name, email, password
//             });

//             SIGNUP_USER.save();

//             res.json({
//                 name: name,
//                 email: email,
//                 resBack: 'user register successfully',
//                 token: token,
//             });
//         }
//     });
// })





// send email

// export method (sendMailRefreshToken)
// exports.sendMailRefreshToken = (name, email, refreshToken) => sendMailRefreshToken(name, email, refreshToken);


// const sendMailRefreshToken = async (name, email, refreshToken) => {

//     /*
//         #02 transporter: this variable stores the createTrans method, 
//         which we will use to generate the email template 
//     */
//     let transporter = createTrans();

//     /*
//         #03 email template generation area: here we use the transporter 
//         variable and its sendMail method to generate the email template
//     */
//     const BODY_MAIL = await transporter.sendMail({
//         from: 'salazarjefferson0210@gmail.com',
//         to: `${email}`,
//         subject: 'Refresh Code',
//         html: `
//             <div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0">
//                 <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
//                     <tbody>
//                         <tr>
//                             <td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top">
//                                 <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
//                                     <tbody>
//                                         <tr>
//                                             <td align="center" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
//                                                 <h2 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">
//                                                     Hi ${name} Thanks for joining.
//                                                 </h2>

//                                                 <p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">
//                                                     Please confirm your account by pressing the following button
//                                                 </p>
//                                             </td>
//                                         </tr>

//                                         <tr>
//                                             <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
//                                                 <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%">
//                                                     <tbody>
//                                                         <tr>
//                                                             <td align="center" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top">
//                                                                 <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important">
//                                                                     <tbody>
//                                                                         <tr>
//                                                                             <td align="center" bgcolor="#1e90ff" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top">
//                                                                                 <a href="http://localhost:3000/active_account/${refreshToken}" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank">
//                                                                                     Confirm Email Address
//                                                                                 </a>
//                                                                             </td>
//                                                                         </tr>
//                                                                     </tbody>
//                                                                 </table>
//                                                             </td>
//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//             <div style="box-sizing:border-box;clear:both;width:100%">
//                 <table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%">
//                     <tbody>
//                         <tr style="font-size:12px">
//                             <td align="center" style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;vertical-align:top;font-size:12px;text-align:center;padding:20px 0" valign="top">
//                                 <p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px">
//                                     © Citlially Company. California Street, Suite 300, Denver, CO 85242 USA
//                                 </p>

//                                 <p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px">
//                                     <a href="#" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank"">GitHub</a>  
//                                     <a href="#" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">LinkedIn</a>
//                                 </p>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         `
//     }).then(() => console.log('refresh email send')).catch((err) => console.log(err));

//     /*
//         #04 body_email return area: finally we return the constant that 
//         the sendMail method stores
//     */
//     return BODY_MAIL;
// }