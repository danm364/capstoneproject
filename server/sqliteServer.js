const Sequelize = require('sequelize');
const express = require('express')


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

sequelize.sync().then(() => {
    console.log('Databases are synced')
})

Profile.findAll().then((resolve) => {
    console.log(resolve)
}).catch((error) => {
    console.log(error)
})


const app = express()
const port = 3000



app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })