const express = require("express");
const app = express();
const mysql = require('mysql');

const port = 3008;

const MY_SQL_HOST = "dbmysql"
const MY_SQL_USER = "root"
const MY_SQL_PASS = process.env.MYSQL_ROOT_PASSWORD
const MY_SQL_DATABASE = "sampledb"

var connection = mysql.createConnection({
  host: MY_SQL_HOST,
  user: MY_SQL_USER,
  password: MY_SQL_PASS,
  database: MY_SQL_DATABASE
})

connection.connect()

var taskName = '';

connection.query('SELECT title FROM tasks WHERE id = 1', function (err, rows, fields) {
  if (err) throw err

  taskName = rows[0].title;
})

connection.end()

const users = [
   { id: 1, name: "ronald" },
   { id: 2, name: "jacob" },
   { id: 3, name: "e"}
 ];

app.get("/", (req, res) =>
  res.json(
    { "msg": "welcome to API" }
  )
);

app.get("/task", (req, res) =>
  res.json(
    { "task": taskName }
  )
);

app.get("/users", (req, res) =>
  res.json(users)
);

app.get("/users/:id", (req, res) => {
		const result = getUser(req.params.id)
		res.json(result)
	}
);

getUser = (id) => {
	if (id > 2) return {"msg": "user doesn't exist"}
	return users[id-1];
}

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

