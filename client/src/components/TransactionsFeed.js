import React, { useEffect, useState } from "react";
import axios from 'axios';
import FeedComponent from "./FeedComponent";



const TransactionFeed = ({quotePrice, setPrice}) => {
    


    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3500/transactions/retrieveTrans")
        //   .then(response => setData(response.data))
            .then(response => setData(JSON.parse(response.data)))
          .catch(error => console.log(error));
      }, [quotePrice]);

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
                    key={element.idtransactions}
                    transType = {element.transactiontype}
                    ticker = {element.ticker}
                    price = {element.price}
                    quantity = {element.quantity}
                    date = {new Date(element.date).toLocaleString()}
                
                />
            )}
            
            
        </div>
    )
}

export default TransactionFeed