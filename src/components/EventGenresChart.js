import { useState, useEffect } from 'react';
import React, { PureComponent } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    const getData = () => {
        const data = genres.map(genre => {
            const filteredEvents = events.filter(event => event.summary.includes(genre));
            return {
                name: genre,
                value: filteredEvents.length
            }
        });

        return data;
    }

    // Color Setup
    const colors = ['#dad8f3', '#b4b1e7', '#8884d8', '#5751c8', '#36319b'];


    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        const fillColor = colors[index % colors.length];

        return percent ? (
            <text
                x={x}
                y={y}
                fill={fillColor}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <ResponsiveContainer width="99%" height={400}>
            <PieChart
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 40,
              }}>
                <Pie
                    data={data}
                    dataKey="value"
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius="75%"
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))
                    }
                </Pie>
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default EventGenresChart;