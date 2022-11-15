const express = require("express");
const app = express();
const connection = require("./conn");
const cors = require("cors");
const { validationResult } = require("express-validator");
const { validateBody } = require("./validateBody");
const port = 3008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const delay = 3000;

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

app.get("/", (req, res) =>
  res.json({
    msg: "welcome to API",
  })
);

app.get("/task", (req, res) => {
  connection.query(
    "SELECT title FROM tasks WHERE id = 1",
    function (err, rows, fields) {
      if (err) throw err;
      setTimeout(() => {
        console.log(rows[0].title);
        res.json({
          task: rows[0].title,
        });
      }, delay);
    }
  );
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/http503", (req, res) => {
  res.sendStatus(503);
});

app.get("/users/:id", (req, res) => {
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
