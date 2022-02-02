const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const port = 3008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var connection = mysql.createConnection({
  host: "dbmysql",
  user: "root",
  database: process.env.MY_SQL_DATABASE,
  password: process.env.MYSQL_ROOT_PASSWORD
})
  
const delay = 3000;

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

app.get("/http404", (req, res) => {
  res.sendStatus(404);
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
        res.send({ 'first': first, 'last': second });
    }), delay)
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
