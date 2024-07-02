import React from 'react';
import { TableCell, TableRow ,Select, MenuItem} from '@mui/material';
import OrderDetail from './OrderDetail';
// import { set } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';
import orderApi from '../../api/orderApi';

const DataRow = ({ orderId, date, userName, userPhone, address,email, payment, total, status, items }) => {
  const [cartList, setCartList] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(status);
  const [bill, setBill] = useState([]);

  const handleOpenOrder = (cartList, total) => {
    setOpen(true);
    setCartList(cartList);
    setBill(total);
  };

  const handleCloseOrder = () => {
    setOpen(false);
    setCartList([]);
    setBill([]);
    console.log(bill);
  }

  const formatDateTime = (date) => {
    const dateObj = new Date(date);
  
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Months are 0-based in JavaScript
    const year = dateObj.getFullYear();
;  
    return `${day}/${month}/${year}`;
  };
  const formattedDate = formatDateTime(date);
  
  const handleStatusChange = (event) => {
    Swal.fire({
      title: 'Do you want to change?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        setOrderStatus(event.target.value);
        const data = { status: event.target.value };
    
        orderApi.updateOrderStatus(orderId, data)
        .then(response => console.log(response.data))
        .catch(error => console.error('Error:', error));
      } else if (result.isDenied) {
      
      }
    });         
    // Here you can also add the code to update the status in your database
  };

  return (
    <><TableRow>
      <TableCell>{orderId}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{userName}</TableCell>
      <TableCell>{userPhone}</TableCell> 
      <TableCell>{address}</TableCell>
      <TableCell>{total.grandTotal}k</TableCell>
      <TableCell>{payment}</TableCell>
      <TableCell>
          <Select value={orderStatus} onChange={handleStatusChange}>
            <MenuItem value={'Pending'}>Pending</MenuItem>
            <MenuItem value={'Confirmed'}>Confirmed</MenuItem>
            <MenuItem value={'Preparing'}>Preparing</MenuItem>
            <MenuItem value={'Delivering'}>Delivering</MenuItem>
            <MenuItem value={'Delivered'}>Delivered</MenuItem>
            <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
          </Select>
        </TableCell>
      <TableCell>
        <button onClick={() => handleOpenOrder(items,total)}>Detail</button>
      </TableCell>
    </TableRow>
    <OrderDetail open={open} onClose={handleCloseOrder} cartList={cartList} bill ={bill} />
    </>
  );
}

export default DataRow;