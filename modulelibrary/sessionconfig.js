require("dotenv").config();
var express = require("express");
var router = express.Router();

const session = require("express-session");
const mysqlstore = require("express-mysql-session")(session);
var db = require("./databaseconn");

var sessionstore = new mysqlstore(
  {
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
      tableName: "sessiontbl",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db
);

sessionstore.close();

const sessionMiddleware = session({
  key: "sessid",
  secret: process.env.SECRETKEY,
  store: sessionstore,
  resave: false,
  saveUninitialized: false, //it is originally true
  //proxy: true, // remove if no proxy in front
  cookie: { secure: true, sameSite: "lax" }, //set to true if https
});

router.use(sessionMiddleware);

module.exports = router;
