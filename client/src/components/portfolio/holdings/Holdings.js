import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";




const Holdings = () => {

    const [stocks, setStocks] = useState([])

    useEffect(() => {

        try {
        axios.get("http://localhost:3500/holdings/selectHoldings")
            .then((response) => {
                
                response = JSON.parse(response.data)
                setStocks(response)

                }
            )
            
            .catch(error => console.log(error));
        }
        catch {
            setStocks(null)
        }
    }, [])

    return (
        
        <ul className="portfolio__list" >
                
                {stocks && stocks.map((stock, index) => 
                <li className="portfolio__headers" key={index} > 
                    <div>{stock.ticker}</div>
                    <div>{stock.cost}</div>
                    <div>{stock.marketValue}</div>
                </li>  
                )}

        </ul>
                
    )
}

export default Holdings