const express = require('express');
const router = express.Router();
const pool = require("../database/sqlDb");

router.post("/buy", (req, res) => {

    data = req.body

    //get security symbol

    pool.query("SELECT security_id FROM security WHERE symbol = ?", [data.ticker], (err, result) => {
        if (err) 
        {
            console.log(err)
        }
        else {
            let secID = result[0].security_id

            values = [[data.profile, data.transactionType, secID, data.price, data.quantity, data.date]]

            selectProfileCash = "SELECT MAX(P.CashOnHand) CashOnHand, SUM(T.quantity) totalQuantity FROM profiles P INNER JOIN transactions T ON T.profile_id = P.profile_id WHERE T.profile_id = ? AND T.security_id = ? "

                    pool.query(selectProfileCash, [data.profile, secID], (err, cashAmount) => {
                        if (err) 
                        {
                            console.log(err)
                        }
                        else {

                            selectBuys = "SELECT SUM(quantity) quantityOfBuys FROM transactions WHERE profile_id = ? AND security_id = ? AND transactionType = 'BUY'"

                            pool.query(selectBuys, [data.profile, secID], (err, quantityOfBuys) => {
                                if (err) 
                                {
                                    console.log(err)
                                }
                                else { 
                                        console.log(cashAmount)
     
                                        let CashOnHand = parseFloat(cashAmount[0].CashOnHand)
                                        
                                        let buysMinusSellsQuantity = parseInt(quantityOfBuys[0].quantityOfBuys) - parseInt(cashAmount[0].totalQuantity - parseInt(quantityOfBuys[0].quantityOfBuys)) 
                                        

                                        console.log(CashOnHand)
                                        console.log((data.quantity * data.price))
                                        console.log(buysMinusSellsQuantity)
                                        console.log(data.quantity)

                                        if ((CashOnHand > (data.quantity * data.price)) && (buysMinusSellsQuantity > 0) && (buysMinusSellsQuantity > data.quantity)) {

                                            newCashOnHand = CashOnHand - (data.price * data.quantity)

                                            console.log(newCashOnHand)
                                            
                                        //update CashOnHand after buy is posted

                                            updateCash = "UPDATE profiles SET CashOnHand = ? WHERE profile_id = ? "

                                        pool.query(updateCash, [newCashOnHand, data.profile], (err, success) => {
                                            if (err) 
                                            {
                                                console.log(err)
                                            }
                                            else {

                                                let buyRequest = 'INSERT INTO stockgamedata.transactions (profile_id, transactionType, security_id, price, quantity, transaction_date) VALUES ?';

                                                pool.query(buyRequest, [values], (err, result) => {
                                                    if (err) 
                                                    {
                                                        console.log(err)
                                                    }
                                                    else {

                                                        result = {
                                                            ticker: data.ticker,
                                                            price: data.price,
                                                        }
                    
                                                        console.log("1 record inserted")
                                                        res.send(result)

                                                    }

                                                })
                                            }
                                        })
                                    }
                                    else {
                                        res.json("Not Enough MV")
                                    }
                                }
                            })
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
    
                selectProfileCash = "SELECT MAX(P.CashOnHand) CashOnHand, SUM(T.quantity) totalQuantity FROM profiles P INNER JOIN transactions T ON T.profile_id = P.profile_id WHERE T.profile_id = ? AND T.security_id = ? "

                    pool.query(selectProfileCash, [data.profile, secID], (err, cashAmount) => {

                        if (err) 
                        {
                            console.log(err)
                        }
                        else {

                            selectSells = "SELECT SUM(quantity) quantityOfSells FROM transactions WHERE profile_id = ? AND security_id = ? AND transactionType = 'SELL'"

                            pool.query(selectSells, [data.profile, secID], (err, quantityOfSells) => {
                                if (err) 
                                {
                                    console.log(err)
                                }
                                else { 
     
                                    let CashOnHand = parseFloat(cashAmount[0].CashOnHand)
                                    let buysMinusSellsQuantity = parseInt(cashAmount[0].totalQuantity - parseInt(quantityOfSells[0].quantityOfSells)) - parseInt(quantityOfSells[0].quantityOfSells)

                                    //update value
                                    if ((buysMinusSells > (data.quantity)) && buysMinusSellsQuantity > 0) {

                                    CashOnHand = CashOnHand + (data.price * data.quantity)

                                    //update CashOnHand after buy is posted

                                    updateCash = "UPDATE profiles SET CashOnHand = ? WHERE profile_id = ? "

                                        pool.query(updateCash, [CashOnHand, data.profile], (err, success) => {
                                            if (err) 
                                            {
                                                console.log(err)
                                            }
                                            else {

                                                const sellRequest = 'INSERT INTO stockgamedata.transactions (profile_id, transactionType, security_id, price, quantity, transaction_date) VALUES ?'; 
            
                                                pool.query(sellRequest, [values], (err, result) => {
                                                    if (err) throw err;
                                                
                                                    result = {
                                                        ticker: data.ticker,
                                                        price: data.price,
                                                    }
    
                                                    console.log("1 record inserted")
                                                    res.send(result)
                                                }) 
                                            }
                                        }) 
                                    }
                                    else {
                                        res.json("not enough quantity")
                                    }

                                }
                            })


                            
                        }
                    })
            
                
            
        }
    })
 
})

router.post("/retrieveTrans", (req, res) => {

    profile_id = req.body.currentAccount

    const retrieveRequest = "SELECT T.transaction_id, T.transactionType, S.symbol, T.price, T.quantity, T.transaction_date FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE T.profile_id = ? ORDER BY transaction_date DESC LIMIT ?"

    pool.query(retrieveRequest, [profile_id, 15], (err, result) => {
        if (err) throw err;

        result = JSON.stringify(result)

        res.json(result)
    })
})

module.exports = router;