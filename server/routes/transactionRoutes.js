const Sequelize = require('sequelize');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const pool = require("../database/sqlDb");

router.post("/buy", (req, res) => {
    data = req.body
    console.log(data)
    values = [[data.profile, data.transactionType, data.ticker, data.price, data.quantity, data.date]]

    let buyRequest = 'INSERT INTO stockgamedata.transactions (profile_id, transactionType, ticker, price, quantity, date) VALUES ?';

    pool.query(buyRequest, [values], (err, result) => {
        if (err) 
        {
            console.log(err)
        }
        else {
            console.log("1 record inserted")
            res.send(result)
        }
        
        
    })
    
    
})

router.post("/sell", (req, res) => {
    data = req.body
    values = [[data.profile, data.transactionType, data.ticker, data.price, data.quantity, data.date]]
    
    const sellRequest = 'INSERT INTO stockgamedata.transactions (profile_id, transactionType, ticker, price, quantity, date) VALUES ?'; 
    

    pool.query(sellRequest, [values], (err, result) => {
            if (err) throw err;
        
            console.log(result)
        })

    res.send('Received post request')
})



router.get("/retrieveTrans", (req, res) => {
  

    const retrieveRequest = "SELECT transaction_id, transactionType, ticker, price, quantity, date FROM stockgamedata.transactions ORDER BY date DESC LIMIT ?"

    pool.query(retrieveRequest, [15], (err, result) => {
        if (err) throw err;
        result = JSON.stringify(result)
        console.log(result)
        res.json(result)
    })
})

module.exports = router;