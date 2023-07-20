const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({
  host: config.db.host,
  port: config.db.database_port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
});

module.exports = pool;
