import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, TextField, Chip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Table from '../../components/Table';
import TablePagination from '@mui/material/TablePagination';
import SearchIcon from '@mui/icons-material/Search';

function SenderIDs() {
  const [senderIDs, setSenderIDs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchSenderIDs = async () => {
      const response = await fetch('/api/admin/sender-ids');
      const data = await response.json();
      setSenderIDs(data);
    };
    fetchSenderIDs();
  }, []);

  const handleApprove = (id) => {
    console.log(`Sender ID ${id} approved`);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const filteredSenderIDs = senderIDs.filter(senderID =>
    senderID.senderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const drawerItems = (
<<<<<<< HEAD
    <Box className="w-64" role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
=======
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
>>>>>>> acd4fce (first commit)
      <List>
        {['Dashboard', 'Plans & Customers', 'Orders', 'Payments', 'Sender IDs', 'Campaigns', 'Reports', 'Staff Management', 'Settings'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
<<<<<<< HEAD
    <Box className="flex">
=======
    <Box sx={{ display: 'flex' }}>
>>>>>>> acd4fce (first commit)
      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerItems}
      </Drawer>

      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
<<<<<<< HEAD
          <Typography variant="h6" className="flex-grow">
=======
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
>>>>>>> acd4fce (first commit)
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
<<<<<<< HEAD
      <Box component="main" className="flex-grow p-6 mt-16">
        <Typography variant="h4" className="mb-6">Sender ID Management</Typography>

        {/* Search Bar */}
        <Box className="flex items-center mb-4">
=======
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" gutterBottom>Sender ID Management</Typography>

        {/* Search Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
>>>>>>> acd4fce (first commit)
          <TextField
            label="Search Sender ID"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
            className="mr-4"
=======
            sx={{ mr: 2 }}
>>>>>>> acd4fce (first commit)
          />
          <IconButton color="primary">
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Sender ID Table */}
        <Table
          columns={['Sender ID', 'Customer Name', 'Status', 'Actions']}
          data={filteredSenderIDs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(senderID => ({
            ...senderID,
            status: (
              <Chip
                label={senderID.status}
                color={
                  senderID.status === 'Approved' ? 'success' :
                  senderID.status === 'Pending' ? 'warning' :
                  'default'
                }
<<<<<<< HEAD
                className="mr-2"
=======
>>>>>>> acd4fce (first commit)
              />
            ),
            actions: (
              <Button
                variant="contained"
                color="primary"
                disabled={senderID.status === 'Approved'}
                onClick={() => handleApprove(senderID.id)}
<<<<<<< HEAD
                className="ml-2"
=======
>>>>>>> acd4fce (first commit)
              >
                {senderID.status === 'Approved' ? 'Approved' : 'Approve'}
              </Button>
            )
          }))}
        />

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredSenderIDs.length}
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
  );
}

export default SenderIDs;
