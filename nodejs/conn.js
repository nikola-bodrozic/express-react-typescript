const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: "root",
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_ROOT_PASSWORD,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database");
});

module.exports = connection;
