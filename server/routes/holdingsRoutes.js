const express = require('express');
const router = express.Router();
const pool = require("../database/sqlDb");
const axios = require("axios")

function roundToX(num, X) {    
    return +(Math.round(num + "e+"+X)  + "e-"+X);
}

router.get("/selectHoldings", (req, res) => {
    
    const retrieveRequest = "SELECT S.symbol ticker, (SUM(T.quantity) - (SELECT SUM(T.quantity) quantity FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'SELL' GROUP BY ticker) ) quantity, ROUND(AVG(T.price),2) cost FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'BUY' GROUP BY ticker "

    pool.query(retrieveRequest, async (err, result) => {
        if (err) throw err;

        let i = 0

        let apiPromises = []

        while (i <= result.length-1) {
            const options = {
                method: 'GET',
                url: 'https://alpha-vantage.p.rapidapi.com/query',
                params: {
                function: 'GLOBAL_QUOTE',
                symbol: result[i]["ticker"],
                datatype: 'json'
                },
                headers: {
                    'content-type': 'application/octet-stream',
                    'X-RapidAPI-Key': process.env.VANTAGE_API_KEY,
                    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
                    }
                  }
                
                apiPromises.push(axios(options))
                i++;

        }

        await Promise.all(apiPromises).then((resolve,reject) => {

            resolve.forEach((element) => {
                for (let i = 0; i < result.length; i++) {
                    console.log(result[i]["ticker"])
                    console.log(element.data['Global Quote']['01. symbol'])
                    if(result[i]["ticker"] === element.data['Global Quote']['01. symbol']) {
                        result[i].marketValue = roundToX((element.data['Global Quote']['05. price'] * result[i]["quantity"]), 2)
                        console.log(result)
                    }
                }
            })
            
        })

        result = JSON.stringify(result)        
        res.json(result)
    })
})


retrieveEndOfDayHoldings = "SELECT S.symbol ticker, SUM(T.quantity) quantity, ROUND(AVG(T.price),2) cost, DATE(T.transaction_date) date FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id GROUP BY S.symbol, DATE(T.transaction_date) "

// pool.query(retrieveRequest, async (err, result) => {
//     if (err) throw err;

//     let i = 0

//     let apiPromises = []

    

    
// })

module.exports = router;