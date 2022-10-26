var express = require("express");
var router = express.Router();

/////////////////////// for authentication /////////////////////
router.use((req, res, next) => {
  if (req.session.authenticated == true) {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});

module.exports = router;
////////////////////////////////////////////////////////////////
