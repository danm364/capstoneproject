import React, { useState } from "react";
import InvestCard from "./InvestCard";
import TransactionFeed from "./TransactionsFeed";



const Invest = () => {

    const [quoteTicker, setQuoteTicker] = useState('');
    const [quotePrice, setQuotePrice] = useState('');

    const [buyTicker, setBuyTicker] = useState('');
    const [buyPrice, setBuyPrice] = useState('');

    const [sellTicker, setSellTicker] = useState('');
    const [sellPrice, setSellPrice] = useState('');


    return (
        <div className="invest__wrap">
            <main className="invest__container">
                <InvestCard header="Buy" setTicker= {setBuyTicker} setPrice ={setBuyPrice} quotePrice={buyPrice} quoteTicker={buyTicker}/>
                <InvestCard header="Sell"setTicker= {setSellTicker} setPrice ={setSellPrice} quotePrice={sellPrice} quoteTicker={sellTicker}/>
                <InvestCard header="Quote"setTicker= {setQuoteTicker} setPrice ={setQuotePrice} quotePrice={quotePrice} quoteTicker={quoteTicker}/>
                
            </main>
            <section className="feed">
                <TransactionFeed quotePrice={quotePrice} buyPrice={buyPrice} sellPrice={sellPrice}/>
            </section>
        </div>
    )
}

export default Invest