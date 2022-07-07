const bcrypt = require("bcrypt");
const User = require("../models/user");
const { createUser } = require("../middleware/api");

const registerUser = async (req, res) => {
  const { email } = req.body;

  // Check if the user already exists
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(409).json({ message: "This email is already used!" });
  }

  // Create and store the user in mongoDB
  createUser(req.body)
    .then((result) =>
      res.status(201).json({
        result,
        message: `Your account is successfully created and your api key is sent to ${email}`,
      }),
    )
    .catch((err) => res.json({ error: err, message: err.message }));
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(404).json({ message: "User not found1" });
  }

  isVaildPassword = await bcrypt.compare(password, foundUser.password);
  if (isVaildPassword) {
    return res.status(200).json({ user: foundUser, message: "User founded!" });
  }

  res.status(401).json({ message: "Invaild credentials!" });
};

module.exports = {
  registerUser,
  loginUser,
};
