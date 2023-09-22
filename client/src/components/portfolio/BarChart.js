import React, {useEffect, useState} from 'react';
import { ResponsiveContainer, Bar, Tooltip, YAxis, CartesianGrid, XAxis, BarChart, Legend } from 'recharts';
import { schemeSet3 } from 'd3-scale-chromatic'; 


const BarChartGraph = ({stocks}) => {

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    console.log(stocks)

    return (

        stocks.length > 0 && COLORS.length > 0 ?
            <ResponsiveContainer width="99%" height={"100%"} >
                <BarChart width={730} height={250} data={stocks}>
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ticker" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="marketValue" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            
        : 
            <div>No data available</div>
    );


  };
  
  export default BarChartGraph;