const express = require("express");
const app = express();
const cors = require('cors');

const port = 3008;

app.use(cors());

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

app.get("/users", (req, res) =>
  res.json(users)
);

app.get("/users/:id", (req, res) => {
    let id = parseInt(req.params.id)
    if (id >= 0 && id <= 3) {
      let index = id - 1
      res.json(users[index])
    }
      
    res.json({"msg": "user doesn't exist"})
	}
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

