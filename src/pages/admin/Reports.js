import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import Table from '../../components/Table';
import TablePagination from '@mui/material/TablePagination'; // For pagination
import Navbar from '../../components/Navbar'; // Assuming Navbar is in components folder
import Sidebar from '../../components/Sidebar'; // Assuming Sidebar is in components folder
import './Reports.css'; // Assuming there's a CSS file to handle styles

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
    <Box className="admin-container">
      {/* Navbar at the top */}
      <Navbar />
      
      <Box className="main-content">
        {/* Sidebar on the left */}
        <Sidebar className="sidebar" />

        {/* Main content area for the reports */}
        <Box className="reports-content">
          <Typography variant="h4" gutterBottom>Detailed Reports</Typography>

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
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Reports;
