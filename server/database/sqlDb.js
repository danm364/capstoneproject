require('dotenv').config();
const mysql = require("mysql2")

console.log(process.env.DATABASE_PASS)
const pool = mysql.createPool({
    host: process.env.HOST,
    port: 3006,
    user: process.env.USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DB
    
})

pool.execute("select * from stockgamedata.transactions", function (err, result) {
    if (err) throw err;

    console.log(result)
})



module.exports = pool