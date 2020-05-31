const express = require("express");
const app = express();
const port = 3001;

app.get("/users", (req, res) =>
  res.json([
    { id: 1, name: "foo" },
    { id: 2, name: "bar" },
  ])
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

