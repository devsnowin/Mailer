const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const User = require("../models/user");
const sendMail = require("../services/sendmail");

const MAX_COUNT = process.env.API_MAX || 25;

const createUser = async (data) => {
  const { name, email, password } = data;
  const API_KEY = uuid();

  // Hash apikey and password
  const hashedApikey = await bcrypt.hash(API_KEY, 10);
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    apikey: hashedApikey,
  });

  // send api key to user's mail
  const mailData = {
    senderName: "Mailer",
    recevierEmail: email,
    subject: "Mailer API key",
    message: `Your apikey for your account ${email} is ${API_KEY}`,
  };
  try {
    await sendMail(mailData)
      .then((res) => res)
      .catch((err) => err);
  } catch (err) {
    return err;
  }

  await user.save();
};

const validatekey = async (req, res, next) => {
  let apikey = req.query.apikey;
  let { registeredEmail } = req.body;

  // find the account with email that has been registered
  let account = await User.findOne({ email: registeredEmail }).exec();

  if (account) {
    (await bcrypt.compare(apikey, account.apikey))
      ? next()
      : res.status(405).send({ error: 405, message: "You are not allowed!." });
  } else {
    res.status(404).send({ error: 404, message: "Account not found!" });
  }
};

module.exports = { MAX_COUNT, createUser, validatekey };
