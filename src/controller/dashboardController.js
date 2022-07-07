const home = (req, res) => {
  res.render("index");
};

const admin = (req, res) => {
  res.render("admin");
};

module.exports = {
  admin,
  home,
};
