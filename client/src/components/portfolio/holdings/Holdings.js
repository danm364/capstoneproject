import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";




const Holdings = () => {

    const [stocks, setStocks] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3500/holdings/selectHoldings")
            .then((response) => {

                response = JSON.parse(response.data)
                console.log(response)
                setStocks(response)

             
                   
                }
            )
            
            .catch(error => console.log(error));

    }, [])

    


    return (
        
        <ul className="portfolio__list" >
             {console.log(stocks)}
                
                {stocks && stocks.map((stock, index) => 
                <li className="portfolio__headers" key={index} > 
                    <div>{stock.ticker}</div>
                    <div>{stock.price}</div>
                    <div>{stock.marketValue}</div>
                </li>  
                )
                        
                }
                
            
            
        </ul>
                
    )
}

export default Holdings