
const express = require('express');
const fs = require('fs');
const router = express.Router();

//hello

app.post("/addtransaction", (req, res) => {
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




module.exports = router;