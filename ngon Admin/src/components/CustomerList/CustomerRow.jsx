import React from 'react';
import { TableCell, TableRow } from '@mui/material';

const CustomerRow = ({ email, name, date, phone, total }) => {
  const formatDateTime = (date) => {
    const dateObj = new Date(date);
  
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Months are 0-based in JavaScript
    const year = dateObj.getFullYear();
    
  
    return `${day}/${month}/${year}`;
  };
  const formattedDate = formatDateTime(date);
  return (
    <TableRow>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{total}k</TableCell>
    
    </TableRow>
  );
}

export default CustomerRow;