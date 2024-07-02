import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Header from '../Header/Header';
import DataRow from './DataRow';

import orderApi from '../../api/orderApi';
// Your component code here

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
		const getAllOrder = async () => {
			try {		
				const response = await orderApi.getAllOrder();
				setOrders(response?.data);
        console.log(response?.data);
			} catch (error) {
			}
		}
		getAllOrder();
	}, []);
  return (
    <div className="container">
    <Header />
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {orders.slice().reverse().map((order) => (
          <DataRow 
            orderId={order.orderId} 
            date={order.createdAt} 
            userName={order.recepient} 
            userPhone={order.phone}
            address={order.address}
            email = {order.email}
            payment={order.payment.method} 
            total={order.bill}
            status={order.status}
            items={order.items}/>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default OrderList;