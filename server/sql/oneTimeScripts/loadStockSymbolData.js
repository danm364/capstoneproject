
require('dotenv').config({path: '../../.env'});
const express = require('express');
const router = express.Router();
const axios = require("axios");
const pool = require("../../database/sqlDb");

axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.FINNHUB_API_KEY}`).then((response) => {
    data = response.data

    for (let i = 0; i < data.length; i++) {
        let newRow = [
             data[i].description, data[i].displaySymbol       
        ]

        const loadSymbolDescriptionData = "INSERT INTO stockgamedata.security (name, symbol) VALUES (?)"; 

        pool.query(loadSymbolDescriptionData, [newRow], (err, result) => {
            if (err) throw err;
          
        })
    }  
})




// let retreiveSellQuantity = "SELECT SUM(T.quantity) quantity, S.symbol ticker FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'SELL' AND profile_id = ? GROUP BY S.symbol"

//                 pool.query(retreiveSellQuantity, [profile_ids[j].profile_id], (sellQuantity, err) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         console.log(sellQuantity)
//                     }

//                 })

//                 console.log(result)

                

      
                   

