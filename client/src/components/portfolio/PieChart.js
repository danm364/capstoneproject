import React, {useEffect, useState} from 'react';
import { Treemap, ResponsiveContainer, RadialBarChart, Legend, RadialBar, PieChart, Pie, Cell, LabelList, outerRadius } from 'recharts';
import { schemeSet3 } from 'd3-scale-chromatic'; 


const TreeChart = ({stocks}) => {

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
      }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {stocks[index]["ticker"]}
          </text>
        );
      };

    return (

        stocks.length > 0 && COLORS.length > 0 ?
            <ResponsiveContainer width="99%" height="99%">
                <PieChart width={730} height={250}>
                    <Pie data={stocks}  dataKey="marketValue" nameKey="ticker" cx="50%" cy="50%" outerRadius={160} label={stocks} fill="#8884d8"/>
                    {stocks.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={"#0088FE"} />
                    ))}
                        <LabelList dataKey={"ticker"} position={"outside"}/>
                </PieChart>
            </ResponsiveContainer>
            
        : 
            <div>No data available</div>
    );


  };
  
  export default TreeChart;