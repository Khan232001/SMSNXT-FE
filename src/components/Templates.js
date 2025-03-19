import React, { useState } from "react";
import { Button, Box, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

const Templates = () => {
    const [templates, setTemplates] = useState([
        "Welcome to our service! Let us know how we can help.",
        "Your order has been confirmed! Expect delivery soon.",
        "Exclusive offer just for you! Use code DISCOUNT10 for 10% off.",
    ]);
    const [open, setOpen] = useState(false);
    const [newTemplate, setNewTemplate] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const handleOpen = (index = null) => {
        setEditIndex(index);
        setNewTemplate(index !== null ? templates[index] : "");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewTemplate("");
        setEditIndex(null);
    };

    const handleSave = () => {
        if (newTemplate.trim()) {
            if (editIndex !== null) {
                const updatedTemplates = [...templates];
                updatedTemplates[editIndex] = newTemplate;
                setTemplates(updatedTemplates);
            } else {
                setTemplates([...templates, newTemplate]);
            }
        }
        handleClose();
    };

    const handleDelete = (index) => {
        setTemplates(templates.filter((_, i) => i !== index));
    };

    return (
        <Box className="flex flex-col max-w-7xl mx-auto mt-8 bg-white p-4 rounded-md shadow-md w-full">
            <Typography variant="h4" className="text-gray-800 mb-4">Message Templates</Typography>

            <List className="mb-4">
                {templates.map((template, index) => (
                    <ListItem key={index} secondaryAction={
                        <>
                            <IconButton edge="end" onClick={() => handleOpen(index)}>
                                <Edit />
                            </IconButton>
                            <IconButton edge="end" onClick={() => handleDelete(index)}>
                                <Delete />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={template} />
                    </ListItem>
                ))}
            </List>

            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => handleOpen()}
                className="w-full md:w-40"
            >
                Create New
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editIndex !== null ? "Edit Template" : "Create New Template"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Template Text"
                        fullWidth
                        multiline
                        rows={4}
                        value={newTemplate}
                        onChange={(e) => setNewTemplate(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Templates;