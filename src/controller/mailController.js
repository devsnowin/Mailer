const sendMail = require("../services/sendmail");

const postMail = async (req, res) => {
  const { senderName, recevierEmail, subject, message } = req.body;

  // Mail options
  const mailData = {
    senderName,
    recevierEmail,
    subject,
    message,
  };

  // Send mail
  sendMail(mailData)
    .then((result) =>
      res
        .status(200)
        .json({ result, message: "Mail has been sent successfully!" }),
    )
    .catch((err) => res.status(401).json({ error: err, message: err.message }));
};

module.exports = postMail;
