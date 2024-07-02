// TableComponent.jsx

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useEffect } from 'react';
import dashboardApi from '../../api/dashboardApi';

const TableComponent = () => {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    const getTop10 = async () => {
      try {
        const response = await dashboardApi.getTopOrdered();
        setData(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTop10();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Items</TableCell>
            <TableCell align="right">Ordered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                {index + 1}  
                </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell align="right">
                {row.ordered}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
