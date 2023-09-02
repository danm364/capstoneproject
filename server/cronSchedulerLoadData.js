const cron = require ("node-cron");
const express = require('express');
const router = express.Router();
const pool = require("./database/sqlDb");
const axios = require("axios");
const Promise = require("bluebird");
const date = require('date-and-time');



function roundToX(num, X) {    
    return +(Math.round(num + "e+"+X)  + "e-"+X);
}

const request = "SELECT MAX(S.security_id) ,S.symbol ticker, (SUM(T.quantity) - (SELECT SUM(T.quantity) quantity FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'SELL' GROUP BY ticker) ) quantity, ROUND(AVG(T.price),2) cost FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'BUY' GROUP BY ticker"

const retrieveRequest = "SELECT MAX(S.security_id) SecID ,S.symbol ticker, (SUM(T.quantity) - (SELECT SUM(T.quantity) \
                        quantity FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id \
                        WHERE transactionType = 'SELL' GROUP BY ticker) ) quantity, ROUND(AVG(T.price),2) cost \
                        FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'BUY' GROUP BY ticker "



function makeApiRequestWithDelay(options, delay, result) {
    return Promise.delay(delay)
    .then((res) => {
        const data = axios(options)
      return data;
    })
    .then(response => {
      return response.data;
    });
}

cron.schedule('0 0 18 * * 1-5', () => {

    pool.query(retrieveRequest, async (err, result) => {
        if (err) throw err;

        result = result.filter((element) => element.quantity > 0)

        let i = 0

        apiPromiseData = []

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

                await makeApiRequestWithDelay(options, 15000).then((result) => {

                    data = {
                        ticker : result['Global Quote']['01. symbol'],
                        price : result['Global Quote']['05. price']
                    }

                    apiPromiseData.push(data)

                })
                
                i++;

        }

        for (let i = 0; i < result.length; i++) {

            result.forEach((element) => {

                if(element["ticker"] === apiPromiseData[i]["ticker"] && element["quantity"] != 0) {
                        element.marketValue = roundToX((apiPromiseData[i]['price'] * element["quantity"]), 2)
                        
                    }
            })

        }

        insertRequest = "INSERT INTO stockgamedata.HOLDINGS (profile_id, security_id, securityMarketValue, holdings_date) VALUES (?) "

        const profile_id = 1
        const holdings_id = 1
        let now = new Date()
        nowDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');

        for (let i = 0; i < result.length; i++){

            newRow = [
                profile_id,
                result[i]["SecID"],
                result[i]["marketValue"],
                nowDate
            ]

            pool.query(insertRequest, [newRow], (err, result) => {
                if (err) throw err;


            })
        }
    
})}, 
{
    scheduled: true,
    timezone: "America/New_York"
  });

