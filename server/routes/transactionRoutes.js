const Sequelize = require('sequelize');
const express = require('express');
const fs = require('fs');
const router = express.Router();

const sequelize = new Sequelize('stockgamedata', 'root', 'Scotch6565!?', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3006
    
}) 

const Transaction = sequelize.define('transactions', {
    idtransactions: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    profile: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
        
    },

    transactiontype: {
        type: Sequelize.DataTypes.STRING(45),
        allowNull: false
      },
    ticker: {
        type: Sequelize.DataTypes.STRING(45),
        allowNull: false
      },
    price: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
    quantity: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
    date: {
        type: Sequelize.DataTypes.DATE,
    }
      },
{
    timestamps: false
  }
)


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