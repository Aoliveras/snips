require('dotenv').config();

const pg = require('pg');

// open multiple connection pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
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
