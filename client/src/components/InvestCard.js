import React from "react";
import axios from 'axios';
import dateFormatter from "dateformat";


const InvestCard = ({quotePrice, quoteTicker, setQuoteTicker, setQuotePrice, setSellPrice, setSellTicker, header, setBuyPrice, setBuyTicker}) => {

    let host = "http://localhost:3500"
    
    function quoteSetter(e) {
        e.preventDefault()
        
        const confirmPrice = e.target.querySelector(".transaction__price")
        const confirmTicker = e.target.querySelector(".transaction__ticker")

        let quantity = e.target.querySelector(".invest__quantity")
        
    
        confirmPrice.style.display = "block"
        confirmTicker.style.display = "block"
    
        const ticker = e.target.querySelector('.invest__ticker').value
        
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

            if (header === 'Sell') {
                let date = dateFormatter( new Date(), "yyyy-mm-dd HH:MM:ss" );

                console.log(date)
                
                axios.post(`${process.env.REACT_HOST}/transactions/sell`, {
                    profile: 1,
                    transactionType: header,
                    ticker: response.data['Global Quote']['01. symbol'],
                    price: parseFloat(response.data['Global Quote']['05. price']),
                    quantity: parseInt(quantity.value),
                    date: date.toLocaleString()
                }).then((response,err) => {
                    setSellPrice(response.data.price)
                    setSellTicker(response.data.ticker)
                })
            }
            else if (header === 'Buy') {
                let date = dateFormatter( new Date(), "yyyy-mm-dd HH:MM:ss" );

                console.log(response.data)

                axios.post(`${process.env.REACT_HOST}/transactions/buy`, {
                    
                    profile: 1,
                    transactionType: header,
                    ticker: response.data['Global Quote']['01. symbol'],
                    price: parseFloat(response.data['Global Quote']['05. price']),
                    quantity: parseInt(quantity.value),
                    date: date
                    
                    
                }).then((response) => {

                    setBuyPrice(response.data.price)
                    setBuyTicker(response.data.ticker)

                }).catch((error) => {
                    console.log(error)
                })
            
            }
            else if (header === 'Quote') {
                

                console.log(response.data)

                setQuotePrice(response.data['Global Quote']['05. price'])
                setQuoteTicker(response.data['Global Quote']['01. symbol'])
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
            </form>
        </div>
    )
}

export default InvestCard