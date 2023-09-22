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

const request = "SELECT MAX(S.security_id) ,S.symbol ticker,((SUM(T.quantity) - (SELECT SUM(T.quantity) quantity FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'SELL' GROUP BY ticker) )/ ((SUM(T.quantity) - (SELECT SUM(T.quantity) quantity FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'SELL' GROUP BY ticker) ))) Weight ,(SUM(T.quantity) - (SELECT SUM(T.quantity) quantity FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'SELL' AND profile_id = 1 GROUP BY ticker) ) quantity, ROUND(AVG(T.price),2) cost FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'BUY' AND T.profile_id = 1 GROUP BY ticker"

const retrieveRequest = "SELECT MAX(S.security_id) SecID ,S.symbol ticker, SUM(T.quantity) quantity, ROUND(AVG(T.price),2) cost FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE transactionType = 'BUY' AND T.profile_id = ? GROUP BY ticker"



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

// cron.schedule('0 0 18 * * 1-5', () => {

const getProfiles = "SELECT profile_id FROM profiles ORDER BY profile_id ASC"

    pool.query(getProfiles, (err, res) => {
        if (err) throw err;

        let profile_ids = res

        
        for (let j = 0; j < profile_ids[profile_ids.length-1].profile_id; j++) {

  

            if(profile_ids[j]) {

            pool.query(retrieveRequest,  [profile_ids[j].profile_id], async (err, result) => {
                if (err) throw err;
  
                result = result.filter((element) => element.quantity > 0)

                let i = 0

                apiPromiseData = []

                while (i <= result.length - 1) {

                    if(result.length > 0) {
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

                        await makeApiRequestWithDelay(options, 100000).then((result) => {

                            console.log("one")

                            data = {
                                ticker : result['Global Quote']['01. symbol'],
                                price : result['Global Quote']['05. price'],
                                prevClosePrice : result['Global Quote']['08. previous close']
                            }

                            apiPromiseData.push(data)

                        })
                    }
                        
                        i++;

                }

                let SumOfMarketValues = 0;
                // if(result.length > 0) {
                    console.log(result)
                    console.log(apiPromiseData)
                    for (let t = 0; t < apiPromiseData.length; t++) {

                        result.forEach((element) => {

                            
    
                            if(element["ticker"] === apiPromiseData[t]["ticker"] && element["quantity"] != 0) {

                                    // console.log(element["ticker"])
                                    // console.log(apiPromiseData[t]["ticker"])
                                    // console.log(element["quantity"])
    
                                    element.marketValue = roundToX((apiPromiseData[t]['price'] * element["quantity"]), 2)
    
                                    SumOfMarketValues += element.marketValue
    
                                    element.dailyStockReturn = roundToX((((apiPromiseData[t]["price"] - apiPromiseData[t].prevClosePrice)/apiPromiseData[i].prevClosePrice)*100),2)

                                    // console.log(element)
                                }
                        })
    
                    }

                    // console.log(result)
                
                    
                for (let i = 0; i < apiPromiseData.length; i++) {

                    result.forEach((element) => {

                        if(element["ticker"] === apiPromiseData[i]["ticker"] && element["quantity"] != 0) {
                                element.weight =  roundToX(element.marketValue / SumOfMarketValues, 2)
                                
                            }
                            
                    })

                }

            insertRequest = "INSERT INTO stockgamedata.HOLDINGS (profile_id, security_id, securityMarketValue, dailyStockReturn, portfolioWeight, quantity, holdings_date) VALUES (?) "

            let now = new Date()
            nowDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');

                for (let i = 0; i < result.length; i++){

                    

                        newRow = [
                            profile_ids[j].profile_id,
                            result[i]["SecID"],
                            result[i]["marketValue"],
                            result[i]["dailyStockReturn"],
                            result[i]["weight"],
                            result[i]["quantity"],
                            nowDate
                        ]

                        // console.log(result)

                    pool.query(insertRequest, [newRow], (err, result) => {
                        if (err) throw err;
                        // console.log(result)
                        // console.log("success")

                    })
                
            }

        // }
      
    })
    
            }
    
    
}})
// }
// , 
// {
//     scheduled: true,
//     timezone: "America/New_York"
//   });

