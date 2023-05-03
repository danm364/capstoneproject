import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';



    const InvestCard = (props) => {
        
    const API_URL = 'http://localhost:3500/stockData'

    const [quoteTicker, setTicker] = useState('');
    const [quotePrice, setPrice] = useState('');

    function quoteSetter(e) {
        e.preventDefault()
        
        
        
        const confirmPrice = e.target.querySelector(".transaction__price")
        const confirmTicker = e.target.querySelector(".transaction__ticker")

        let quantity = e.target.querySelector(".quantity")
        
    
        confirmPrice.style.display = "block"
        confirmTicker.style.display = "block"
    
        const ticker = e.target.querySelector('.ticker').value
        
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
              'X-RapidAPI-Key': '8c343d9510msh676992d9d0fa551p14b1a5jsn027b5dac3ae6',
              'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
          }
          
        axios(options).then((response) => {
            console.log(response.data['Global Quote']['01. symbol'])
            setPrice(response.data['Global Quote']['05. price'])
            
            setTicker(response.data['Global Quote']['01. symbol'])

            if (props.header === 'Sell') {
                let date = new Date()
                date = date.toLocaleString()
                axios.post(API_URL, {
                    transactionType: props.header,
                    ticker: response.data['Global Quote']['01. symbol'],
                    price: response.data['Global Quote']['05. price'],
                    quantity: quantity.value,
                    date: date
                })
            }
            else if (props.header === 'Buy') {
                let date = new Date()
                date = date.toLocaleString()
                console.log(date)
                console.log(quantity.value)

                axios.post(API_URL, {
                    transactionType: props.header,
                    ticker: response.data['Global Quote']['01. symbol'],
                    price: response.data['Global Quote']['05. price'],
                    quantity: quantity.value,
                    date: date
                    
                    
                })
            
            }
            console.log(response)
        })
    
    
    
    }


    return (
        <div>
            <form action="" className="quote" onSubmit={quoteSetter}>
            <h1>{props.header}</h1>
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