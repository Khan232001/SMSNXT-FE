import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import Table from '../../components/Table';
import TablePagination from '@mui/material/TablePagination'; // For pagination
import Navbar from '../../components/Navbar'; // Assuming Navbar is in components folder
import Sidebar from '../../components/Sidebar'; // Assuming Sidebar is in components folder
<<<<<<< HEAD
=======
import './Reports.css'; // Assuming there's a CSS file to handle styles
>>>>>>> acd4fce (first commit)

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
<<<<<<< HEAD
    <Box className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar />

      <Box className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar className="w-64" />

        {/* Main content area for the reports */}
        <Box className="flex-grow p-5 overflow-auto">
          <Typography variant="h4" className="mb-5">Detailed Reports</Typography>
=======
    <Box className="admin-container">
      {/* Navbar at the top */}
      <Navbar />
      
      <Box className="main-content">
        {/* Sidebar on the left */}
        <Sidebar className="sidebar" />

        {/* Main content area for the reports */}
        <Box className="reports-content">
          <Typography variant="h4" gutterBottom>Detailed Reports</Typography>
>>>>>>> acd4fce (first commit)

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
<<<<<<< HEAD
            className="mt-5"
=======
>>>>>>> acd4fce (first commit)
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Reports;
