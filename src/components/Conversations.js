import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, List, ListItem, Avatar } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import ChatWindow from "./ChatWindow";

const Conversations = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([
        { name: "Muhammad Ahmad", messages: ["Hi, how are you ahmad"], lastMessageDate: "21 Feb" },
    ]);

    const handleSelectChat = (index) => {
        setSelectedChat(index);
    };

    const handleSendMessage = (message) => {
        if (message.trim() !== "" && selectedChat !== null) {
            const updatedChats = [...chats];
            updatedChats[selectedChat].messages.push({ text: message, sender: "me" });
            setChats(updatedChats);
        }
    };

    return (
        <Box className="flex h-screen bg-gray-100 p-2 rounded-lg shadow-lg">
            {/* Sidebar */}
            <Box className="w-1/4 bg-white p-4 rounded-lg shadow-md">
                <Typography variant="h6" className="mb-2">Open</Typography>
                <Box className="flex items-center gap-2 mb-4">
                    <TextField variant="outlined" size="small" placeholder="Search chats..." className="flex-1" />
                    <IconButton>
                        <FilterList />
                    </IconButton>
                </Box>
                <List>
                    {chats.map((chat, index) => (
                        <ListItem
                            key={index}
                            button
                            onClick={() => handleSelectChat(index)}
                            className={`flex items-center gap-2 p-2 rounded-lg ${selectedChat === index ? "bg-blue-100" : ""}`}
                        >
                            <Avatar>{chat.name.charAt(0)}</Avatar>
                            <Box>
                                <Typography>{chat.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : "No recent messages"}
                                </Typography>
                            </Box>
                            <Typography variant="caption" className="ml-auto text-gray-500">
                                {chat.lastMessageDate}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Chat Window */}
            <ChatWindow selectedChat={selectedChat} chats={chats} onSendMessage={handleSendMessage} />
        </Box>
    );
};

export default Conversations;
