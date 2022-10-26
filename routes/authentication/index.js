var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer();

const Joi = require("joi");

const bcrypt = require("bcrypt");
var auth = require("../modulelibrary/authsession");
const { user1auth } = require("../../models/user1");
const { user1auth2 } = require("../../models/user1");
const { updateuser1loggedin } = require("../../models/user1");

async function loginauth(req, res, next) {
  const { username, password } = req.body;
  var schema = Joi.object().keys({
    username: Joi.string().invalid("undefined").min(1).required(),
    password: Joi.string().invalid("undefined").min(1).required(),
  });
  var dataToValidate = {
    username: username,
    password: password,
  };
  const validationresult = await schema.validate(dataToValidate);
  if (validationresult.error == null) {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

/////////////////////// for login page /////////////////////
router.use("/login", upload.none(), loginauth, user1auth, async (req, res) => {
  const { password } = req.body;
  var results = res.locals.results;
  if (
    results &&
    results != "none" &&
    (await bcrypt.compare(password, results[0].password))
  ) {
    console.log("Success Login");
    req.session.authenticated = true;
    req.session.userid = results[0].id;
    req.session.lastname = results[0].lastname;
    req.session.firstname = results[0].firstname;
    setTimeout(user1auth2, 5000, req);
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});
//////////////////////////////////////////////////////////////

router.use("/checkuser", auth, (req, res) => {
  res.send(JSON.stringify([{ id: "loggedin" }]));
  res.end();
});
///////////////////////////////////////////////////////////////

router.use("/logout", auth, (req, res) => {
  updateuser1loggedin(req.session.userid, "offline");
  req.session.destroy();
  res.clearCookie("sessid");
  res.send(JSON.stringify([{ id: "done" }]));
  res.end();
});

module.exports = router;
