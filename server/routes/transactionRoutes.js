const express = require('express');
const router = express.Router();
const pool = require("../database/sqlDb");

router.post('/buy', async (req, res) => {
    try {
      const data = req.body;
  
      // Get security ID based on the ticker symbol
      const secID = await getSecurityId(data.ticker);

      console.log(secID)
  
      // Get profile cash and total quantity of buys
      const cashAmount = await getProfileCash(data.profile, secID);
      const quantityOfBuys = await getQuantityOfBuys(data.profile, secID);
  
      // Calculate CashOnHand and buysMinusSellsQuantity
      const CashOnHand = parseFloat(cashAmount[0].CashOnHand);
      const buysMinusSellsQuantity = parseInt(quantityOfBuys[0].quantityOfBuys) - parseInt(cashAmount[0].totalQuantity - parseInt(quantityOfBuys[0].quantityOfBuys));

      console.log(CashOnHand)
      console.log(buysMinusSellsQuantity)

      // Check if there's enough cash and available quantity to make the buy
      if ((CashOnHand > (data.quantity * data.price)) && buysMinusSellsQuantity > 0) {
        const newCashOnHand = CashOnHand - data.price * data.quantity;
  
        // Update CashOnHand after the buy is posted
        await updateProfileCash(data.profile, newCashOnHand);
  
        // Insert the buy transaction
        await insertBuyTransaction(data.profile, secID, data.price, data.quantity, data.date);
  
        const result = {
          ticker: data.ticker,
          price: data.price,
        };
  
        res.send(result);
      } else {
        res.json('Not Enough MV'); // Not enough market value (MV)
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });
  

  router.post('/sell', async (req, res) => {
    try {
      const data = req.body;
  
      // Get security ID based on the ticker symbol
      const secID = await getSecurityId(data.ticker);
  
      // Get profile cash, total quantity and total quantity of sells
      const cashAmount = await getProfileCash(data.profile, secID);
      const quantityOfSells = await getQuantityOfSells(data.profile, secID);
      const totalQuantity = cashAmount[0].totalQuantity
  
      // Calculate CashOnHand and sellsMinusBuysQuantity
      let CashOnHand = parseFloat(cashAmount[0].CashOnHand);
      const sellsMinusBuysQuantity = parseInt(totalQuantity - parseInt(quantityOfSells[0].quantityOfSells)) - parseInt(quantityOfSells[0].quantityOfSells);
        
        console.log(cashAmount[0].totalQuantity)
        console.log(quantityOfSells)
        console.log(quantityOfSells[0].quantityOfSells)
        console.log(sellsMinusBuysQuantity)
        console.log(data.quantity)
  
      // Check if there's enough quantity to sell
      if (sellsMinusBuysQuantity > data.quantity && sellsMinusBuysQuantity > 0) {
        // Update CashOnHand after the sell is posted
        CashOnHand += data.price * data.quantity;
        await updateProfileCash(data.profile, CashOnHand);
  
        // Insert the sell transaction
        await insertSellTransaction(data.profile, secID, data.price, data.quantity, data.date);
  
        const result = {
          ticker: data.ticker,
          price: data.price,
        };
  
        res.send(result);
      } else {
        res.json('Not enough quantity to sell');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post("/retrieveTrans", (req, res) => {

    profile_id = req.body.currentAccount

    const retrieveRequest = "SELECT T.transaction_id, T.transactionType, S.symbol, T.price, T.quantity, T.transaction_date FROM stockgamedata.transactions T INNER JOIN security S ON T.security_id = S.security_id WHERE T.profile_id = ? ORDER BY transaction_date DESC LIMIT ?"

    pool.query(retrieveRequest, [profile_id, 15], (err, result) => {
        if (err) throw err;

        result = JSON.stringify(result)

        res.json(result)
    })
})
  
  
  // Function to get the profile cash and total quantity of sells
  async function getProfileCash(profile, secID) {
    return new Promise((resolve, reject) => {
      const selectProfileCash = `SELECT MAX(P.CashOnHand) CashOnHand, SUM(T.quantity) totalQuantity
        FROM profiles P INNER JOIN transactions T ON T.profile_id = P.profile_id
        WHERE T.profile_id = ? AND T.security_id = ?`;
      pool.query(selectProfileCash, [profile, secID], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  // Function to get the total quantity of sell transactions
  async function getQuantityOfSells(profile, secID) {
    return new Promise((resolve, reject) => {
      const selectSells = 'SELECT IFNULL(SUM(quantity), 0) quantityOfSells FROM transactions WHERE profile_id = ? AND security_id = ? AND transactionType = "SELL"';
      pool.query(selectSells, [profile, secID], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
// Function to update the profile's CashOnHand
    async function updateProfileCash(profile, newCashOnHand) {
        return new Promise((resolve, reject) => {
        const updateCash = 'UPDATE profiles SET CashOnHand = ? WHERE profile_id = ?';
        pool.query(updateCash, [newCashOnHand, profile], (err, result) => {
            if (err) {
            reject(err);
            } else {
            resolve(result);
            }
        });
        });
    }

  // Function to update the profile's CashOnHand
  async function insertSellTransaction(profile, secID, price, quantity, date) {
    return new Promise((resolve, reject) => {
      const values = [[profile, 'SELL', secID, price, quantity, date]];
      const sellRequest = 'INSERT INTO stockgamedata.transactions (profile_id, transactionType, security_id, price, quantity, transaction_date) VALUES ?';
      pool.query(sellRequest, [values], (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log('1 record inserted');
          resolve(result);
        }
      });
    });
  }

    // Function to get the security ID based on the ticker symbol
    async function getSecurityId(ticker) {
        return new Promise((resolve, reject) => {
          pool.query('SELECT security_id FROM security WHERE symbol = ?', [ticker], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result[0].security_id);
            }
          });
        });
      }
    
      
      // Function to get the total quantity of buy transactions
      async function getQuantityOfBuys(profile, secID) {
        return new Promise((resolve, reject) => {
          const selectBuys = 'SELECT SUM(quantity) quantityOfBuys FROM transactions WHERE profile_id = ? AND security_id = ? AND transactionType = "BUY"';
          pool.query(selectBuys, [profile, secID], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
      
      // Function to insert a buy transaction
      async function insertBuyTransaction(profile, secID, price, quantity, date) {
        return new Promise((resolve, reject) => {
          const values = [[profile, 'BUY', secID, price, quantity, date]];
          const buyRequest = 'INSERT INTO stockgamedata.transactions (profile_id, transactionType, security_id, price, quantity, transaction_date) VALUES ?';
          pool.query(buyRequest, [values], (err, result) => {
            if (err) {
              reject(err);
            } else {
              console.log('1 record inserted');
              resolve(result);
            }
          });
        });
      }



module.exports = router;