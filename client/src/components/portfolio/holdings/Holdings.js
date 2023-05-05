import React, { useState } from "react";




const Holdings = () => {

    const [stocks, setStock] = useState(
    [
        {
            id: "1",
            ticker: "AAPL",
            price: "90",
            marketValue: "1000"
        },

        {
            id: "2",
            ticker: "AAPL",
            price: "90",
            marketValue: "1000"
        },

        {
            id: "3",
            ticker: "GOOGL",
            price: "90",
            marketValue: "1000"
        },

        {
            id: "4",
            ticker: "PLTR",
            price: "90",
            marketValue: "1000"
        }
        ,
        {
            id: "5",
            ticker: "MSFT",
            price: "90",
            marketValue: "1000"
        }
    ]);

    return (

        <ul className="portfolio__list" >
            {stocks.map((stock) => (
                <li className="portfolio__headers" key={stock.id}> 
                        <div>{stock.ticker}</div>
                        <div>{stock.price}</div>
                        <div>{stock.marketValue}</div>
                </li>
            ))}
            
        </ul>
                
    )
}

export default Holdings