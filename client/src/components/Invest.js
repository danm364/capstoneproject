import React, { useEffect, useState } from "react";
import axios from 'axios';
import InvestCard from "./InvestCard";
import TransactionFeed from "./TransactionsFeed";



const Invest = ({}) => {

    


    return (
        <div>
            <main className="container">
                <InvestCard header="Buy"/>
                <InvestCard header="Sell"/>
                <InvestCard header="Quote"/>
                
            </main>
            <section className="feed">
                <TransactionFeed />
            </section>
        </div>
    )
}

export default Invest