const mysql = require('mysql2')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const transactionRoutes = require("./routes/transactionRoutes")
const holdingsRoutes = require("./routes/holdingsRoutes")
const loginRoutes = require("./routes/loginRoutes")
const database = require ("./database/sqlDb")
const cookieParser = require('cookie-parser')

//Express setup
const app = express()
app.use(bodyParser.json());
const port = 3500
app.use(cors({
  origin : "http://localhost:3000",
  credentials : true
}));
require('dotenv').config();

const jwtAuth = require('./utility/jwtAuth')


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

app.use(cookieParser())

app.use("/accounts", loginRoutes);

app.use(jwtAuth.authenticateJWT)
app.use("/transactions", transactionRoutes);
app.use("/holdings", holdingsRoutes);



