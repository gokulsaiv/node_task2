require('dotenv').config()
const password=process.env.SECRET_KEY;

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  max: 20,
  database: "userData",
  password: password,
  port: 5432,
});

module.exports = pool;
