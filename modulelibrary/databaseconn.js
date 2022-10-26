// requires mysql
require("dotenv").config();
const mysql = require("mysql");

// create connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
});

//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("App Connected to Mysql...");
});

module.exports = db;
