const express = require('express');
const router = express.Router();
const pool = require("../database/sqlDb");
const axios = require("axios")

router.post("/loginValidation", (req, res) => {

    email = req.body.email
    password = req.body.password

    const retrieveRequest = 'SELECT profile_id ,email, password FROM profiles WHERE password = ? AND email = ?'

    const userData = [req.body.password, req.body.email]

    pool.query(retrieveRequest, [password, email], (err, result) => {

        if (err) throw err;
        

        if(result.length > 0) {
            res.json(result)
        }
        else {
            res.json([])
        }
    })

})

router.post("/register", (req, res) => {

    console.log(req.body)

    firstName = req.body.firstName
    lastName = req.body.lastName
    email = req.body.email
    password = req.body.password
    date = req.body.date


    let emailWasDuplicated = false

    let getAllEmails = 'SELECT email FROM profiles'

    const retrieveRequest = 'INSERT INTO profiles (firstname, lastname, email, CashOnHand, password, date_created) Values (?)'

    const userData = [firstName,lastName, email, 100000, password, date]

    pool.query(getAllEmails, (err, result) => {
        if(err){
            console.log("error")
        } 

        else{
            console.log(result.length)
            console.log(result[0].email)
            console.log(email)
            for (let i = 0; i < result.length; i++) {
                if(result[i].email === email) {
                    emailWasDuplicated = true
                }
            }

            if (emailWasDuplicated === false) {

                pool.query(retrieveRequest, [userData], (err, result) => {
                    console.log(err)
                    console.log(result)
                    if (err) {
                        res.json([])
                    }
            
                    else {
                        res.json(["success"])
                    }
                })
        
            }
            else{
                res.json("error")
            }
        }

    })
    

    

    

})


module.exports = router;