require('dotenv').config();
const mysql = require("mysql2")

const pool = mysql.createPool({
    host: process.env.HOST,
    port: 3306,
    user: process.env.USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DB
    
})


module.exports = pool