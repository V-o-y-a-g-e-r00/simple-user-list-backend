const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING + "?sslmode=required",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
