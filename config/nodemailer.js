const nodemailer = require('nodemailer');

// NODEMAILER CONFIG
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sacadadopredio@gmail.com',
        pass: process.env.SACADA_EMAIL_PASSWORD
    }
});

module.exports = transporter;