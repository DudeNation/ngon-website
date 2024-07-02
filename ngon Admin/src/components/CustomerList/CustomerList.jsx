import React, { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Header from '../Header/Header';
import CustomerRow from './CustomerRow';
// Your component code here
import CusApi from '../../api/CusApi';

const CustomerList = () => {
    const [customer, setCustomer] = useState([]);
  
    useEffect(() => {
      const getAllCustomer = async () => {
        try {		
          const response = await CusApi.getAllCustomer();
          setCustomer(response?.data);
        } catch (error) {
        }
      }
      getAllCustomer();
    }, []);
  
    return (
      <div className="container">
        <Header />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Join Date</TableCell>
                <TableCell>Mail</TableCell>
                <TableCell>Name</TableCell>
              
                <TableCell>Phone</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Detail</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {customer.map((users) => (
                <CustomerRow 
                  email={users.email} 
                  name={users.name} 
                  date={users.createdAt}
                  phone={users.phone}    
                  total={users.totalSpending}
                 />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  

export default CustomerList;