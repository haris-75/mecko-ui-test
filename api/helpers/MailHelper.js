const nodemailer = require("nodemailer");
const MAIL_CONFIG = require("../config/mail");

const sendMail = async function sendMail (sendTo, emailContent) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(MAIL_CONFIG.MAIL_TRANSPORT);

    // send mail with defined transport object
    return await transporter.sendMail({
        from: 'Meku Emailer', // sender address
        to: sendTo, // list of receivers
        subject: emailContent.subject, // Subject line
        html: `<p>${emailContent.body}</p>` // html body
    })
};

const getPasswordResetTokenEmailTemplate = pswdResetToken => {
    return {
        subject: 'Meku - Password Reset',
        body: `Hi, Please click on the link below to reset your password <a href="http://localhost:3000/user/password-reset?validationToken=${pswdResetToken}">Reset Password</a>`
    }
};

const getNewUserVerificationEmailTemplate  = validationToken => {
    return {
        subject: 'Meku Account Verification',
        body: `Hi, Please click on the link below to verify your account <a href="http://localhost:3000/user/register?validationToken=${validationToken}">Verify your account.</a>`
    }
};



module.exports = {sendMail, getNewUserVerificationEmailTemplate, getPasswordResetTokenEmailTemplate};