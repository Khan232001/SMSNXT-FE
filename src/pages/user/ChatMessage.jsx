
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  InputAdornment,
  Avatar,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  InsertDriveFile,
  DynamicFeed,
  AttachFile,
  Schedule,
  Contacts,
  ListAlt,
  GroupWork,
  History,
  ManageAccounts,
  Close,
  Search,
  Send,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { useContacts } from "../../context/ContactsContext";

const ComposeMessagePage = () => {
  const [multiSelectMode, setMultiSelectMode] = useState(false);

  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [senderId, setSenderId] = useState("CUSTOM");
  const [scheduleTime, setScheduleTime] = useState(dayjs());
  const [timezone, setTimezone] = useState("America/New_York");
  const [repeat, setRepeat] = useState("none");
  const [previewMode, setPreviewMode] = useState(false);
  // Contacts modal state
  const [openContactsModal, setOpenContactsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  // Contacts context
  const { contacts, allContacts, fetchAllContacts } = useContacts();

  // Fetch contacts on component mount
  useEffect(() => {
    fetchAllContacts();
  }, [fetchAllContacts]);

  // Open contacts modal
  const handleOpenContactsModal = () => {
    setOpenContactsModal(true);
    setSelectedContacts([]);
  };
const handleRowClick = (contact) => {
  if (multiSelectMode) {
    handleContactSelect(contact);
  } else {
    // Single selection mode - replace current selection
    setSelectedContacts(
      selectedContacts.some((c) => c.id === contact.id) ? [] : [contact]
    );
  }
};
  // Close contacts modal
  const handleCloseContactsModal = () => {
    setOpenContactsModal(false);
  };

  // Toggle contact selection
const handleContactSelect = (contact) => {
  setSelectedContacts((prev) => {
    // Check if contact exists and has an id
    if (!contact?.id) return prev;

    const isSelected = prev.some((c) => c.id === contact.id);

    if (multiSelectMode) {
      // Multiple selection mode - toggle this contact
      return isSelected
        ? prev.filter((c) => c.id !== contact.id) // Remove if already selected
        : [...prev, contact]; // Add if not selected
    } else {
      // Single selection mode - replace entire selection
      return isSelected
        ? [] // Deselect if clicking the same contact
        : [contact]; // Select only this contact
    }
  });
};

  // Add selected contacts to recipients
  const handleAddSelectedContacts = () => {
    const phoneNumbers = selectedContacts.map((contact) => contact.phoneNumber);

    setRecipients((prev) => {
      // Remove any existing commas and trim whitespace
      const currentRecipients = prev
        ? prev
            .split(",")
            .map((r) => r.trim())
            .filter((r) => r)
        : [];

      // Combine existing with new, remove duplicates
      const combined = [...new Set([...currentRecipients, ...phoneNumbers])];

      return combined.join(", ");
    });

    handleCloseContactsModal();
  };

  // Filter contacts based on search term
  const filteredContacts = allContacts.filter(
    (contact) =>
      (contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone_number?.includes(searchTerm)) &&
      !recipients.includes(contact.phone_number) // Exclude already added contacts
  );

  // Replace template tags with sample values
  const getPreviewMessage = () => {
    return message
      .replace(/<FIRST_NAME>/g, "John")
      .replace(/<MANAGER_FIRST_NAME>/g, "Sarah")
      .replace(/<COMPANY_NAME>/g, "Acme Inc");
  };

  const handleToggleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts([...filteredContacts]);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ px: 3, mt: 2, maxWidth: 1450, mx: "auto" }}>
        <Alert
          severity="warning"
          sx={{
            maxWidth: "850px",
            width: "100%",
            px: 2,
            py: 0.2,
            fontSize: "14px",
            
          }}
        >
          Notice: Scheduled messages may require approval. Please verify your sender ID before sending.
        </Alert>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", px: 3, mt: 3 }}>
        <Box sx={{ display: "flex", gap: 3, maxWidth: 1450,mx: "auto", alignItems: "flex-start",px: 3,
    mt: 3,}}>

          <Box sx={{ flex: 1, minWidth: "500px" }}>
            <Typography fontWeight="bold" mb={1}>To</Typography>
            <TextField
              fullWidth
              placeholder="Start typing a number or contact name"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                    onClick={handleOpenContactsModal}
                    aria-label="open contacts"
                  >
                      <Contacts />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography fontWeight="bold" mb={1}>From</Typography>
            <Select
              fullWidth
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              sx={{ mb: 3 }}
            >
              <MenuItem value="DEFAULT">(456) 412-3452 (United States)</MenuItem>
              <MenuItem value="CUSTOM">Custom Sender ID</MenuItem>
            </Select>

            <Typography fontWeight="bold" mb={1}>Message</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Type your message with <FIRST_NAME> or <COMPANY_NAME>..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
              Characters: {message.length} | Parts: {Math.ceil(message.length / 153)} | Cost: ${(
                Math.ceil(message.length / 153) * 0.01
              ).toFixed(2)}
            </Typography>

            <Typography fontWeight="bold" mb={1}>Schedule</Typography>
            <Box display="flex" gap={2} alignItems="center" mb={2} flexWrap="wrap">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="First send date"
                  value={scheduleTime}
                  onChange={(newValue) => setScheduleTime(newValue)}
                  sx={{ width: 160 }}
                />
              </LocalizationProvider>

              <Select
                value={scheduleTime.format("hh")}
                onChange={(e) => setScheduleTime(scheduleTime.hour(Number(e.target.value)))}
                sx={{ width: 80 }}
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </Select>

              <Select
                value={scheduleTime.format("mm")}
                onChange={(e) => setScheduleTime(scheduleTime.minute(Number(e.target.value)))}
                sx={{ width: 80 }}
              >
                {[...Array(60)].map((_, i) => (
                  <MenuItem key={i} value={i}>{i.toString().padStart(2, "0")}</MenuItem>
                ))}
              </Select>

              <Select
                value={scheduleTime.format("A")}
                onChange={(e) => {
                  const isPM = e.target.value === "PM";
                  const hour = scheduleTime.hour();
                  const newHour = isPM ? (hour < 12 ? hour + 12 : hour) : (hour === 12 ? 0 : hour);
                  setScheduleTime(scheduleTime.hour(newHour));
                }}
                sx={{ width: 80 }}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </Select>
            </Box>

            <Box display="flex" gap={2} flexWrap="wrap" alignItems="flex-start">
              <Box flex={1}>
                <Typography fontWeight="bold" mb={1}>Timezone</Typography>
                <Select
                  fullWidth
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <MenuItem value="America/New_York">(UTC-0500) America/New_York</MenuItem>
                  <MenuItem value="America/Chicago">(UTC-0600) America/Chicago</MenuItem>
                  <MenuItem value="America/Los_Angeles">(UTC-0800) America/Los_Angeles</MenuItem>
                </Select>
                <Typography variant="caption" color="text.secondary">
                This system automatically considers daylight saving time (DST)
                changes.
                </Typography>
              </Box>

              <Box flex={1}>
                <Typography fontWeight="bold" mb={1}>Repeat</Typography>
                <Select
                  fullWidth
                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value)}
                >
                  <MenuItem value="none">Doesn't repeat</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
              <Button variant="text" sx={{ textTransform: "uppercase", cursor: "pointer" }}>Cancel</Button>
              <Box display="flex" gap={2}>
                <Button variant="outlined" sx={{ cursor: "pointer" }} onClick={() => setPreviewMode(!previewMode)}>
                  {previewMode ? "Hide Preview" : "Preview Message"}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Schedule />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "uppercase",
                    fontWeight: "600",
                    background: "linear-gradient(to right, #4A90E2, #00C49F)",
                    "&:hover": {
                      background: "linear-gradient(to right, #378FE6, #38C2A9)",
                    },
                  }}
                >
                  Schedule
                </Button>
              </Box>
            </Box>
          </Box>

      
          </Box>
          {/* RIGHT SIDE - Sidebar with additional options */}
