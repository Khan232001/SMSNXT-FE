import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import Table from '../../components/Table';
import TablePagination from '@mui/material/TablePagination'; // For pagination
import Navbar from '../../components/Navbar'; // Assuming Navbar is in components folder
import Sidebar from '../../components/AdminSidebar'; // Assuming Sidebar is in components folder

function Reports() {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0); // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  useEffect(() => {
    // Fetch reports data
    const fetchReports = async () => {
      const response = await fetch('/api/admin/reports');
      const data = await response.json();
      setReports(data);
    };
    fetchReports();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar /> <br/> <br/>

      <Box className="flex flex-1 mt-12"> {/* Add margin-top to account for Navbar */}
        {/* Sidebar on the left */}
        <Sidebar className="w-64 fixed h-full" />

        {/* Main content area for the reports */}
        <Box className="flex-grow ml-64 p-5 overflow-auto">
          <Typography variant="h4" className="mb-5">Detailed Reports</Typography>

          {/* Reports Table */}
          <Table
            columns={['Report Type', 'Details', 'Date', 'Status']}
            data={reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((report) => ({
              ...report,
              // Conditionally render status with a color-coded Chip component
              status: (
                <Chip
                  label={report.status}
                  color={
                    report.status === 'Completed' ? 'success' :
                    report.status === 'Pending' ? 'warning' :
                    report.status === 'Failed' ? 'error' :
                    'default'
                  }
                />
              )
            }))}
          />

          {/* Pagination */}
          <TablePagination
            component="div"
            count={reports.length}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            className="mt-5"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Reports;
