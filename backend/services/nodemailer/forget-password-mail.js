require('dotenv').config();
const forgetPasswordEmailTemplate=require('./forgetPasswordEmailTemplate.js')

const nodemailer = require('nodemailer');

const forgetPasswordEmail=(userEmail,token)=>{

const transporter = nodemailer.createTransport({
  service: 'gmail',
  type: "SMTP",
  host: "smtp.gmail.com",
  port:587,
  secure:false,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD
  }
});

const mailOptions = {
  from: process.env.MY_EMAIL,
  to: userEmail,
  subject: 'Reset Your Password',
  html:forgetPasswordEmailTemplate(token)
};

transporter.sendMail(mailOptions);

}

module.exports=forgetPasswordEmail;