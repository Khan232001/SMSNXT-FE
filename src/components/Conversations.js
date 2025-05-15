import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
    Box,
    Typography,
    TextField,
    IconButton,
    List,
    ListItem,
    Avatar,
    useTheme,
    InputAdornment,
    CircularProgress
} from "@mui/material";
import { FilterList, Search } from "@mui/icons-material";
import ChatWindow from "./ChatWindow";

const Conversations = () => {
    const theme = useTheme();
    const [selectedChat, setSelectedChat] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [chats, setChats] = useState([
        {
            id: 1,
            name: "Muhammad Ahmad",
            messages: [
                { text: "Hi, how are you Ahmad?", sender: "them", timestamp: "09:30 AM" }
            ],
            lastMessageDate: new Date().toLocaleDateString(),
            unread: 2
        },
    ]);

    const handleSelectChat = (index) => {
        setSelectedChat(index);
    };

    const handleSendMessage = async (message) => {
        if (message.trim() && selectedChat !== null) {
            const updatedChats = [...chats];
            updatedChats[selectedChat].messages.push({
                text: message,
                sender: "me",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            updatedChats[selectedChat].lastMessageDate = new Date().toLocaleDateString();
            setChats(updatedChats);
        }
    };

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            bgcolor: 'background.default',
            p: 2,
            gap: 2,
            flexDirection: { xs: 'column', md: 'row' }
        }}>
            {/* Conversations Sidebar */}
            <Box sx={{
                width: { xs: '100%', md: '30%' },
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>{}</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="action" />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 4 }
                        }}
                    />
                    <IconButton sx={{ ml: 1 }}>
                        <FilterList />
                    </IconButton>
                </Box>

                <List sx={{ flex: 1, overflowY: 'auto' }}>
                    {filteredChats.map((chat, index) => (
                        <ListItem
                            key={chat.id}
                            button
                            onClick={() => handleSelectChat(index)}
                            selected={selectedChat === index}
                            sx={{
                                gap: 2,
                                py: 1.5,
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                bgcolor: selectedChat === index ? 'primary.light' : 'inherit',
                                '&:hover': { bgcolor: 'action.hover' }
                            }}
                        >
                            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                                {chat.name.charAt(0)}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography fontWeight={600}>{chat.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {chat.lastMessageDate}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '70%'
                                        }}
                                    >
                                        {chat.messages.length > 0
                                            ? chat.messages[chat.messages.length - 1].text
                                            : 'No messages yet'}
                                    </Typography>
                                    {chat.unread > 0 && (
                                        <Box sx={{
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: 24,
                                            height: 24,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Typography variant="caption">{chat.unread}</Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Chat Window */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                height: '100%',
                borderRadius: 2,
                boxShadow: 1
            }}>
                <ChatWindow
                    selectedChat={selectedChat}
                    chats={chats}
                    onSendMessage={handleSendMessage}
                />
            </Box>
        </Box>
    );
};



export default Conversations;