const nodemailer = require("nodemailer");

async function sendMail(mailData) {
  const { senderName, recevierEmail, subject, message } = mailData;

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
      to: `${recevierEmail}`,
      subject: `${subject}`,
      html: `${message}`,
    };

    // send mail with defined transport object
    let result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = sendMail;