<Box sx={{ minWidth: 260, maxWidth: 300  }}>
  <Paper
    elevation={0}
    sx={{
      p: 2,
      backgroundColor: "#ffffff",
      borderRadius: 3,
      border: "1px solid #E0E0E0",
    }}
  >
   <Typography variant="subtitle2" fontWeight="bold" mb={1}>
   Contacts
</Typography>

{/* CONTACTS SECTION */}

<List>
  <ListItem button onClick={handleOpenContactsModal}>
    <Contacts fontSize="small" sx={{ mr: 1, color: "#4A90E2" }} />
    <ListItemText primary="Add Contacts" />
  </ListItem>
  <ListItem button>
    <ListAlt fontSize="small" sx={{ mr: 1, color: "#7C4DFF" }} />
    <ListItemText primary="Lists" />
  </ListItem>
  <ListItem button>
    <GroupWork fontSize="small" sx={{ mr: 1, color: "#FF4081" }} />
    <ListItemText primary="Segments" />
  </ListItem>
  <ListItem button>
    <History fontSize="small" sx={{ mr: 1, color: "#2196F3" }} />
    <ListItemText primary="Frequently Sent" />
  </ListItem>
</List>

{/* SENDER SETTINGS SECTION */}
<Typography variant="subtitle2" fontWeight="bold" mb={1}>
   Sender Settings
