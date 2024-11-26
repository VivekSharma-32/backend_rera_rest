const pg = require("pg");

const pool = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

(async () => {
  try {
    await pool.connect();
    // console.log("Connected to the PostgreSQL database successfully!");
  } catch (err) {
    console.error("Failed to connect to the database:", err.stack);
  }
})();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
