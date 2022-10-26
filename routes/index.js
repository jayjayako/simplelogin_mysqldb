var express = require("express");
var router = express.Router();

var authentication = require("./authentication");
var register = require("./register");
var user1 = require("./user1");

router.use("/authentication", authentication);
router.use("/register", register);
router.use("/user1", user1);

module.exports = router;
