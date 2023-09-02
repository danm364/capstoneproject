import React from "react";

const Holdings = ({stocks}) => {

    

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