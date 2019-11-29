const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let pool;

if(process.env.NODE_ENV === 'fistest'){
  pool = new Pool({
        connectionString: process.env.DATABASE_URL_TEST,
      });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

exports.query = (text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});
