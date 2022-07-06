const nodemailer = require("nodemailer");
// require("dotenv").config();

async function sendMail(senderName, email, subject, message) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jsnowin6@gmail.com",
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${senderName} <jsnowin6@gmail.com>`,
      to: `${email}`,
      subject: `${subject}`,
      html: `${message}`,
      // html: `${html}`,
    };

    // send mail with defined transport object
    let result = await transporter.sendMail(mailOptions);

    return result;
  } catch (error) {
    return error;
  }
}

module.exports = sendMail;
