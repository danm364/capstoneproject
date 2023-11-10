const express = require('express');
const router = express.Router();
const pool = require("../database/sqlDb");
const axios = require("axios")
const bcrypt = require("bcrypt")
const rateLimit = require("express-rate-limit");
const jwt = require('jsonwebtoken');
const jwtAuth = require("../utility/jwtAuth")
require('dotenv').config();


    async function generateToken(username, secret) {
        return jwt.sign(username, secret, { expiresIn: '900s' });
    }

    async function checkForUser(allEmails, currentUserEmail) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < allEmails.length; i++) {
                if (allEmails[i] === currentUserEmail) {
                    resolve(true)
                }
                else {
                    reject(false)
                }
            }
        })
    }

    async function createNewProfile(emailWasDuplicated, result, userData, retrieveRequest, userEmail) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < result.length; i++) {
                
                if (result[i].email === userEmail) {
                    emailWasDuplicated = true
                }
            }

            if (emailWasDuplicated === false) {

                pool.query(retrieveRequest, [userData], (err, result) => {
                    if (err) {
                    reject(err)
                    }

                    else {
                        resolve(true)
                    }
                })

            }
            else {
                reject(err)
            }

        })
        
  }

  async function getAllEmails() {
    return new Promise((resolve, reject) => {

        let emails = 'SELECT email FROM profiles'

        pool.query(emails, (err, result) => {
            if (err) {
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    })  
  }
  async function getRefreshToken(profile_id) {
    return new Promise((resolve, reject) => {
        let selectToken = "SELECT refreshToken FROM profiles WHERE profile_id = ?"
        pool.query(selectToken, [profile_id], (err, result) => {
            if (err) {
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    })  
  }
// Create a rate limiter middleware
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 100, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many login attempts, please try again in 15 minutes.",
});


async function addNewRefreshToken(refreshToken, profile_id) {

    let queryData = [refreshToken, profile_id]
    const updateRequest = "UPDATE profiles SET refreshToken = ? WHERE profile_id = ?"

    pool.query(updateRequest, queryData, (err, result) => {
        if (err) {
            reject(err)
        }
        })
}

router.post("/refreshToken", async (req, res) => {
    console.log(req.body)
    const refreshToken = req.cookies.jwt
    console.log(refreshToken)
    let username = req.body.username
    let profile_id = req.body.profile
    
    if (!refreshToken) return res.send({accessToken : ''})

    let payload = null
    
    try {
        payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    }
    catch (err) {
        return res.send({accessToken : ''})
    }
    try {
        let allEmails = await getAllEmails()

        let user = await checkForUser(allEmails, req.cookies.user )

        if (!user) return res.send({accessToken : ''})

        dbRefreshToken = await getRefreshToken(profile_id)

        if (dbRefreshToken !== refreshToken) return res.send({accessToken : ''})

        refreshToken = await generateToken({username : username}, process.env.REFRESH_TOKEN_SECRET)
        refreshToken = refreshToken

        let accessToken = await generateToken({username: username}, process.env.TOKEN_SECRET)

        await addNewRefreshToken(refreshToken, profile_id)
    }
    catch {
        return res.send({accessToken : ''})
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);

    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.json(accessToken)
    
})

router.post("/loginValidation", loginLimiter, async (req, res) => {
   
    let isLoginSuccessful = {
        isSuccessful : false
    };
    console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;

    const retrieveRequest = 'SELECT profile_id ,email, password FROM profiles WHERE email = ?'

    
    
    try{

        const [results] = await pool.promise().query(retrieveRequest, [email]);
       
        if (results.length > 0 && await bcrypt.compare(password, results[0].password)) {

            let profile_id = results[0].profile_id
            let username = results[0].email
            
            let refreshToken = await generateToken({username : username}, process.env.REFRESH_TOKEN_SECRET)
                
            let accessToken = await generateToken({username: username}, process.env.TOKEN_SECRET)

            await addNewRefreshToken(refreshToken, profile_id)
            
            isLoginSuccessful = {

                    isSuccessful : true,
                    profile : profile_id,
                    username : username,
                    token : accessToken

                }
                
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Origin', req.headers.origin);

                res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
                res.send(isLoginSuccessful)
            }
        }
        catch  (error) {
       
            res.send(isLoginSuccessful);
        }
})

router.post("/register", async (req, res) => {

    let {firstName, lastName, email, password, date} = req.body

    let emailWasDuplicated = false

    

    const retrieveRequest = 'INSERT INTO profiles (firstname, lastname, email, CashOnHand, password, date_created) Values (?)'



    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = [firstName, lastName, email, 100000, hashedPassword, date]

    

    try {
        
        let allEmailsRetrieved = await getAllEmails()

        let newAccount = await createNewProfile(emailWasDuplicated, allEmailsRetrieved, userData, retrieveRequest, email )

        if (newAccount === true) {
            res.send(true)
        } 
        
    }
    catch {
        res.status(500).send({ message: "Username is not available" })
    }
})

router.post("/logout", async (req, res) => {

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);

    res.clearCookie("jwt", {
        httpOnly : true
    })

    res.send("you are now logged out")
 })



//need logout to clear cookie

module.exports = router;