import React, { useState } from "react";
import InvestCard from "./InvestCard";
import TransactionFeed from "./TransactionsFeed";



const Invest = ({currentAccount}) => {

    let [quoteTicker, setQuoteTicker] = useState('');
    let [quotePrice, setQuotePrice] = useState('');

    let [buyTicker, setBuyTicker] = useState('');
    let [buyPrice, setBuyPrice] = useState('');

    let [sellTicker, setSellTicker] = useState('');
    let [sellPrice, setSellPrice] = useState('');

    return (
        <div className="invest__wrap">
            <main className="invest__container">
                <InvestCard header="Buy" setBuyTicker= {setBuyTicker} setBuyPrice ={setBuyPrice} quotePrice={buyPrice} quoteTicker={buyTicker} currentAccount={currentAccount}/>
                <InvestCard header="Sell"setSellTicker= {setSellTicker} setSellPrice ={setSellPrice} quotePrice={sellPrice} quoteTicker={sellTicker} currentAccount={currentAccount}/>
                <InvestCard header="Quote"setQuoteTicker= {setQuoteTicker} setQuotePrice ={setQuotePrice} quotePrice={quotePrice} quoteTicker={quoteTicker} currentAccount={currentAccount}/>
                
            </main>
            <section className="feed">
                <TransactionFeed buyTicker={buyTicker} buyPrice={buyPrice} sellPrice={sellPrice} currentAccount={currentAccount}/>
            </section>
        </div>
    )
}

export default Invest