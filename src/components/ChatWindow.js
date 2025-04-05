import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    useTheme
} from "@mui/material";
import { Send, MailOutline as MailOutlineIcon } from "@mui/icons-material";

const ChatWindow = ({ selectedChat, chats = [], onSendMessage }) => {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);
    const theme = useTheme();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chats, selectedChat]);

    const handleSendMessage = async () => {
        if (message.trim() && !isSending && selectedChat !== null) {
            setIsSending(true);
            try {
                await onSendMessage(message);
                setMessage("");
            } finally {
                setIsSending(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            height: '100%'
        }}>
            {selectedChat === null ? (
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'text.secondary',
                    p: 4
                }}>
                    <MailOutlineIcon sx={{ fontSize: 64, mb: 2, color: 'action.disabled' }} />
                    <Typography variant="h6" gutterBottom>
                        No Conversation Selected
                    </Typography>
                    <Typography variant="body2">
                        Select a chat from the list or start a new conversation
                    </Typography>
                </Box>
            ) : (
                <>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        {chats[selectedChat]?.name || 'Unknown Chat'}
                    </Typography>

                    <Box sx={{
                        flex: 1,
                        overflowY: 'auto',
                        mb: 2,
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        bgcolor: 'background.default'
                    }}>
                        {chats[selectedChat]?.messages.map((msg, i) => (
                            <Box key={i} sx={{ mb: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
                                }}>
                                    <Box sx={{
                                        maxWidth: '70%',
                                        p: 1.5,
                                        borderRadius: msg.sender === "me"
                                            ? '12px 12px 0 12px'
                                            : '12px 12px 12px 0',
                                        bgcolor: msg.sender === "me"
                                            ? 'primary.main'
                                            : 'grey.100',
                                        color: msg.sender === "me"
                                            ? 'primary.contrastText'
                                            : 'text.primary',
                                    }}>
                                        <Typography variant="body1">{msg.text}</Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                display: 'block',
                                                textAlign: 'right',
                                                color: msg.sender === "me"
                                                    ? 'primary.contrastText'
                                                    : 'text.secondary',
                                                mt: 0.5
                                            }}
                                        >
                                            {msg.timestamp || new Date().toLocaleTimeString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>
                </>
            )}

            <Box sx={{
                display: 'flex',
                gap: 1,
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider'
            }}>
                <TextField
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={4}
                    variant="outlined"
                    label="Type your message"
                    aria-label="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={selectedChat === null || isSending}
                    InputProps={{
                        sx: {
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={selectedChat === null || isSending || !message.trim()}
                    sx={{
                        minWidth: 'auto',
                        width: 56,
                        height: 56,
                        borderRadius: '50%'
                    }}
                >
                    {isSending ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                        <Send />
                    )}
                </Button>
            </Box>
        </Box>
    );
};




export default ChatWindow;