</Typography>
<List>
  <ListItem button>
    <ManageAccounts fontSize="small" sx={{ mr: 1, color: "#00C49F" }} />
    <ListItemText primary="Customize Sender Info" />
  </ListItem>
</List>

{/* ACTIONS SECTION */}
<Typography variant="subtitle2" fontWeight="bold" mb={1}>
   Actions
</Typography>
<List>
  <ListItem button>
    <DynamicFeed fontSize="small" sx={{ mr: 1, color: "#00ACC1" }} />
    <ListItemText primary="Insert Template" />
  </ListItem>
  <ListItem button>
    <InsertDriveFile fontSize="small" sx={{ mr: 1, color: "#9CCC65" }} />
    <ListItemText primary="Add Dynamic Field" />
  </ListItem>
  <ListItem button>
    <AttachFile fontSize="small" sx={{ mr: 1, color: "#F57C00" }} />
    <ListItemText primary="Attach File" />
  </ListItem>
</List>

    <Divider sx={{ my: 2 }} />

    <Typography variant="subtitle2" fontWeight="bold" mb={1}>
      Analytics
    </Typography>
    <Box sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="caption" display="block">
        Estimated Delivery
      </Typography>
      <Typography fontWeight="bold">Instant</Typography>
      <Typography variant="caption" display="block" mt={1}>
        Message Cost
      </Typography>
      <Typography fontWeight="bold">
        ${(Math.ceil(message.length / 153) * 0.01).toFixed(2)}
      </Typography>
    </Box>
  </Paper>
