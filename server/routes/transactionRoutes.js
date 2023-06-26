const Sequelize = require('sequelize');
const express = require('express');
const fs = require('fs');
const router = express.Router();


router.post("/buy", (req, res) => {
    console.log(req.body)
    data = req.body
    res.send('Recieved post requst')
    Transaction.create({ 
        profile: data.profile,
        transactiontype: data.transactionType,
        ticker: data.ticker,
        price: data.price,
        quantity: data.quantity,
        date: data.date
    })  
})

router.post("/sell", (req, res) => {
    console.log(req.body)
    data = req.body
    res.send('Recieved post requst')
    Transaction.create({ 
        profile: data.profile,
        transactiontype: data.transactionType,
        ticker: data.ticker,
        price: data.price,
        quantity: data.quantity,
        date: data.date
    })  
})

router.post("/quote", (req, res) => {
    console.log(req.body)
    data = req.body
    res.send('Recieved post requst')
    Transaction.create({ 
        profile: data.profile,
        transactiontype: data.transactionType,
        ticker: data.ticker,
        price: data.price,
        quantity: data.quantity,
        date: data.date
    })  
})


router.get("/retrieveTrans", (req, res) => {
    const transactions = Transaction.findAll({
       order: [['idtransactions', 'desc' ]],
       limit: 10
    });
    transactions.then((resolve) => {
        console.log(res)
        res.json(JSON.stringify(resolve))
    }).catch((error) => {
        console.log(error)
    })
    // res.send(transactions)
})

module.exports = router;