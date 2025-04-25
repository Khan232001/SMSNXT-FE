import React, { useState, useEffect, useRef } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
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
  Image,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useContacts } from "../../context/ContactsContext";
import api from "../../utils/api";
import Cookies from "js-cookie";

const option = [
  { label: "<FIRST_NAME>", value: "<FIRST_NAME>", key: "name" },
  { label: "<LAST_NAME>", value: "<LAST_NAME>", key: "name" },
  { label: "<EMAIL>", value: "<EMAIL>", key: "email" },
  { label: "<PHONE_NUMBER>", value: "<PHONE_NUMBER>", key: "phoneNumber" },
];

const ComposeMessagePage = () => {
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [timeZone, setTimeZone] = useState("Eastern Time (ET)");

  const handleScheduleDateChange = (e) => setScheduleDate(e.target.value);
  const handleFromTimeChange = (e) => setFromTime(e.target.value);
  const handleToTimeChange = (e) => setToTime(e.target.value);
  const handleTimeZoneChange = (e) => setTimeZone(e.target.value);

  const [campaigns, setCampaigns] = useState([]);
  // const [selectedRecipients, setSelectedRecipients] = useState([""]);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  // const [uploadedRecipients, setUploadedRecipients] = useState([]);
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [senderId, setSenderId] = useState("CUSTOM");
  // const [scheduleTime, setScheduleTime] = useState(dayjs());
  // const [timezone, setTimezone] = useState("America/New_York");
  // const [repeat, setRepeat] = useState("none");
  const [previewMode, setPreviewMode] = useState(false);
  const [openContactsModal, setOpenContactsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFetchModalOpen, setIsFetchModalOpen] = useState(false);
  const [sendTimeOption, setSendTimeOption] = useState("now");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [sendMesageOpen, setSendMessageOpen] = useState(false);
  const textareaRef = useRef(null);

  const { contacts, fetchAllContacts } = useContacts();
  useEffect(() => {
    fetchAllContacts();
  }, []);

  const handleOpenContactsModal = () => {
    setOpenContactsModal(true);
    setSelectedContacts([]);
  };

  const handleRowClick = (contact) => {
    if (multiSelectMode) {
      handleContactSelect(contact);
    } else {
      setSelectedContacts(
        selectedContacts.some((c) => c.id === contact.id) ? [] : [contact]
      );
    }
  };

  const handleCloseContactsModal = () => {
    setOpenContactsModal(false);
  };

  const handleContactSelect = (contact) => {
    setSelectedContacts((prev) => {
      if (!contact?.id) return prev;

      const isSelected = prev.some((c) => c.id === contact.id);

      if (multiSelectMode) {
        return isSelected
          ? prev.filter((c) => c.id !== contact.id)
          : [...prev, contact];
      } else {
        return isSelected ? [] : [contact];
      }
    });
  };

  const handleAddSelectedContacts = () => {
    const phoneNumbers = selectedContacts.map((contact) => contact.phoneNumber);

    setRecipients((prev) => {
      const currentRecipients = prev
        ? prev
            .split(",")
            .map((r) => r.trim())
            .filter((r) => r)
        : [];

      const combined = [...new Set([...currentRecipients, ...phoneNumbers])];
      return combined.join(", ");
    });

    handleCloseContactsModal();
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phoneNumber?.includes(searchTerm)) &&
      !recipients.includes(contact.phoneNumber)
  );

  const getPreviewMessage = () => {
    return message
      .replace(/<FIRST_NAME>/g, "John")
      .replace(/<LAST_NAME>/g, "Doe")
      .replace(/<EMAIL>/g, "john@example.com")
      .replace(/<PHONE_NUMBER>/g, "+1234567890");
  };

  const handleToggleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts([...filteredContacts]);
    }
  };

  const insertFieldAtCursor = (selectedValue) => {
    if (!selectedValue) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    const beforeText = message.substring(0, startPos);
    const afterText = message.substring(endPos);

    const newMessage = beforeText + selectedValue + afterText;
    setMessage(newMessage);

    const newCursorPos = startPos + selectedValue.length;

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleUploadModal = () => {
    setIsUploadModalOpen(!isUploadModalOpen);
  };

  const handleFetchModal = () => {
    setIsFetchModalOpen(!isFetchModalOpen);
  };

  const handleProceed = (selectedImage) => {
    setSelectedImageUrl(selectedImage);
  };

  const handleImageRemove = () => {
    setSelectedImageUrl("");
    Cookies.remove("selectedImage");
  };

  const handleSendMessage = async () => {
    const data = {
      phoneNumber: recipients
        .split(",")
        .map((r) => r.trim())
        .filter((r) => r),
      message: message,
      image: selectedImageUrl,
    };

    try {
      const token = localStorage.getItem("token");
      const authHeaders = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post(
        `/campaign/send-test-message`,
        data,
        authHeaders
      );

      if (response?.data?.message === "Test message sent successfully.") {
           setSendMessageOpen(true);

           // Reset all states
           setRecipients("");
           setMessage("");
           setSelectedImageUrl("");
           setSelectedContacts([]);
           setSearchTerm("");

           // Reset scheduling options
           setSendTimeOption("now");
           setScheduleDate("");
           setFromTime("");
           setToTime("");
           setTimeZone("Eastern Time (ET)");

           // Close all modals
           setIsConfirmModalOpen(false);
           setOpenContactsModal(false);
           setIsUploadModalOpen(false);
           setIsFetchModalOpen(false);

           // Reset preview mode
           setPreviewMode(false);

           // Remove any stored image in cookies
           Cookies.remove("selectedImage");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSendMessageClose = () => {
    setSendMessageOpen(false);
  };

  const handleConfirmModal = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleSendTimeChange = (e) => {
    setSendTimeOption(e.target.value);
  };

  const splitMessage = (text) => {
    const chunkSize = 160;
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const messageChunks = splitMessage(message);
  const segmentCount = messageChunks.length;
  const imageUrl = Cookies.get("selectedImage");
  const totalSegments = segmentCount + (selectedImageUrl ? 1 : 0);
  const remainingSegments = 500 - totalSegments;

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
            mx: "auto",
          }}
        >
          Notice: Scheduled messages may require approval. Please verify your
          sender ID before sending.
        </Alert>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", px: 3, mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            maxWidth: 1450,
            mx: "auto",
            alignItems: "flex-start",
            px: 3,
            mt: 3,
          }}
        >
          <Box sx={{ flex: 1, minWidth: "500px" }}>
            <Typography fontWeight="bold" mb={1}>
              To
            </Typography>
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

            <Typography fontWeight="bold" mb={1}>
              From
            </Typography>
            <Select
              fullWidth
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              sx={{ mb: 3 }}
            >
              <MenuItem value="DEFAULT">
                (456) 412-3452 (United States)
              </MenuItem>
              <MenuItem value="CUSTOM">Custom Sender ID</MenuItem>
            </Select>

            <Typography fontWeight="bold" mb={1}>
              Message
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Type your message with <FIRST_NAME> or <COMPANY_NAME>..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mb: 1 }}
              inputRef={textareaRef}
            />
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography variant="caption">
                Characters: {message.length} | Parts:{" "}
                {Math.ceil(message.length / 153)} | Cost: $
                {(Math.ceil(message.length / 153) * 0.01).toFixed(2)}
              </Typography>

              <Select
                onChange={(e) => {
                  insertFieldAtCursor(e.target.value);
                  e.target.value = "";
                }}
                size="small"
                sx={{ width: 200 }}
                value=""
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Insert dynamic field...
                </MenuItem>
                {option?.map((field) => (
                  <MenuItem key={field.value} value={field.value}>
                    {field.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* Media buttons */}
            <Box display="flex" gap={2} mb={3}>
              <Button
                variant="outlined"
                startIcon={<Image />}
                onClick={handleUploadModal}
              >
                Add Media
              </Button>
              <Button
                variant="outlined"
                startIcon={<Image />}
                onClick={handleFetchModal}
              >
                Select Media
              </Button>
              {selectedImageUrl && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleImageRemove}
                >
                  Remove Image
                </Button>
              )}
            </Box>

            {selectedImageUrl && (
              <Box mb={3}>
                <img
                  src={selectedImageUrl}
                  alt="Selected"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            )}

            <Typography fontWeight="bold" mb={1}>
              Schedule
            </Typography>
            <Box display="flex" gap={2} alignItems="center" mb={2}>
              <FormControlLabel
                control={
                  <Radio
                    checked={sendTimeOption === "now"}
                    onChange={handleSendTimeChange}
                    value="now"
                  />
                }
                label="Send Now"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={sendTimeOption === "schedule"}
                    onChange={handleSendTimeChange}
                    value="schedule"
                  />
                }
                label="Schedule"
              />
            </Box>

            {sendTimeOption === "schedule" && (
              <>
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    value={scheduleDate}
                    onChange={handleScheduleDateChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>

                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    fullWidth
                    type="time"
                    label="From"
                    value={fromTime}
                    onChange={handleFromTimeChange}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    fullWidth
                    type="time"
                    label="To"
                    value={toTime}
                    onChange={handleToTimeChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>

                <Box mb={2}>
                  <TextField
                    fullWidth
                    select
                    label="Time Zone"
                    value={timeZone}
                    onChange={handleTimeZoneChange}
                  >
                    <MenuItem value="Eastern Time (ET)">
                      Eastern Time (ET)
                    </MenuItem>
                    <MenuItem value="Central Time (CT)">
                      Central Time (CT)
                    </MenuItem>
                    <MenuItem value="Mountain Time (MT)">
                      Mountain Time (MT)
                    </MenuItem>
                    <MenuItem value="Pacific Time (PT)">
                      Pacific Time (PT)
                    </MenuItem>
                  </TextField>
                </Box>
              </>
            )}

            <Box mt={2} mb={3}>
              <Typography variant="body2">
                <strong>Daily Text Limit:</strong>{" "}
                <Box
                  component="span"
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    bgcolor: "grey.200",
                    borderRadius: 1,
                    fontFamily: "monospace",
                  }}
                >
                  {`500 - ${totalSegments} = ${remainingSegments}`}
                </Box>
              </Typography>
            </Box>

            <Box
              mt={4}
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={2}
            >
              {/* <Button variant="text" sx={{ textTransform: "uppercase" }}>
                Cancel
              </Button> */}
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? "Hide Preview" : "Preview Message"}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Send />}
                  onClick={handleConfirmModal}
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
                  {sendTimeOption === "now" ? "Send Now" : "Schedule"}
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Sidebar */}
          <Box sx={{ minWidth: 260, maxWidth: 300, paddingLeft: 5 }}>
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
              <List>
                <ListItem
                  button
                  onClick={handleOpenContactsModal}
                  sx={{ cursor: "pointer" }}
                >
                  <Contacts fontSize="small" sx={{ mr: 1, color: "#4A90E2" }} />
                  <ListItemText primary="Add Contacts" />
                </ListItem>
                <ListItem button sx={{ cursor: "pointer" }}>
                  <ListAlt fontSize="small" sx={{ mr: 1, color: "#7C4DFF" }} />
                  <ListItemText primary="Lists" />
                </ListItem>
                <ListItem button sx={{ cursor: "pointer" }}>
                  <GroupWork
                    fontSize="small"
                    sx={{ mr: 1, color: "#FF4081" }}
                  />
                  <ListItemText primary="Segments" />
                </ListItem>
                <ListItem button sx={{ cursor: "pointer" }}>
                  <History fontSize="small" sx={{ mr: 1, color: "#2196F3" }} />
                  <ListItemText primary="Frequently Sent" />
                </ListItem>
              </List>

              <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                Sender Settings
              </Typography>
              <List>
                <ListItem button sx={{ cursor: "pointer" }}>
                  <ManageAccounts
                    fontSize="small"
                    sx={{ mr: 1, color: "#00C49F" }}
                  />
                  <ListItemText primary="Customize Sender Info" />
                </ListItem>
              </List>

              <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                Actions
              </Typography>
              <List>
                <ListItem button sx={{ cursor: "pointer" }}>
                  <DynamicFeed
                    fontSize="small"
                    sx={{ mr: 1, color: "#00ACC1" }}
                  />
                  <ListItemText primary="Insert Template" />
                </ListItem>
                <ListItem button sx={{ cursor: "pointer" }}>
                  <InsertDriveFile
                    fontSize="small"
                    sx={{ mr: 1, color: "#9CCC65" }}
                  />
                  <ListItemText primary="Add Dynamic Field" />
                </ListItem>
                <ListItem button sx={{ cursor: "pointer" }}>
                  <AttachFile
                    fontSize="small"
                    sx={{ mr: 1, color: "#F57C00" }}
                  />
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
                <Typography fontWeight="bold">
                  {sendTimeOption === "now" ? "Instant" : "Scheduled"}
                </Typography>
                <Typography variant="caption" display="block" mt={1}>
                  Message Cost
                </Typography>
                <Typography fontWeight="bold">
                  ${(Math.ceil(message.length / 153) * 0.01).toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* Preview Mode */}
          {previewMode && (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 8,
                mt: 2,
                px: 3,
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mb: 1,
                        }}
                      >
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
                      {selectedImageUrl && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#DCF8C6",
                              borderRadius: "18px 18px 0 18px",
                              p: 1,
                              maxWidth: "70%",
                            }}
                          >
                            <img
                              src={selectedImageUrl}
                              alt="Preview"
                              style={{ maxWidth: "100%", borderRadius: "12px" }}
                            />
                          </Box>
                        </Box>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: "white",
                            borderRadius: "18px 18px 18px 0",
                            p: 2,
                            maxWidth: "70%",
                          }}
                        >
                          <Typography>
                            Hi! This is a reply to your message.
                          </Typography>
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
      </Box>

      {/* Contacts Modal */}
      <Modal open={openContactsModal} onClose={handleCloseContactsModal}>
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
            <Typography variant="h6">Select Contacts</Typography>
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
                  <TableCell>First Name</TableCell>
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
                          onChange={() => {
                            handleContactSelect(contact);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {contact.name.trim("").split(" ")[0] || "No name"}
                      </TableCell>
                      <TableCell>{contact.phoneNumber || "No phone"}</TableCell>
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

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmModalOpen} onClose={handleCloseConfirmModal}>
        <DialogTitle>Confirm Message</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to{" "}
            {sendTimeOption === "now" ? "send" : "schedule"} this message?
          </Typography>
          {sendTimeOption === "schedule" && (
            <Typography mt={2}>
              Scheduled for: {scheduleDate} between {fromTime} and {toTime} (
              {timeZone})
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal}>Cancel</Button>
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={sendMesageOpen} onClose={handleSendMessageClose}>
        <DialogTitle>Message Sent</DialogTitle>
        <DialogContent>
          <Typography>Your message has been sent successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendMessageClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ComposeMessagePage;
