const Sequelize = require('sequelize');
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');


//Express setup
const app = express()
app.use(bodyParser.json());
const port = 3500
app.use(cors());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })



const sequelize = new Sequelize('stockgamedata', 'root', 'Scotch6565!?', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3006
    
}) 

sequelize.authenticate().then((resolve) => {
    console.log(resolve)
    console.log("connection was made")
}).catch((error) => {
    console.log(error)
})

const Profile = sequelize.define('profiles', {
    idprofiles: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: Sequelize.DataTypes.STRING(45),
        allowNull: false
      },
    password: {
        type: Sequelize.DataTypes.STRING(45),
        allowNull: false
      },
    cash: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      },
{
    timestamps: false
  }
)

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


sequelize.sync().then(() => {
    console.log('Databases are synced')
})

Profile.findAll().then((resolve) => {
    console.log(resolve)
}).catch((error) => {
    console.log(error)
})

Transaction.findAll().then((resolve) => {
    console.log(resolve)
}).catch((error) => {
    console.log(error)
})


app.get('/api', (req, res) => {
    hello = {hello: 'world'}
    res.json(hello)
  })

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

    // res.json("this has been recieved")

  
    
})

app.get("/retrieveTrans", (req, res) => {
    const transactions = Transaction.findAll()
    transactions.then((resolve) => {
        res.json(JSON.stringify(resolve))
    }).catch((error) => {
        console.log(error)
    })
    // res.send(transactions)
})