</Box>

          {previewMode && (
  <Box
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row", // ← This is the fix
      alignItems: "flex-start",
      gap: 8,
      mt: 2,
    }}
  >
    <Box
      sx={{
        width: 300,
        height: 550,
        border: "10px solid #222",
        borderRadius: "30px",
        backgroundColor: "#f8f8f8",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        mt: 0.5,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Status Bar */}
      <Box
        sx={{
          height: 30,
          backgroundColor: "#222",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          fontSize: 12,
        }}
      >
        <span>9:41</span>
        <Box sx={{ display: "flex", gap: 1 }}>
          <span>5G</span>
          <span>100%</span>
        </Box>
      </Box>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #eee",
        }}
      >
        <Avatar sx={{ bgcolor: "#4A90E2", mr: 1 }}>S</Avatar>
        <Box>
          <Typography fontWeight="bold">SMS Service</Typography>
          <Typography variant="caption" color="text.secondary">
            +1 (456) 412-3452
          </Typography>
        </Box>
        <IconButton sx={{ ml: "auto" }}>
                    <MoreVert />
                  </IconButton>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          height: "calc(100% - 120px)",
          overflowY: "auto",
          backgroundColor: "#e5ddd5",
          backgroundImage:
                      "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABnSURBVDhP7cxBCsAgDETR6P3P3KVLFy4K+QNpkVLwQcDMm0A2pZRSSimllP7qA3kXjTFijHnvWGtZa1lrWWtZa1lrWWtZa1lrWWtZa1lrWWtZa1lrWWtZa1lrWWtZa1lrWWtZa+0D+QBN+JCwWw2F3QAAAABJRU5ErkJggg==')",
        }}
      >
        {message ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <Box
                sx={{
                  backgroundColor: "#DCF8C6",
                  borderRadius: "18px 18px 0 18px",
                  p: 2,
                  maxWidth: "70%",
                }}
              >
                <Typography>{getPreviewMessage()}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "18px 18px 18px 0",
                  p: 2,
                  maxWidth: "70%",
                }}
              >
                <Typography>Hi! This is a reply to your message.</Typography>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            <Typography>No message to preview</Typography>
          </Box>
        )}
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#f0f0f0",
          px: 1,
          py: 0.8,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <TextField
          placeholder="Type a message"
          size="small"
          fullWidth
          sx={{
            mx: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "white",
            },
          }}
        />
        <IconButton>
          <Mic />
        </IconButton>
      </Box>

      {/* Footer */}
      {message && (
        <Box
          sx={{
            textAlign: "center",
            py: 0.5,
            backgroundColor: "#f8f8f8",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Reply STOP to unsubscribe:6664
          </Typography>
        </Box>
      )}
    </Box>
  </Box>
  
)}
 </Box>



{/* Contacts Modal */}
<Modal
  open={openContactsModal}
  onClose={handleCloseContactsModal}
  aria-labelledby="contacts-modal-title"
  aria-describedby="contacts-modal-description"
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: 800,
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: 2,
      p: 4,
      maxHeight: "80vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Typography id="contacts-modal-title" variant="h6">
        Select Contacts
      </Typography>
      <IconButton onClick={handleCloseContactsModal}>
        <Close />
      </IconButton>
    </Box>

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <TextField
        fullWidth
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mr: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Box display="flex" alignItems="center">
        <FormControlLabel
          control={
            <Switch
              checked={multiSelectMode}
              onChange={() => setMultiSelectMode(!multiSelectMode)}
              color="primary"
            />
          }
          label="Multiple Selection"
          sx={{ mr: 2 }}
        />
        {multiSelectMode && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleToggleSelectAll}
            disabled={filteredContacts.length === 0}
          >
            {selectedContacts.length === filteredContacts.length
              ? "Deselect All"
              : "Select All"}
          </Button>
        )}
      </Box>
    </Box>

    <TableContainer sx={{ flex: 1, overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              {multiSelectMode && (
                <Checkbox
                  indeterminate={
                    selectedContacts.length > 0 &&
                    selectedContacts.length < filteredContacts.length
                  }
                  checked={
                    filteredContacts.length > 0 &&
                    selectedContacts.length === filteredContacts.length
                  }
                  onChange={handleToggleSelectAll}
                />
              )}
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <TableRow
                key={contact.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => handleRowClick(contact)}
              >
                <TableCell
                  padding="checkbox"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={selectedContacts.some(
                      (c) => c.id === contact.id
                    )}
                    onChange={() => handleContactSelect(contact)}
                  />
                </TableCell>
                <TableCell>{contact.name || "No name"}</TableCell>
                <TableCell>
                  {contact.phoneNumber || "No phone"}
                </TableCell>
                <TableCell>{contact.email || "No email"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No contacts found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
    >
      <Typography variant="body2">
        {selectedContacts.length} contact(s) selected
      </Typography>
      <Box display="flex" gap={2}>
        <Button variant="outlined" onClick={handleCloseContactsModal}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAddSelectedContacts}
          disabled={selectedContacts.length === 0}
        >
          {multiSelectMode ? "Add Selected" : "Add Contact"}
        </Button>
      </Box>
        </Box>
        </Box>
        </Modal>
      </Box>
     
  );
};

export default ComposeMessagePage;
