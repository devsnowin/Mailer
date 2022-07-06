const router = require("express").Router();
const postMail = require("../controller/mailController");

router.post("/sendmail/", postMail);

module.exports = router;
