import React from "react";




const Holdings = () => {

    const stockData = 
        {
            ticker: "AAPL",
            price: "90",
            marketValue: "1000"
        }
    

    return (

        <div className="portfolio__headers">
            <div>{stockData.ticker}</div>
            <div>{stockData.price}</div>
            <div>{stockData.marketValue}</div>
        </div>
                
    )
}

export default Holdings