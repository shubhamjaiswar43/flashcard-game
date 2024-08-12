const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.DB_Host,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});
console.log('database connected!!')

module.exports = connection;
