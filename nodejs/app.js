const express = require("express");
const app = express();
const mysql = require('mysql2/promise');
const cors = require("cors");
const { validationResult } = require("express-validator");
const { validateBody } = require("./validateBody");
const port = 4000;
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const delay = 1000;

const users = [
  {
    id: 1,
    name: "ronald",
  },
  {
    id: 2,
    name: "jacob",
  },
  {
    id: 3,
    name: "e",
  },
];
const apiUrl = "/api/v1";

async function connectToDatabase() {
  try {
    const db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      password: process.env.MYSQL_PASSWORD,
    });
    console.log('Connected to the database.');
    return db;
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
    throw err;
  }
}

app.get(`${apiUrl}/task`, async (req, res) => {
  const db = await connectToDatabase();
  try {
    const [results] = await db.query('SELECT title FROM tasks WHERE id = 1');
    setTimeout(() => {
      console.log(results[0])
      res.json(results[0]);
    }, delay);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  } finally {
    await db.end();
  }
});

app.get(`${apiUrl}/users`, (req, res) => {
  res.json(users);
});

app.get("/http503", (req, res) => {
  res.sendStatus(503);
});

app.get(`${apiUrl}/users/id:`, (req, res) => {
  const result = getUser(req.params.id);
  res.json(result);
});

getUser = (id) => {
  if (id > 2)
    return {
      msg: "user doesn't exist",
    };
  return users[id - 1];
};

app.post("/echo", function (req, res) {
  const first = req.body.firstParam;
  const second = req.body.secondParam;
  setTimeout(() => {
    res.send({ first: "test " + first, last: "test " + second });
  }, delay);
});

// curl -d '{"foo":"mandatory string", "bar":"optional string", "baz":[{"lang":"en"},{"lang":"fr"}]}' -H "Content-Type: application/json" -X POST http://localhost:3008/validate
app.post(
  "/validate",
  validateBody,
  (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send(req.body);
  }
);

app.listen(port, () => console.log(`Node API up at http://localhost:${port}`));
