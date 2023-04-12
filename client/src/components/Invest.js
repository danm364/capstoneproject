import React, { useState } from "react";





const Invest = () => {
    

    const investments = [{
        id: '1',
        ticker: 'AAPL',
        price: '20.00'
    },

    {
        id: '2',
        ticker: 'MSFT',
        price: '30.00'
    },

    {
        id: '3',
        ticker: 'PLNTR',
        price: '15'
    },
    

]


const [quoteTicker, setTicker] = useState('');
const [quotePrice, setPrice] = useState('5');

function handleClick(event) {
    event.preventDefault()
    const int = Math.floor(Math.random() * 3)
    setPrice(investments[int].price)
    setTicker(investments[int].ticker)
    const quoteTicker = document.querySelector(".transaction__ticker")
    const quotePrice = document.querySelector(".transaction__price")
    quoteTicker.style.display = "block";
    quotePrice.style.display = "block";
    
}

function handleClick1(event) {
    event.preventDefault()
    console.log("this is the Sell button")
}

function handleClick2(event) {
    event.preventDefault()
    console.log(event.target.innerText)
    
    console.log("This is the quote button")
}


    return (
        <main className="container">
            <form action="" className="buy">
                <h1>Buy</h1>
                <label htmlFor="">Ticker</label>
                <input type="text" />
                <label htmlFor="">Quantity</label>
                <input type="text" />
                <button onClick={handleClick} type="submit">Submit</button>
                <div className="transaction__ticker">{quoteTicker}</div>
                <div className="transaction__price">{quotePrice}</div>
            </form>
            <form action="" className="sell">
            <h1>Sell</h1>
                <label htmlFor="">Ticker</label>
                <input type="text" />
                <label htmlFor="">Quantity</label>
                <input type="text" />
                <button type="submit" onClick={handleClick1}>Submit</button>
                <div className="transaction__ticker">AAPL</div>
                <div className="transaction__price">17.99</div>
            </form>
            <form action="" className="quote">
            <h1>Quote</h1>
                <label htmlFor="">Ticker</label>
                <input type="text" />
                <label htmlFor="">Quantity</label>
                <input type="text" />
                <button type="submit" onClick={handleClick2}>Submit</button>
                <div className="transaction__ticker">AAPL</div>
                <div className="transaction__price">17.99</div>
            </form>
        </main>
    )
}

export default Invest