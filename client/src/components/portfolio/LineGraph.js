import React, {useEffect, useState} from 'react';
import { ResponsiveContainer, XAxis, Line, YAxis, CartesianGrid, LineChart } from 'recharts';
import { schemeSet3 } from 'd3-scale-chromatic'; 


const TreeChart = ({stocks}) => {

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    console.log(stocks)

    return (

        stocks.length > 0 && COLORS.length > 0 ?
            <ResponsiveContainer width="99%" height={"100%"} >
            <LineChart  height={400} data={stocks}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="marketValue" stroke="#8884d8"/>
                <XAxis dataKey={"ticker" } type="category" />
                <YAxis />
            </LineChart>
            </ResponsiveContainer>
            
        : 
            <div>No data available</div>
    );


  };
  
  export default TreeChart;