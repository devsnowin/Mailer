const router = require("express").Router();
const { admin, home } = require("../controller/dashboardController");

router.get("/", home);
router.get("/user/admin", admin);
// router.post("/developer", developer);

module.exports = router;
