const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) =>
  res.json(
    { "msg": "welcome to API" }
  )
);

app.get("/users", (req, res) =>
  res.json([
    { id: 1, name: "ronald" },
    { id: 2, name: "jacob" }
  ])
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

