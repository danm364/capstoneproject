const express = require('express');
const router = express.Router();
const pool = require("../database/sqlDb");
const axios = require("axios")

router.post("/selectHoldings", (req, res) => {
    
    // const retrieveRequest = "SELECT MAX(S.security_id) SecID ,S.symbol ticker, (SUM(T.quantity) - (SELECT SUM(T.quantity) \
    // quantity FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id \
    // WHERE transactionType = 'SELL' GROUP BY ticker) ) quantity, ROUND(AVG(T.price),2) cost \
    // FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'BUY' GROUP BY ticker "
    // const hello = "(SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY) AS yesterday)"

    const retrieveRequest = "SELECT S.Symbol ticker, ROUND(AVG(T.price),2) cost, MAX(H.securityMarketValue) marketValue, MAX(H.dailyStockReturn) stockReturn, MAX(H.portfolioWeight) portfolioWeight FROM holdings H INNER JOIN security S ON S.security_id = H.security_id INNER JOIN transactions T ON T.security_id = H.security_id WHERE DATE(H.holdings_date) = CURDATE() AND H.profile_id = ? GROUP BY ticker "

    pool.query(retrieveRequest, [[req.body.currentAccount.currentAccount]], (err, result) => {
        if (err) throw err;

        result = JSON.stringify(result)        
        res.json(result)
    })

})


// retrieveEndOfDayHoldings = "SELECT S.symbol ticker, SUM(T.quantity) quantity, ROUND(AVG(T.price),2) cost, DATE(T.transaction_date) date FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id GROUP BY S.symbol, DATE(T.transaction_date) "

// pool.query(retrieveRequest, async (err, result) => {
//     if (err) throw err;

//     let i = 0

//     let apiPromises = []

    

    
// })

module.exports = router;