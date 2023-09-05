const express = require('express');
const router = express.Router();
const pool = require("../database/sqlDb");
const axios = require("axios")

router.post("/loginValidation", (req, res) => {
    console.log(req.body)

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
    

    const retrieveRequest = 'INSERT INTO profiles (firstname, lastname, email, CashOnHand, password, date_created) Values (?)'

    const userData = [firstName,lastName, email, 100000, password, date]

    pool.query(retrieveRequest, [userData], (err, result) => {
        if (err) {
            res.json([])
        }

        else {
            console.log(result.length)
            res.json(["success"])
        }
    })

})


module.exports = router;