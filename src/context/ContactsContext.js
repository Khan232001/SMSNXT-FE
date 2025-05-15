import React, { createContext, useContext, useState } from "react";
import api from "../utils/api";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const token = localStorage.getItem("token");
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchContactsByTag = async (tagId) => {
        try {
            const response = await api.get(`/tags/${tagId}/contacts`, authHeaders);
            setContacts(response.data.data || []);
        } catch (error) {
            console.error("Failed to fetch contacts by tag:", error);
            throw error;
        }
    };

    const fetchAllContacts = async (excludedIds = []) => {
        try {
            const response = await api.get("/contacts", authHeaders);
            let fetched = response.data.data || [];

            if (!excludedIds.length) {
                setContacts(fetched);
            }
            setAllContacts(fetched);
            return fetched;
        } catch (error) {
            console.error("Failed to fetch all contacts:", error);
            throw error;
        }
    };



    return (
        <ContactsContext.Provider
            value={{
                contacts,
                allContacts,
                fetchContactsByTag,
                fetchAllContacts,
                setContacts,
                setAllContacts,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
};

export const useContacts = () => {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error("useContacts must be used within a ContactsProvider");
    }
    return context;
};
