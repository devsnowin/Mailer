const sendMail = require("../services/sendmail");

const postMail = async (req, res) => {
  const { senderName, recevierEmail, subject, message } = req.body;
  const mailData = {
    senderName,
    recevierEmail,
    subject,
    message,
  };
  try {
    sendMail(mailData).then((result) =>
      res.status(200).json({ result, message: "success" }),
    );
  } catch (err) {
    res.status(400).json({ error: err, message: err.message });
  }
};

module.exports = postMail;
