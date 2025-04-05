import React from "react";
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Divider,
    Chip
} from "@mui/material";
import {
    Add,
    FileDownload,
    KeyboardArrowDown,
    Send
} from "@mui/icons-material";

const Templates = () => {
    const templates = [
        {
            name: "Survey SMS",
            category: "Support",
            content: "Thank you for your call today. Your opinion matters - please tell us about your experience in this short survey: https://link.com.",
            modified: "9 Nov 2024, 1:53 pm"
        },
        {
            name: "Reminder",
            category: "Support",
            content: "Hi {First name}, this is a friendly reminder for your appointment on 5/12 at 1 PM. Reply YES to confirm, NO to cancel, or STOP to opt-out.",
            modified: "9 Nov 2024, 1:38 pm"
        },
        {
            name: "Promotional SMS",
            category: "Marketing",
            content: "ABC Store: Hi {First name}, thanks for subscribing. You just became a Gold member! As one of our perks, we offer you exclusive access to our newest collection: https://link.com.",
            modified: "9 Nov 2024, 1:38 pm"
        },
        {
            name: "Promotion",
            category: "Sales",
            content: "ABC store: Thanks for being a loyal customer. Get 25% off your next purchase with a promo code: YES25.\nText STOP to opt-out.",
            modified: "9 Nov 2024, 1:38 pm"
        },
        {
            name: "Product launch ...",
            category: "Marketing",
            content: "{First name}, our new products are finally here! Hurry up before they sell out. Shop your first logo. Click? Click?",
            modified: "9 Nov 2024, 1:38 pm"
        }
    ];

    return (
        <Box sx={{ p: 3 }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">All templates</Typography>
                <Box>
                    <Button variant="contained" startIcon={<Add />} sx={{ mr: 2 }}>
                        New template
                    </Button>
                    <Button variant="outlined" startIcon={<FileDownload />} sx={{ mr: 2 }}>
                        Download
                    </Button>
                    <IconButton>
                        <KeyboardArrowDown />
                    </IconButton>
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Table Section */}
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell><Typography fontWeight="bold">Name</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Category</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Content</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Last modified</Typography></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {templates.map((template, index) => (
                            <TableRow key={index} hover>
                                <TableCell>
                                    <Typography fontWeight="medium">{template.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip label={template.category} size="small" />
                                </TableCell>
                                <TableCell sx={{ maxWidth: 400 }}>
                                    <Typography variant="body2" whiteSpace="pre-line">
                                        {template.content}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="textSecondary">
                                        {template.modified}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" startIcon={<Send />} size="small">
                                        Send
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Templates;