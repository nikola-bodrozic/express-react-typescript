const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const port = 3008;

const MY_SQL_HOST = "dbmysql"
const MY_SQL_USER = "root"
const MY_SQL_PASS = process.env.MYSQL_ROOT_PASSWORD
const MY_SQL_DATABASE = process.env.MY_SQL_DATABASE

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var connection = mysql.createConnection({
  host: MY_SQL_HOST,
  user: MY_SQL_USER,
  password: MY_SQL_PASS,
  database: MY_SQL_DATABASE
})
  
const delay = 4000;

const users = [{
    id: 1,
    name: "ronald"
  },
  {
    id: 2,
    name: "jacob"
  },
  {
    id: 3,
    name: "e"
  }
];

app.get("/", (req, res) =>
  res.json({
    "msg": "welcome to API"
  })
);

app.get("/task", (req, res) => {
  connection.query('SELECT title FROM tasks WHERE id = 1', function(err, rows, fields) {
    if (err) throw err
  
    console.log(rows[0].title)
    res.json({
      "task": rows[0].title
    })
  })
});

app.get("/users", (req, res) => {
  setTimeout((() => {
    res.json(users)
  }), delay)
});

app.get("/users/:id", (req, res) => {
  setTimeout((() => {
    const result = getUser(req.params.id)
    res.json(result)
  }), delay)
});

getUser = (id) => {
  if (id > 2) return {
    "msg": "user doesn't exist"
  }
  return users[id - 1];
}

app.post('/echo', function (req, res) {
    const first = req.body.firstParam;
    const second = req.body.secondParam;
    setTimeout((() => {
        //res.sendStatus(503)
        res.send({ 'first': first, 'last': second });
    }), delay)
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
