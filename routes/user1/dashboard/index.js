var express = require("express");
var router = express.Router();

const multer = require("multer");

var uniqid = require("uniqid");
// const Joi = require("joi");

var auth = require("../../modulelibrary/authsession");
const { updateuser1loggedin } = require("../../../models/user1");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uniqid() + "--" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false); // else fails
  }
}

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });

///////////////// express with socket autologout ////////////
router.use(auth, (req, res, next) => {
  function autologout(socketid) {
    if (socketid == req.app.socket.id) {
      updateuser1loggedin(req.session.userid, "offline");
      req.session.destroy();
    }
    return;
  }
  updateuser1loggedin(req.session.userid, "online");
  req.app.socket.on("disconnect", () => {
    setTimeout(autologout, 5000, req.app.socket.id);
    console.log("Disconnected: inside" + req.app.socket.id);
    req.app.socket.disconnect(true);
  });
  next();
});

/////////////////////// for dashboard page ///////////////////
router.use("/dashboard", (req, res) => {
  try {
    console.log(
      "Connected: " + req.app.socket.id + " node1 \nmy ip is " + req.ip
    );
    req.app.socket.emit(
      "chat-message",
      "from server" + " node1 \nmy ip is " + req.ip
    );
    res.send(
      JSON.stringify([
        {
          id: "loggedin",
          name:
            "Hello World! " +
            req.session.lastname +
            " " +
            req.session.firstname +
            " Welcome",
        },
      ])
    );
    res.end();
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});
///////////////////////////////////////////////////////////////

router.post("/fileupload", upload.single("file1"), (req, res) => {
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});

module.exports = router;
