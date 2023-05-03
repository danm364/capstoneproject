import React, { useEffect, useState } from "react";
import axios from 'axios';
import FeedComponent from "./FeedCompnent";
import InvestCard from "./InvestCard";


const TransactionFeed = () => {
    const API_URL = 'http://localhost:3500/stockData'


    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(API_URL)
          .then(response => setData(response.data))
          .catch(error => console.log(error));
      }, [InvestCard]);

    return (
        <div className="feed__section">
            <div className="feed__cols">
                <div>Transaction Type</div>
                <div>Ticker</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Date</div>
            </div>
            {data.map((element) =>             
                <FeedComponent 
                    key={element.id.toString()}
                    transType = {element.transactionType}
                    ticker = {element.ticker}
                    price = {element.price}
                    quantity = {element.quantity}
                    date = {element.date}
                
                />
            )}
            
            
        </div>
    )
}

export default TransactionFeed