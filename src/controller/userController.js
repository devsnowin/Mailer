const User = require("../models/user");
const { createUser } = require("../middleware/api");

const registerUser = async (req, res) => {
  const { email } = req.body;

  // Check if the user already exists
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.json({ message: "This email is already used!" });
  }

  // Create and store the user in mongoDB
  createUser(req.body)
    .then((result) =>
      res.json({
        result,
        message: `The apikey successfully sent to ${email}`,
      }),
    )
    .catch((err) => res.json({ error: err, message: err.message }));
};

const loginUser = (req, res) => {
  res.send("Logging in user");
};

module.exports = {
  registerUser,
  loginUser,
};

// try {
// } catch (error) {
//   console.log(error.response.body.errors);
// }
