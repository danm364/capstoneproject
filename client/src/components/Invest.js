import React, { useState } from "react";
import InvestCard from "./InvestCard";
import TransactionFeed from "./TransactionsFeed";



const Invest = () => {

    let [quoteTicker, setQuoteTicker] = useState('');
    let [quotePrice, setQuotePrice] = useState('');

    let [buyTicker, setBuyTicker] = useState('');
    let [buyPrice, setBuyPrice] = useState('');

    let [sellTicker, setSellTicker] = useState('');
    let [sellPrice, setSellPrice] = useState('');

    


    return (
        <div className="invest__wrap">
            <main className="invest__container">
                <InvestCard header="Buy" setBuyTicker= {setBuyTicker} setBuyPrice ={setBuyPrice} quotePrice={buyPrice} quoteTicker={buyTicker}/>
                <InvestCard header="Sell"setSellTicker= {setSellTicker} setSellPrice ={setSellPrice} quotePrice={sellPrice} quoteTicker={sellTicker}/>
                <InvestCard header="Quote"setTicker= {setQuoteTicker} setPrice ={setQuotePrice} quotePrice={quotePrice} quoteTicker={quoteTicker}/>
                
            </main>
            <section className="feed">
                <TransactionFeed buyTicker={buyTicker} buyPrice={buyPrice} sellPrice={sellPrice}/>
            </section>
        </div>
    )
}

export default Invest