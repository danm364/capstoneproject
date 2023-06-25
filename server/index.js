const Sequelize = require('sequelize');
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const transactionRoutes = require("./routes/transactionRoutes")

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




app.use("/transactions", transactionRoutes);

app.get('/api', (req, res) => {
    hello = {hello: 'world'}
    res.json(hello)
  })



