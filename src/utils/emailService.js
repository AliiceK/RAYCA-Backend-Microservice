const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

module.exports = { sendEmail };
