const express = require('express');
const app = express();
const mysql = require('mysql2')

const db = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "profiles"

})

app.post('/create', (req, res) => {
  const userName = 'dan';
  const positions = 20;

  db.query('INSERT INTO account (userName, positions) VALUES (?, ?)', [userName, positions], (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      res.send("Values inserted")
    }
  })
})

app.listen(3001, ()=> {
  console.log("your server is running on port 3001!")
})