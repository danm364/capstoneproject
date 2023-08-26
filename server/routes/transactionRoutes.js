const express = require('express');
const router = express.Router();
const pool = require("../database/sqlDb");

router.post("/buy", (req, res) => {

    data = req.body

    pool.query("SELECT security_id FROM security WHERE symbol = ?", [data.ticker], (err, result) => {
        if (err) 
        {
            console.log(err)
        }
        else {
            let secID = result[0].security_id

            values = [[data.profile, data.transactionType, secID, data.price, data.quantity, data.date]]

            let buyRequest = 'INSERT INTO stockgamedata.transactions (profile_id, transactionType, security_id, price, quantity, transaction_date) VALUES ?';

            pool.query(buyRequest, [values], (err, result) => {
                if (err) 
                {
                    console.log(err)
                }
                else {
                    result = {
                        ticker: data.ticker,
                        price: data.price
                    }
                    console.log("1 record inserted")
                    res.send(result)
                }
            })
        }
    })

    
    
    
})

router.post("/sell", (req, res) => {
    data = req.body
   
    
    pool.query("SELECT security_id FROM security WHERE symbol = ?", [data.ticker], (err, result) => {

        if (err) 
        {
            console.log(err)
        }
        else {
            let secID = result[0].security_id

            values = [[data.profile, data.transactionType, secID, data.price, data.quantity, data.date]]
    
            const sellRequest = 'INSERT INTO stockgamedata.transactions (profile_id, transactionType, security_id, price, quantity, transaction_date) VALUES ?'; 
            
            pool.query(sellRequest, [values], (err, result) => {
                if (err) throw err;
            
                
            })

            result = {
                ticker: data.ticker,
                price: data.price
            }
    
            res.send(result)
        }
    })
 
})



router.get("/retrieveTrans", (req, res) => {
  

    const retrieveRequest = "SELECT T.transaction_id, T.transactionType, S.symbol, T.price, T.quantity, T.transaction_date FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id ORDER BY transaction_date DESC LIMIT ?"

    pool.query(retrieveRequest, [15], (err, result) => {
        if (err) throw err;

        result = JSON.stringify(result)

        res.json(result)
    })
})

module.exports = router;