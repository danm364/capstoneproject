import React, { useEffect, useState } from "react";
import axios from 'axios';
import FeedComponent from "./FeedComponent";



const TransactionFeed = ({quotePrice, sellPrice, buyPrice}) => {
    


    const [data, setData] = useState([]);
    

    useEffect(() => {
        axios.get("http://localhost:3500/transactions/retrieveTrans")
            .then(response => {

                setData(JSON.parse(response.data))
            })
          .catch(error => console.log(error));

      }, [quotePrice,sellPrice,buyPrice]);

      console.log(data)

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
                    key={element.transaction_id}
                    transType = {element.transactionType}
                    ticker = {element.symbol}
                    price = {element.price}
                    quantity = {element.quantity}
                    date = {new Date(element.transaction_date).toLocaleString()}
                    
                
                />
            
            )}
            
            
        </div>
    )
}

export default TransactionFeed