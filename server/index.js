const Sequelize = require('sequelize');
const mysql = require('mysql2')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const transactionRoutes = require("./routes/transactionRoutes")
const database = require ("./database/sqlDb")

console.log(database)
//Express setup
const app = express()
app.use(bodyParser.json());
const port = 3500
app.use(cors());


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })



  
app.use("/transactions", transactionRoutes);




