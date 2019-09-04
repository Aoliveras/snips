require('dotenv').config();

const pg = require('pg');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

// how to reach database
const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
// open multiple connection pool
const pool = new pg.Pool({ connectionString });
// opens a single connection to db
// pool.connect();

module.exports = pool;

// testing the front end connection
// pool
//   .query('SELECT * FROM snippet')
//   .then(res => {
//     console.table(res.rows);
//   })
//   .catch(err => {
//     console.error(err);
//   })
//   .finally(() => {
//     pool.end();
//   });
