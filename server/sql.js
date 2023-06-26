require("dotenv").config();
const mysql = require("mysql2")

console.log(process.env.DATABASE_PASS)
const pool = mysql.createPool({
    host: process.env.HOST,
    port: 3006,
    user: process.env.USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DB
    
})

pool.execute("select * from stockgamedata.transactions", function (err, result) {
    if (err) throw err;

    console.log(result)
})






  
//   const sequelize = new Sequelize('stockgamedata', 'root', process.env.DATABASE_PASS, {
    //     host: 'localhost',
    //     dialect: 'mysql',
    //     port: 3006
        
    // }) 
    
    // sequelize.authenticate().then((resolve) => {
    //     console.log(resolve)
    //     console.log("connection was made")
    // }).catch((error) => {
    //     console.log(error)
    // })
    
    // const Profile = sequelize.define('profiles', {
    //     idprofiles: {
    //         type: Sequelize.DataTypes.INTEGER,
    //         autoIncrement: true,
    //         primaryKey: true
    //     },
    
    //     username: {
    //         type: Sequelize.DataTypes.STRING(45),
    //         allowNull: false
    //       },
    //     password: {
    //         type: Sequelize.DataTypes.STRING(45),
    //         allowNull: false
    //       },
    //     cash: {
    //         type: Sequelize.DataTypes.FLOAT,
    //         allowNull: false
    //       },
    //       },
    // {
    //     timestamps: false
    //   }
    // )
    
    // const Transaction = sequelize.define('transactions', {
    //     idtransactions: {
    //         type: Sequelize.DataTypes.INTEGER,
    //         autoIncrement: true,
    //         primaryKey: true
    //     },
    //     profile: {
    //         type: Sequelize.DataTypes.INTEGER,
    //         allowNull: false
            
    //     },
    
    //     transactiontype: {
    //         type: Sequelize.DataTypes.STRING(45),
    //         allowNull: false
    //       },
    //     ticker: {
    //         type: Sequelize.DataTypes.STRING(45),
    //         allowNull: false
    //       },
    //     price: {
    //         type: Sequelize.DataTypes.FLOAT,
    //         allowNull: false
    //       },
    //     quantity: {
    //         type: Sequelize.DataTypes.FLOAT,
    //         allowNull: false
    //       },
    //     date: {
    //         type: Sequelize.DataTypes.DATE,
    //     }
    //       },
    // {
    //     timestamps: false
    //   }
    // )
    
    
    // sequelize.sync().then(() => {
    //     console.log('Databases are synced')
    // })
    
    // Profile.findAll().then((resolve) => {
    //     console.log(resolve)
    // }).catch((error) => {
    //     console.log(error)
    // })
    
    // Transaction.findAll().then((resolve) => {
    //     console.log(resolve)
    // }).catch((error) => {
    //     console.log(error)
    // })