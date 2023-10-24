const express = require('express');
const router = express.Router();
const pool = require("../database/sqlDb");
const axios = require("axios")
const bcrypt = require("bcrypt")
const rateLimit = require("express-rate-limit");
const jwt = require('jsonwebtoken');
const jwtAuth = require("../utility/jwtAuth")
require('dotenv').config();


async function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }
console.log(process.env.TOKEN_SECRET)
// Create a rate limiter middleware
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 100, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many login attempts, please try again in 15 minutes.",
});

router.get("/authenticateUser", jwtAuth.authenticateJWT, async (req, res) => {
    isAuthenticated = true

    res.json(isAuthenticated)
})

router.post("/loginValidation", loginLimiter, async (req, res) => {

    let isLoginSuccessful = {
        isSuccessful : false
    };
    let email = req.body.email;
    let password = req.body.password;

    const retrieveRequest = 'SELECT profile_id ,email, password FROM profiles WHERE email = ?'

    

        try{

            const [results] = await pool.promise().query(retrieveRequest, [email]);
      
            if (results.length > 0 && await bcrypt.compare(password, results[0].password)) {

                let profile_id = results[0].profile_id
                let username = results[0].email
                
                let token = await generateAccessToken({username: username})
               
                isLoginSuccessful = {
                    isSuccessful : true,
                    profile : profile_id,
                    username : username,
                    token : token

                }
                res.send(isLoginSuccessful)
            }
        }
        catch  (error) {
            console.log("hello")
            res.send(isLoginSuccessful);
        }
})

router.post("/register", async (req, res) => {

    console.log(req.body)

    let {firstName, lastName, email, password, date} = req.body

    let emailWasDuplicated = false

    let getAllEmails = 'SELECT email FROM profiles'

    const retrieveRequest = 'INSERT INTO profiles (firstname, lastname, email, CashOnHand, password, date_created) Values (?)'

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = [firstName, lastName, email, 100000, hashedPassword, date]

    try {
        pool.query(getAllEmails, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Username is not available" });
            }
    
            else {
    
                for (let i = 0; i < result.length; i++) {
                    if (result[i].email === email) {
                        emailWasDuplicated = true
                    }
                }
    
                if (emailWasDuplicated === false) {
    
                    pool.query(retrieveRequest, [userData], (err, result) => {
                        if (err) {
                            res.json([])
                        }
    
                        else {
                            res.status(201).json({ message: "Registration successful" });
                        }
                    })
    
                }
                else {
                    res.status(500).json({ message: "Username is not available" });
                }
            }
        })
    }
    catch {
        res.status(500).send({ message: "Username is not available" })
    }
    
    
})


module.exports = router;