import React from 'react';
import { TableContainer, Table as MuiTable, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

function Table({ columns, data }) {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column.toLowerCase().replace(' ', '_')]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
