const bcrypt = require("bcrypt");
const ApiKey = require("../models/apiKey");
const sendMail = require("../services/sendmail");

const postMail = async (req, res) => {
  const userAPI = req.query.apikey;
  const { senderName, email, subject, message, registeredEmail } = req.body;

  const foundedApikey = await ApiKey.findOne({ user: registeredEmail });

  if (userAPI && foundedApikey) {
    const isVaildApi = await bcrypt.compare(userAPI, foundedApikey.apikey);
    if (isVaildApi) {
      console.log(isVaildApi);
      try {
        sendMail(senderName, email, subject, message).then((result) =>
          res.status(200).send({ result, message: "success" }),
        );
      } catch (err) {
        console.log(err);
        res.send("Invaild api key!");
      }
    } else {
      res.send("Invaild api key!");
    }
  } else {
    res.send("Apikey not found!");
  }

  // if (foundedApikey) {

  // }
};

module.exports = postMail;
