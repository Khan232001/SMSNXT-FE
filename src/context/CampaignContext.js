// MessageContext.js
import { createContext, useContext, useState, useRef } from "react";
import dayjs from "dayjs";
import Cookies from "js-cookie";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [multiSelectMode, setMultiSelectMode] = useState(false);
    const [scheduleDate, setScheduleDate] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [timeZone, setTimeZone] = useState("Eastern Time (ET)");
    const [campaigns, setCampaigns] = useState([]);
    const [selectedRecipients, setSelectedRecipients] = useState([""]);
    const [selectedImageUrl, setSelectedImageUrl] = useState(Cookies.get("selectedImage") || "");
    const [uploadedRecipients, setUploadedRecipients] = useState([]);
    const [message, setMessage] = useState("");
    const [recipients, setRecipients] = useState("");
    const [senderId, setSenderId] = useState("CUSTOM");
    const [scheduleTime, setScheduleTime] = useState(dayjs());
    const [timezone, setTimezone] = useState("America/New_York");
    const [repeat, setRepeat] = useState("none");
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

    return (
        <MessageContext.Provider
            value={{
                multiSelectMode,
                setMultiSelectMode,
                scheduleDate,
                setScheduleDate,
                fromTime,
                setFromTime,
                toTime,
                setToTime,
                timeZone,
                setTimeZone,
                campaigns,
                setCampaigns,
                selectedRecipients,
                setSelectedRecipients,
                selectedImageUrl,
                setSelectedImageUrl,
                uploadedRecipients,
                setUploadedRecipients,
                message,
                setMessage,
                recipients,
                setRecipients,
                senderId,
                setSenderId,
                scheduleTime,
                setScheduleTime,
                timezone,
                setTimezone,
                repeat,
                setRepeat,
                previewMode,
                setPreviewMode,
                openContactsModal,
                setOpenContactsModal,
                searchTerm,
                setSearchTerm,
                selectedContacts,
                setSelectedContacts,
                isUploadModalOpen,
                setIsUploadModalOpen,
                isFetchModalOpen,
                setIsFetchModalOpen,
                sendTimeOption,
                setSendTimeOption,
                isConfirmModalOpen,
                setIsConfirmModalOpen,
                sendMesageOpen,
                setSendMessageOpen,
                textareaRef,
            }}
        >
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => useContext(MessageContext);
