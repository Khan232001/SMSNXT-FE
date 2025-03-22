import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Send } from "@mui/icons-material";



const ChatWindow= ({ selectedChat, chats, onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <Box className="flex-1 bg-white mx-4 p-6 rounded-lg shadow-md flex flex-col justify-between">
            {selectedChat === null ? (
                <Box className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Typography variant="h6">No conversation selected</Typography>
                    <Typography variant="body2">
                        Please select a chat or start a new one using the "New chat" icon above.
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6" className="mb-4">
                        {chats[selectedChat].name}
                    </Typography>
                    <Box className="h-80 overflow-y-auto border p-4 rounded-lg mb-4">
                        {chats[selectedChat].messages.map((msg, i) => (
                            <Typography key={i} className={msg.sender === "me" ? "text-right text-blue-600" : "text-left"}>
                                {msg.text}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            )}

            {/* Message Input */}
            <Box className="flex items-center gap-2 border-t pt-4">
                <TextField
                    fullWidth
                    multiline
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={selectedChat === null}>
                    <Send />
                </Button>
            </Box>
        </Box>
    );
};

export default ChatWindow;
