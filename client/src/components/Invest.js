import React from "react";





const Invest = () => {
    return (
        <div class="container">
            <form action="" className="buy">
                <h1>Buy</h1>
                <label htmlFor="">Ticker</label>
                <input type="text" />
                <label htmlFor="">Quantity</label>
                <input type="text" />
                <button type="submit">Submit</button>
            </form>
            <form action="" className="sell">
            <h1>Sell</h1>
                <label htmlFor="">Ticker</label>
                <input type="text" />
                <label htmlFor="">Quantity</label>
                <input type="text" />
                <button type="submit">Submit</button>
            </form>
            <form action="" className="quote">
            <h1>Quote</h1>
                <label htmlFor="">Ticker</label>
                <input type="text" />
                <label htmlFor="">Quantity</label>
                <input type="text" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Invest