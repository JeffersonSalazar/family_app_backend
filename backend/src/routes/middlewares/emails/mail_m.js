/*
    nodemailer: allows us to configure the sending of an email
    nodemailer-sendgrid: allows us to send the email
*/
let nodemailer = require('nodemailer'),
    nmSendgrid = require('nodemailer-sendgrid');

/* 
    actions in CREATETRANS method: 
    #01 implement nodemailer and its createTransport method
    #02 implement nodemailer-sendgrid method
    #03 return of the createTransport method
*/
const createTrans = () => {

    /*
        #01 nodemailer implementation area: we use nodemailer and its
        createTransport method to create the transport
    */
    const TRANSPORT = nodemailer.createTransport(

        /*
            #02 nodemailer-sendgrid implementation area: we use nodemailer-sendgrid
            this requires an apiKey to send the email
        */
        nmSendgrid({
            apiKey: process.env.SENDGRID_KEY
        })
    );

    /* 
        #03 transport return area: finally we return the constant that 
        the createTransport method stores
    */
    return TRANSPORT;
};

/* 
    actions in SENDMAILUSER method: 
    #01 receive in sendMailUser method the name, email and token parameters 
    #02 create variable to execute nodemailer method
    #03 generate the template to send the email
    #04 return of the createTrans method
*/
const sendMailUser = async (name, email, token) => {

    /*
        #02 transporter: this variable stores the createTrans method, 
        which we will use to generate the email template 
    */
    let transporter = createTrans();

    /*
        #03 email template generation area: here we use the transporter 
        variable and its sendMail method to generate the email template
    */
    const BODY_EMAIL = await transporter.sendMail({
        from: `${process.env.EMAIL_SENDGRID}`,
        to: `${email}`,
        subject: 'Welcome to Citlially Tecnology',
        html: `
            <div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0">
                <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
                    <tbody>
                        <tr>
                            <td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top">
                                <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                                                <h2 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">
                                                    Hi ${name} Thanks for joining.
                                                </h2>

                                                <p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">
                                                    Please confirm your account by pressing the following button
                                                </p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                                                <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top">
                                                                <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" bgcolor="#1e90ff" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top">
                                                                                <a href="http://localhost:3000/active_account/${token}" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank">
                                                                                    Confirm Email Address
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style="box-sizing:border-box;clear:both;width:100%">
                <table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%">
                    <tbody>
                        <tr style="font-size:12px">
                            <td align="center" style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;vertical-align:top;font-size:12px;text-align:center;padding:20px 0" valign="top">
                                <p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px">
                                    © Citlially Company. California Street, Suite 300, Denver, CO 85242 USA
                                </p>

                                <p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px">
                                    <a href="#" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank"">GitHub</a>  
                                    <a href="#" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">LinkedIn</a>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    }).then(() => console.log('send email successful')).catch((err) => console.log(err));

    /*
        #04 body_email return area: finally we return the constant that 
        the sendMail method stores
    */
    return BODY_EMAIL;
}

// export method (sendEmailUser)
exports.sendMailUser = (name, email, token) => sendMailUser(name, email, token);
