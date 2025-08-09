// db.js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const logger = require("./logger");

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
});

pool.on("connection", (connection) => {
  logger.info(`New connection established with ID: ${connection.threadId}`);
});

pool.on("acquire", (connection) => {
  connection.startTime = Date.now();
  logger.info(`Connection with ID: ${connection.threadId} acquired`);
});

pool.on("release", (connection) => {
  const endTime = Date.now();
  const duration = endTime - connection.startTime;
  logger.info(`Connection with ID: ${connection.threadId} released`);
  logger.info(`Query lasted ${duration} ms`);
});

(async () => {
  try {
    const conn = await pool.getConnection();
    logger.info("✅ Connected to MySQL database.");
    conn.release();
  } catch (err) {
    logger.error("❌ Unable to connect to MySQL:", err.message);
  }
})();

module.exports = pool;
