const User = require("../models/user");
const Apikey = require("../models/apiKey");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const sendMail = require("../services/sendmail");

const TEST_MAIL = "developer@example.com";

// Generate API key
const generateApikey = uuid;

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check user
    const users = await User.find({ email });
    if (users.length && email !== TEST_MAIL) {
      return res.send("This email is already used!");
    }

    const apikey = generateApikey();
    const hashedApikey = await bcrypt.hash(apikey, 10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      apikey: hashedApikey,
      password: hashedPassword,
    });
    const key = new Apikey({
      user: email,
      apikey: hashedApikey,
    });

    await key.save();
    await user.save();

    // Mail user with api key
    try {
      sendMail(
        "Dev Mail",
        email,
        "Dev Mail API key",
        `Your apikey for your account ${email} is ${apikey}`,
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error.response.body.errors);
    }

    // Success msg
    res.send(`The apikey successfully sent to ${email}`);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = (req, res) => {
  res.send("Logging in user");
};

module.exports = {
  registerUser,
  loginUser,
};
