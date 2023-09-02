const express = require('express');
const router = express.Router();
const pool = require("../database/sqlDb");
const axios = require("axios")
const rateLimit =  require('express-rate-limit')

function roundToX(num, X) {    
    return +(Math.round(num + "e+"+X)  + "e-"+X);
}

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


router.get("/loadData", (req, res) => {
    
   
})




module.exports = router;