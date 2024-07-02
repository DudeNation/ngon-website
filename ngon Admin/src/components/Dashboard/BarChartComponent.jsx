import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dashboardApi from '../../api/dashboardApi';

const BarChartComponent = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getTotalOrders = async () => {
      try {
        const response = await dashboardApi.getTotalOrder();
        const transformedData = response.data.map(item => ({
          name: item._id,
          value: item.totalOrdered
        }));
        setData(transformedData);
      } catch (error) {
        console.error(error);
      }
    }
    getTotalOrders();
  } , [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;