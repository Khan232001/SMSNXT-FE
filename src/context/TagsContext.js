import React, { createContext, useContext, useState, useEffect } from 'react';
import api from "../utils/api";

const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
    const [tags, setTags] = useState([]);
    const token = localStorage.getItem('token');

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchTags = async () => {
        try {
            const response = await api.get('/tags', authHeaders);
            setTags(response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch tags:', error);
        }
    };

    const createTag = async (tagData) => {
        try {
            const response = await api.post('/tags', tagData, authHeaders);
            setTags(prev => [...prev, response.data.data]);
            return response.data.data;
        } catch (error) {
            console.error('Error creating tag:', error);
            throw error;
        }
    };

    const updateTag = async (id, tagData) => {
        try {
            const response = await api.put(`/tags/${id}`, tagData, authHeaders);
            setTags(prev =>
                prev.map(tag => tag._id === id ? { ...tag, ...response.data.data } : tag)
            );
            return response.data.data;
        } catch (error) {
            console.error('Error updating tag:', error);
            throw error;
        }
    };

    const deleteTag = async (id) => {
        try {
            await api.delete(`/tags/${id}`, authHeaders);
            setTags(prev => prev.filter(tag => tag._id !== id));
        } catch (error) {
            console.error('Failed to delete tag:', error);
            throw error;
        }
    };

    const addContactsToTag = async (tagId, contactIds) => {
        try {
            const response = await api.put(`/tags/${tagId}`, {
                contacts: contactIds
            }, authHeaders);
            setTags(prev =>
                prev.map(tag =>
                    tag._id === tagId ? { ...tag, contacts: response.data.data.contacts } : tag
                )
            );
            return response.data.data;
        } catch (error) {
            console.error('Failed to add contacts to tag:', error);
            throw error;
        }
    };

    const removeContactFromTag = async (tagId, contactId) => {
        try {
            const response = await api.delete(`/tags/${tagId}/contacts`, {
                data: { contactId },
                ...authHeaders
            });
            setTags(prev =>
                prev.map(tag =>
                    tag._id === tagId ? {
                        ...tag,
                        contacts: tag.contacts.filter(c => c._id !== contactId)
                    } : tag
                )
            );
            return response.data.data;
        } catch (error) {
            console.error('Failed to remove contact from tag:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <TagsContext.Provider
            value={{
                tags,
                fetchTags,
                createTag,
                updateTag,
                deleteTag,
                setTags,
                addContactsToTag,
                removeContactFromTag
            }}
        >
            {children}
        </TagsContext.Provider>
    );
};

export const useTags = () => {
    const context = useContext(TagsContext);
    if (!context) {
        throw new Error('useTags must be used within a TagsProvider');
    }
    return context;
};
