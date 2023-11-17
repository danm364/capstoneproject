import React, { useState } from "react";
import axios from 'axios';
import dateFormatter from "dateformat";


const InvestCard = ({quotePrice, quoteTicker, setQuoteTicker, setQuotePrice, setSellPrice, setSellTicker, header, setBuyPrice, setBuyTicker, currentAccount}) => {

    let [errorMsg, setErrorMsg] = useState("")
    
    function quoteSetter(e) {
        e.preventDefault()
        
        const confirmPrice = e.target.querySelector(".transaction__price")
        const confirmTicker = e.target.querySelector(".transaction__ticker")
        const errorMessage = e.target.querySelector(".transaction__error-msg")

        let transQuantity = e.target.querySelector(".invest__quantity")
        const ticker = e.target.querySelector('.invest__ticker').value
        console.log(ticker)
        console.log(transQuantity)
        if (!confirmPrice || !transQuantity.value) {
            errorMessage.style.display = "block"
            errorMessage.style.color = "red"
            setErrorMsg("Please enter both a Quantity and Ticker")
            return
        }
        
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
              function: 'GLOBAL_QUOTE',
              symbol: ticker,
              datatype: 'json'
            },
            headers: {
              'content-type': 'application/octet-stream',
              'X-RapidAPI-Key': process.env.REACT_APP_VANTAGE_API_KEY,
              'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
          }
          
        axios(options).then((response) => {
            let profile_id = currentAccount.profile
            let date = dateFormatter( new Date(), "yyyy-mm-dd HH:MM:ss" );
            let token = currentAccount.token
            console.log(currentAccount.token)
            let ticker = response.data['Global Quote']['01. symbol']
            let price = parseFloat(response.data['Global Quote']['05. price'])
            let quantity = parseInt(transQuantity?.value)

            if (header === 'Sell') {
                axios.post(`${process.env.REACT_APP_HOST_DATA}/transactions/sell`, {

                    profile: parseInt(profile_id),
                    transactionType: header,
                    ticker: ticker,
                    price: price,
                    quantity: quantity,
                    date: date

                }, {
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                }).then((response,err) => {

                    confirmPrice.style.display = "block"
                    confirmTicker.style.display = "block"
                    setErrorMsg("")
                    setSellPrice(response.data.price)
                    setSellTicker(response.data.ticker)
                }).catch((error) => {
                    errorMessage.style.display = "block"
                    errorMessage.style.color = "red"
                    confirmPrice.style.display = "none"
                    confirmTicker.style.display = "none"
                    setErrorMsg(error.response.data)
                })
            }
            else if (header === 'Buy') {
                axios.post(`${process.env.REACT_APP_HOST_DATA}/transactions/buy`, {

                    profile: parseInt(profile_id),
                    transactionType: header,
                    ticker: ticker,
                    price: price,
                    quantity: quantity,
                    date: date
                    
                }, {
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                }).then((response) => {
                    confirmPrice.style.display = "block"
                    confirmTicker.style.display = "block"
                    setErrorMsg("")
                    setBuyPrice(response.data.price)
                    setBuyTicker(response.data.ticker)

                }).catch((error) => {
                    errorMessage.style.display = "block"
                    errorMessage.style.color = "red"
                    confirmPrice.style.display = "none"
                    confirmTicker.style.display = "none"
                    setErrorMsg(error.response.data)
                })
            
            }
            else if (header === 'Quote') {
                confirmPrice.style.display = "block"
                confirmTicker.style.display = "block"
                setErrorMsg("")
                setQuotePrice(price)
                setQuoteTicker(ticker)
            }
            
        })
    }


    return (
        <div>
            <form action="" className="invest__card" onSubmit={quoteSetter}>
            <h1>{header}</h1>
                <label htmlFor=""  >Enter Ticker</label>
                <input type="text" className="invest__ticker" placeholder="Ticker"/>
                <label htmlFor="" >Enter Quantity</label>
                <input type="text" className="invest__quantity" placeholder="Quantity" />
                <button type="submit" >Submit</button>
                <div className="transaction__ticker">{quoteTicker}</div>
                <div className="transaction__price">{quotePrice}</div>
                <div className="transaction__error-msg">{errorMsg}</div>
            </form>
        </div>
    )
}

export default InvestCard