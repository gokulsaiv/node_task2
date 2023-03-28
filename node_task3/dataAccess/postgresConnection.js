const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  max: 20,
  database: "userData",
  password: "admin",
  port: 5432,
});

module.exports = pool;
