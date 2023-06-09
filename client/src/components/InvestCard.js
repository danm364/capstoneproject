import React from "react";

import axios from 'axios';



const InvestCard = ({quotePrice, quoteTicker, setPrice, setTicker, header}) => {
    
    function quoteSetter(e) {
        e.preventDefault()
        
        const confirmPrice = e.target.querySelector(".transaction__price")
        const confirmTicker = e.target.querySelector(".transaction__ticker")

        let quantity = e.target.querySelector(".quantity")
        
    
        confirmPrice.style.display = "block"
        confirmTicker.style.display = "block"
    
        const ticker = e.target.querySelector('.ticker').value
        console.log(process.env.REACT_APP_VANTAGE_API_KEY)
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
            
            setPrice(response.data['Global Quote']['05. price'])
            
            setTicker(response.data['Global Quote']['01. symbol'])

            if (header === 'Sell') {
                let date = new Date()
                date = date.toLocaleString()
                axios.post("http://localhost:3500/transactions/sell", {
                    profile: 1,
                    transactionType: header,
                    ticker: response.data['Global Quote']['01. symbol'],
                    price: response.data['Global Quote']['05. price'],
                    quantity: quantity.value,
                    date: date
                })
            }
            else if (header === 'Buy') {
                let date = new Date()
                date = date.toLocaleString()
                console.log(date)
                console.log(quantity.value)

                axios.post("http://localhost:3500/transactions/buy", {
                    
                    profile: 1,
                    transactionType: header,
                    ticker: response.data['Global Quote']['01. symbol'],
                    price: response.data['Global Quote']['05. price'],
                    quantity: quantity.value,
                    date: date
                    
                    
                }).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
            
            }
            
        })
    }


    return (
        <div>
            <form action="" className="quote" onSubmit={quoteSetter}>
            <h1>{header}</h1>
                <label htmlFor=""  >Ticker</label>
                <input type="text" className="ticker" placeholder="Ticker"/>
                <label htmlFor="" >Quantity</label>
                <input type="text" className="quantity" placeholder="Quantity" />
                <button type="submit" >Submit</button>
                <div className="transaction__ticker">{quoteTicker}</div>
                <div className="transaction__price">{quotePrice}</div>
            </form>
        </div>
    )
}

export default InvestCard