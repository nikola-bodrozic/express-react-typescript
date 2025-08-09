const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const cors = require("cors");
const { validationResult } = require("express-validator");
const { validateBody } = require("./validateBody");
const logger = require('./logger')
const port = 4000;
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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
    name: "ed",
  },
];
const apiUrl = "/api/v1";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
});

pool.on('connection', (connection) => {
  logger.info(`New connection eeeeestablished with ID: ${connection.threadId}`);
});

pool.on('acquire', (connection) => {
  connection.startTime = Date.now();
  logger.info(`Connection with ID: ${connection.threadId} acquired`);
});

pool.on('release', (connection) => {
  const endTime = Date.now();
  const duration = endTime - connection.startTime;
  logger.info(`Connection with ID: ${connection.threadId} released`);
  logger.info(`Query lasted ${duration} ms \n`);
});

// test connection to database - curl localhost:4000/api/v1/task/1
app.get(`${apiUrl}/task/:id`, async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  const sqlQuery = 'SELECT * FROM tasks WHERE id = ?';
  try {
    const [rows] = await pool.execute(sqlQuery, [id]);
    res.json(rows);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Database query error' });
  }
});

app.get(`${apiUrl}/users`, (req, res) => {
  res.json(users);
});

app.get(`${apiUrl}/users/:id`, (req, res) => {
  const result = getUser(req.params.id);
  res.json(result);
});

getUser = (id) => {
  if (id > 3)
    return {
      msg: "user doesn't exist",
    };
  return users[id - 1];
};

// curl -d '{"foo":"mandatory string", "bar":"optional string", "baz":[{"lang":"en"},{"lang":"fr"}]}' -H "Content-Type: application/json" -X POST http://localhost:3008/validate
app.post("/validate", validateBody, (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send(req.body);
});


// Health Check Endpoint for Kubernetes probes
app.get(`${apiUrl}/health`, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release(); // release immediately just to test connectivity

    const freeConnections = pool.pool._freeConnections.length;
    const totalConnections = pool.pool._allConnections.length;
    const usedConnections = totalConnections - freeConnections;

    res.status(200).send(
      `OK: Service and Database are healthy.\n` +
      `Connections — Total: ${totalConnections}, Used: ${usedConnections}, Free: ${freeConnections}`
    );
  } catch (error) {
    logger.error(`Health check failed: Database connection error: ${error.message}`);
    res.status(503).send('ERROR: Database connection failed.');
  }
});


const server = app.listen(port, '0.0.0.0', () =>
  console.log(`Node API up at http://localhost:${port}`)
);

module.exports = { app, server };
