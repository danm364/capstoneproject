import React, {useState, PureComponent}  from "react";
import Holdings from "./holdings/Holdings";
import axios from "axios";
import { useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import TreeChart from "./PieChart";
import LineGraph from "./LineGraph"


const Portfolio = (currentAccount) => {

    const [stocks, setStocks] = useState([])

    useEffect(() => {

        try {
        axios.post("http://localhost:3500/holdings/selectHoldings", {
            currentAccount
        })
            .then((response) => {
                
                response = JSON.parse(response.data)
                for (let i = 0; i < response.length; i++) {
                    response[i]["marketValue"] = parseFloat(response[i]["marketValue"])
                }
                setStocks(response)

                }
            )
            
            .catch(error => console.log(error));
        }
        catch {
            setStocks(null)
        }
    }, [])


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        stocks.length > 0 ? 
        <div className="portfolio__section">
            <div className="portfolio__container">
                <div className="portfolio__graphs">
                    <LineGraph stocks={stocks} />

                </div>
                <div className="portfolio__graphs">
                    <TreeChart stocks={stocks}/>               
                </div>
            </div>
            <div className="portfolio__holdings">
                <div className="portfolio__headers">
                    <div>Ticker</div>
                    <div>Cost</div>
                    <div>Market Value</div>
                </div>
                < Holdings stocks={stocks}/>
            </div>
        </div>

        :

        <div>No data available</div>

    )
}

export default Portfolio