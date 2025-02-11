import React, { useState, Fragment, useEffect } from "react";
import UserNavbar from "../../components/UserNavbar";
import api from "../../utils/api";
import UserSidebar from "../../components/UserSidebar";
import Papa from "papaparse";
import { Listbox, ListboxButton, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Tooltip from "../../components/Tooltip";
import UploadImage from "../../components/UploadImage";
import Cookies from "js-cookie";
import FetchImage from "../../components/FetchImage";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import FormValidationError from "../../components/FormValidatorError";
import {MultiSelect} from "react-multi-select-component";
import Modal from "../../components/Modal";

const tags = [
  { id: 1, name: "Select an option", value: "" },
  { id: 2, name: "Tag 1", value: "tag1" },
  { id: 3, name: "Tag 2", value: "tag2" },
];

const textBlasts = [
  { id: 1, name: "Select an option", value: "" },
  { id: 2, name: "Text Blast 1", value: "blast1" },
  { id: 3, name: "Text Blast 2", value: "blast2" },
];

const options = [
  { label: "Contact 1 ", value: "Contact 1" },
  { label: "Contact 2 ", value: "Contact 2" },
  { label: "Contact 3 ", value: "Contact 3" },
];

const CustomSelect = ({
  options,
  selected,
  onChange,
  label,
  openUpward = false,
  isMulti = false,
  error,
  onErrorChange,
}) => {
  const handleSelect = (option) => {
    if (isMulti) {
      if (option.id === 1) return;

      const isSelected = selected.some((item) => item.id === option.id);
      if (isSelected) {
        onChange(selected.filter((item) => item.id !== option.id));
        onErrorChange("");
      } else {
        onChange([...selected, option]);
        onErrorChange("");
      }
    } else {
      onChange(option);
    }
  };

  const removeTag = (tagId, e) => {
    e.stopPropagation();
    onChange(selected.filter((item) => item.id !== tagId));
  };

  return (
    <div className="w-full relative">
      <Listbox value={selected} onChange={handleSelect} multiple={isMulti}>
        {({ open }) => (
          <div className="relative mt-1">
            <ListboxButton className="relative w-full cursor-default rounded-xl bg-white py-3 px-4 text-left border border-gray-300 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 min-h-[48px]">
              <div className="flex flex-wrap gap-2">
                {isMulti ? (
                  selected.length > 0 ? (
                    selected.map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {item.name}
                        <button
                          type="button"
                          onClick={(e) => removeTag(item.id, e)}
                          className="ml-1 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full"
                        >
                          <svg
                            className="h-3 w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Select options...</span>
                  )
                ) : (
                  <span className="block truncate text-gray-700">
                    {selected.name || "Select an option"}
                  </span>
                )}
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute ${
                  openUpward
                    ? "bottom-[calc(100%+0.5rem)]"
                    : "top-[calc(100%+0.5rem)]"
                } w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[100] max-h-60`}
                static
              >
                {options.slice(1).map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`
                    }
                    value={option}
                  >
                    {({ selected: isSelected }) => (
                      <div
                        className="flex items-center"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelect(option);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selected.some(
                            (item) => item.id === option.id
                          )}
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onChange={() => {}}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span
                          className={`block truncate ${
                            isSelected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.name}
                        </span>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

const TextBlast = ({
  createTextBlast,
  setCreateTextBlast,
  selectedCampaign,
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [textBlastName, setTextBlastName] = useState("");
  const [textBlastNameError, setTextBlastNameError] = useState("");

  const [campaigns, setCampaigns] = useState([]);
  const [uploadedRecipients, setUploadedRecipients] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsError, setSelectedTagsError] = useState("");

  const [selectedExcludeTags, setSelectedExcludeTags] = useState([]);
  const [selectedBlasts, setSelectedBlasts] = useState([]);
  const [message, setMessage] = useState(
    "Hi <FIRST_NAME>, it's <MANAGER_FIRST_NAME> at <COMPANY_NAME>. Reply Stop to Unsubscribe"
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFetchModalOpen, setIsFetchModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const [scheduleDate, setScheduleDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [timeZone, setTimeZone] = useState("Eastern Time (ET)");

  const handleScheduleDateChange = (e) => setScheduleDate(e.target.value);
  const handleFromTimeChange = (e) => setFromTime(e.target.value);
  const handleToTimeChange = (e) => setToTime(e.target.value);
  const handleTimeZoneChange = (e) => setTimeZone(e.target.value);

  const [tags, setTags] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleConfirmModal = () => {
    setIsConfirmModalOpen((isConfirmModalOpen) => !isConfirmModalOpen);
  };  

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  useEffect(() => {
    if (selectedCampaign) {
      const selectedTagData = selectedCampaign.tags
        .map((tagObj) => {
          const tag = tags.find((tag) => tag.id === tagObj.tagId.toString());
          return tag ? { id: tag.id, name: tag.name, value: tag.value } : null;
        })
        .filter((tag) => tag !== null);

      setSelectedTags(selectedTagData);
    }
  }, [tags, selectedCampaign]);

  useEffect(() => {
    if (selectedCampaign) {
      setTextBlastName(selectedCampaign.name || "");

      const formattedDate = new Date(selectedCampaign.schedule.date)
        .toISOString()
        .split("T")[0];
      setScheduleDate(formattedDate);

      setMessage(selectedCampaign.message.textSegments.join("\n") || "");
      if (selectedCampaign.status === "active") {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
      setSendTimeOption(selectedCampaign.schedule.sendTimeOption);
      setFromTime(selectedCampaign.schedule.fromTime || "");
      setToTime(selectedCampaign.schedule.toTime || "");
      setTimeZone(selectedCampaign.schedule.timeZone || "Eastern Time (ET)");
      setSelectedImageUrl(selectedCampaign.message.image || "");
    }
    fetchTags();
  }, []);

  const token = localStorage.getItem("token");
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const navigate = useNavigate();

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (textBlastName === "") {
        setTextBlastNameError("Text Blast Name is required");
        return;
      }
      if (selectedTags.length === 0) {
        setSelectedTagsError("Please select at least one tag");
        return;
      }
    }
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const fetchTags = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await api.get("/tags", authHeaders);

      const fetchedTags = response.data.data.map((tag) => ({
        id: tag._id,
        name: tag.name,
        value: tag._id,
      }));
      setTags([{ id: 1, name: "Select an option", value: "" }, ...fetchedTags]);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      alert("Could not load tags. Please try again.");
    }
  };

  const handleCancel = () => {
    Cookies.remove("selectedImage");
    setCreateTextBlast(false);
  };

  const handleUploadModal = () => {
    setIsUploadModalOpen((isUploadModalOpen) => !isUploadModalOpen);
  };

  const handleFetchModal = () => {
    setIsFetchModalOpen((isFetchModalOpen) => !isFetchModalOpen);
  };
  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleProceed = (selectedImage) => {
    setSelectedImageUrl(imageUrl);
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
  const [sendTimeOption, setSendTimeOption] = useState("now");
  const imageUrl = Cookies.get("selectedImage");

  const totalSegments = segmentCount + (selectedImageUrl ? 1 : 0);

  let schedule = {};
  if (sendTimeOption === "now") {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate.toTimeString().split(" ")[0].slice(0, 5);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    schedule = {
      sendTimeOption: sendTimeOption,
      date: formattedDate,
      fromTime: formattedTime,
      toTime: formattedTime,
      timeZone: timeZone,
    };
  } else {
    schedule = {
      sendTimeOption,
      date: scheduleDate,
      fromTime: fromTime,
      toTime: toTime,
      timeZone: timeZone,
    };
  }

  const campaignData = {
    name: textBlastName,
    // status: isActive ? 'active' : 'inactive',
    tags: selectedTags.map((tag) => ({
      tagId: tag.value,
      tagName: tag.name,
    })),
    message: {
      textSegments: messageChunks,
      image: imageUrl,
    },
    schedule,
    dailyLimit: 500,
  };
  
  const handleActivateCampaign = async () => {
    const newStatus = !isActive;  // Determine new status before updating state
    setIsActive(newStatus);  

    const updatedCampaignData = {
      ...campaignData, 
      status: newStatus ? 'active' : 'inactive', 
    };


    try {
      let response;
      if (selectedCampaign) {
        console.log('updatedCampaignData111');
        response = await api.put(
          `/campaign/${selectedCampaign._id}`,
          updatedCampaignData,
          authHeaders
        );
      } else {
        console.log('updatedCampaignData2222');
        response = await api.post(
          "/campaign",
          updatedCampaignData,
          authHeaders
        );
      }


      console.log(response.data);
      if(response?.data?.message === 'Campaign created successfully'){
        handleCloseConfirmModal()
      }
      if (isActive) {
        console.log("campaign inactive");
      } else {
        console.log("Sending campaign messages...");
        await api.post(`/campaign/send-campaign/${selectedCampaign._id}`, {}, authHeaders);
        console.log("Campaign messages are being sent.");
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
    }
};

  
  const handleSaveCampaign = async () => {
    const updatedCampaignData = {
      ...campaignData,
      status: isActive ? "active" : "inactive",
    };

    try {
      let response;
      if (selectedCampaign) {
        response = await api.put(
          `/campaign/${selectedCampaign._id}`,
          updatedCampaignData,
          authHeaders
        );
      } else {
        response = await api.post(
          "/campaign",
          updatedCampaignData,
          authHeaders
        );
      }

      console.log(response.data);
      setCreateTextBlast(false);
    } catch (error) {
      console.error("Error saving campaign:", error);
    }
  };

  const steps = [
    { number: 1, name: "Setup" },
    { number: 2, name: "Compose" },
    { number: 3, name: "Schedule" },
    { number: 4, name: "Preview" },
  ];

  const handleCreateCampaign = () => {
    const campaignName = prompt("Enter Campaign Name");
    if (campaignName) {
      setCampaigns([
        ...campaigns,
        {
          id: campaigns.length + 1,
          name: campaignName,
          status: "Draft",
          startDate: "TBD",
          endDate: "TBD",
          targetAudience: `${uploadedRecipients.length} Recipients`,
        },
      ]);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setUploadedRecipients(results.data);
          setFilteredRecipients(results.data);
          alert(`Successfully imported ${results.data.length} recipients!`);
        },
        error: (error) => {
          alert("Error parsing CSV: " + error.message);
        },
      });
    }
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  const handleFilterRecipients = (e) => {
    const filterText = e.target.value.toLowerCase();
    const filtered = uploadedRecipients.filter(
      (recipient) =>
        recipient.name?.toLowerCase().includes(filterText) ||
        recipient.email?.toLowerCase().includes(filterText)
    );
    setFilteredRecipients(filtered);
  };

  const handleTextBlastNameChange = (e) => {
    setTextBlastName(e.target.value);
    setTextBlastNameError("");
  };

  const handleSendTimeChange = (e) => {
    setSendTimeOption(e.target.value);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Text Blast Name */}
              <div className="col-span-2">
                <label className="block">
                  <span className="text-blue-900 font-semibold flex items-center">
                    Text Blast Name
                    <Tooltip text="The Text Blast name is used to identify the name of the campaign easily. This is only for internal tracking purposes, your contacts will not see this information">
                      <svg
                        className="w-4 h-4 ml-1 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Tooltip>
                  </span>
                  <input
                    type="text"
                    className="mt-2 w-2/4 block rounded-xl px-4 py-3 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Text Blast Name"
                    required
                    value={textBlastName}
                    onChange={handleTextBlastNameChange}
                  />
                  {textBlastNameError && (
                    <FormValidationError errors={textBlastNameError} />
                  )}
                </label>
              </div>

              {/* Send To and Collapsible Section Container */}
              <div>
                {/* send to */}
                <label className="block mb-2 text-lg font-bold text-blue-900">
                  Send To
                  <Tooltip text="You can select one or multiple tags to send the text blast to." />
                </label>
                <div className="w-2/3">
                  <CustomSelect
                    options={tags}
                    selected={selectedTags}
                    onChange={setSelectedTags}
                    label="Tags"
                    isMulti={true}
                    error={selectedTagsError}
                    onErrorChange={setSelectedTagsError}
                  />
                  {selectedTagsError && (
                    <FormValidationError errors={selectedTagsError} />
                  )}
                </div>

                {/* Who Not To Send To - Collapsible Section */}
                <div className="border-t pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-between text-blue-900 text-[1.25rem] font-[900] focus:outline-none"
                  >
                    <span className="flex items-center">
                      Who Not To Send To
                      <Tooltip text="You can select to have contacts with certain tags or who have received a previous text blast suppressed from receiving this text blast.">
                        <svg
                          className="w-4 h-4 ml-1 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Tooltip>
                    </span>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-200 ${
                        isCollapsed ? "" : "rotate-180"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Collapsible Content */}
                  <div
                    className={`transition-all duration-200 ease-in-out ${
                      isCollapsed ? "max-h-0 opacity-0" : "opacity-100 mt-4"
                    }`}
                  >
                    <div className="relative pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Tags */}
                        <div className="relative z-20">
                          <span className="text-gray-700 font-bold block mb-2">
                            Tag(s)
                          </span>
                          <CustomSelect
                            options={tags}
                            selected={selectedExcludeTags}
                            onChange={setSelectedExcludeTags}
                            label="Exclude Tags"
                            openUpward={true}
                            isMulti={true}
                          />
                        </div>

                        {/* Recipients */}
                        <div className="relative z-20">
                          <span className="text-gray-700 font-bold block mb-2">
                            Recipients of Text Blast(s)
                          </span>
                          <CustomSelect
                            options={textBlasts}
                            selected={selectedBlasts}
                            onChange={setSelectedBlasts}
                            label="Text Blasts"
                            openUpward={true}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Compose your message</h3>
            {/* Add your compose step content here */}
            <div className="flex flex-col lg:flex-row items-center md:items-start bg-gray-50 font-sans">
              <div className="w-full p-4">
                <div>
                  <textarea
                    id="messageInput"
                    rows="6"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 border rounded-[1.375rem] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  <p className="text-sm mt-2">
                    <span
                      className={`font-semibold ${
                        message.length > 160 ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      {message.length}
                    </span>
                    /160{" "}
                    {totalSegments > 1 && (
                      <span className="ml-2 text-red-500 font-medium">
                        Segments: {totalSegments}
                      </span>
                    )}
                  </p>
                </div>
                {/* Add Media and Select Media Buttons */}
                <div className="flex flex-col gap-4 mt-4">
                  <button
                    onClick={handleUploadModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Media
                  </button>
                  <UploadImage
                    isOpen={isUploadModalOpen}
                    onClose={handleUploadModal}
                  />
                  <button
                    onClick={handleFetchModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Select Media
                  </button>
                  {/* Display selected image */}
                  {/* {selectedImageUrl && (
                    <div className="mt-4">
                      <p>Selected Image:</p>
                      <img
                        src={selectedImageUrl}
                        alt="Selected"
                        className="w-full max-w-sm"
                      />
                    </div>
                  )} */}

                  {/* FetchImageModal */}
                  <FetchImage
                    isOpen={isFetchModalOpen}
                    onClose={handleFetchModal}
                    onProceed={handleProceed}
                  />
                </div>
                <div>
                  <input
                    type="file"
                    id="mediaInput"
                    accept="image/*,video/*"
                    className="hidden"
                    // onChange={handleMediaChange}
                  />
                </div>
              </div>

              {/* Mobile Preview */}
              <div className="w-full md:w-1/3 flex items-center justify-center mt-8 md:mt-0">
                <div className="relative w-56 h-[500px] bg-black rounded-3xl p-[0.4rem]">
                  <div className="bg-white h-full rounded-2xl overflow-hidden shadow-lg">
                    <div className="bg-gray-100 p-2 text-sm font-medium text-gray-600 flex justify-between items-center">
                      <span>Blueciate Inc.</span>
                      <span>+1 4692836689</span>
                    </div>
                    <div className="flex flex-col justify-start p-4 overflow-auto h-full">
                      {messageChunks.map((chunk, index) => (
                        <div
                          key={index}
                          className="bg-blue-500 text-white rounded-lg p-3 py-2 mb-7 text-sm leading-5 break-words whitespace-pre-line"
                        >
                          {chunk}
                        </div>
                      ))}
                      {/* Retrieve image URL from cookies */}
                      {selectedImageUrl && (
                        <div className="mt-4 flex justify-center">
                          <img
                            src={selectedImageUrl}
                            alt="Selected"
                            className="max-w-full max-h-40 rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Schedule your campaign</h3>

            <div className="mt-8">
              <div className="flex items-center mb-4">
                <h4 className="text-blue-900 text-[1.25rem] font-[900] flex items-center">
                  When To Send
                  <Tooltip text="You can set when your text blast will be sent out. If you choose now the message will go out out in the next 30 minutes. If you schedule the message, it will start going out and be completed during the allotted time you selected." />
                </h4>
              </div>

              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sendTime"
                    value="now"
                    checked={sendTimeOption === "now"}
                    onChange={handleSendTimeChange}
                    className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Now</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sendTime"
                    value="schedule"
                    checked={sendTimeOption === "schedule"}
                    onChange={handleSendTimeChange}
                    className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Schedule</span>
                </label>
              </div>

              {sendTimeOption === "schedule" && (
                <div className="mt-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={handleScheduleDateChange}
                      className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From
                      </label>
                      <input
                        type="time"
                        value={fromTime}
                        onChange={handleFromTimeChange}
                        className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To
                      </label>
                      <input
                        type="time"
                        value={toTime}
                        onChange={handleToTimeChange}
                        className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Zone
                    </label>
                    <select
                      value={timeZone}
                      onChange={handleTimeZoneChange}
                      className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200"
                    >
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <p className="text-sm">
                  <span className="font-bold">Daily TextBlast Limit:</span>{" "}
                  <span className="text-gray-600">500</span>
                </p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-2">
            <div className="flex justify-end mt-[-3rem]">
             {/* {isActive ? (
                <button
                  onClick={handleActivateCampaign}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Deactivate
                </button>
              ) : ( */}
                <button
                  onClick={handleConfirmModal}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Activate
                </button>
              {/* )} */}
              </div>
            <div className="flex gap-8 mt-8 mx-auto max-w-7xl">
  {/* Message Preview Section */}
  <div className="flex-1 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-800">Message Preview</h3>
      </div>

      <div className="flex justify-center items-center flex-1">
        <div className="relative w-[300px] h-[500px] bg-black rounded-3xl p-[0.4rem]">
          <div className="bg-white h-full rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-gray-100 p-3 text-sm font-medium text-gray-600 flex justify-between items-center border-b">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Blueciate Inc.
              </span>
              <span className="text-xs">+1 4692836689</span>
            </div>
            <div className="flex flex-col justify-start p-4 overflow-auto h-full bg-gray-50">
              {messageChunks.map((chunk, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white rounded-lg p-3 py-2 mb-4 text-sm leading-5 break-words whitespace-pre-line max-w-[80%] self-end shadow-sm"
                >
                  {chunk}
                </div>
              ))}
              {selectedImageUrl && (
                <div className="mt-4 flex justify-end">
                  <div className="bg-blue-500 p-1 rounded-lg shadow-sm max-w-[80%]">
                    <img
                      src={selectedImageUrl}
                      alt="Selected"
                      className="max-w-full max-h-40 rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Schedule Details Section */}
  <div className="flex-1 flex flex-col gap-4">
  <div className="flex-1 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
  <div className="flex items-center gap-2 mb-6">
  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
      <h3 className="text-xl font-bold text-gray-800">Select Recipients</h3>
    </div>
    <MultiSelect
    options={options}
    value={selectedRecipients}
    onChange={setSelectedRecipients}
    labelledBy="Select"
  />
  </div>
  <div className="flex-1 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center gap-2 mb-6">
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h3 className="text-xl font-bold text-gray-800">Schedule Details</h3>
    </div>

    {sendTimeOption === "schedule" ? (
      <div className="space-y-4">
        {/* Date */}
        <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="flex items-center gap-3 w-full">
            <div className="min-w-[100px] font-medium text-gray-600">Date</div>
            <div className="flex-1 text-gray-800 font-semibold">
              {new Date(scheduleDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Time Range */}
        <div className="flex flex-col gap-3">
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="min-w-[100px] font-medium text-gray-600">From</div>
              <div className="flex-1 text-gray-800 font-semibold">
                {fromTime
                  ? new Date(`2000-01-01T${fromTime}`).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                  : "Not set"}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="min-w-[100px] font-medium text-gray-600">To</div>
              <div className="flex-1 text-gray-800 font-semibold">
                {toTime
                  ? new Date(`2000-01-01T${toTime}`).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                  : "Not set"}
              </div>
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="min-w-[100px] font-medium text-gray-600">Time Zone</div>
            <div className="flex-1 text-gray-800 font-semibold">{timeZone}</div>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center h-[400px] text-gray-500">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium">Sending immediately</p>
        </div>
      </div>
    )}
  </div>
  </div>
</div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Preview your campaign</h3>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 bg-white shadow-md lg:relative lg:w-64 lg:block ${
          isSidebarOpen ? "w-64" : "hidden"
        }`}
      >
        <UserSidebar />
      </div>

      <div className="flex-1 flex flex-col bg-gray-100 relative">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-md flex justify-between items-center px-4 lg:px-6">
          <button
            className="text-gray-600 focus:outline-none lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <UserNavbar />
        </div>

        {/* Main Content */}
        <div className="mt-16 flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold mb-4">
              {textBlastName || "Text Blasts"}
            </h1>
            <div className="flex gap-3">
             
              <button
                onClick={handleSaveCampaign}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Campaign
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex flex-col md:flex-row p-8 bg-gray-50 font-sans">
            <div className="w-full p-4">
              <div className="flex items-center">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className="flex-1 text-center">
                      <div
                        // onClick={() => setActiveStep(step.number)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full mx-auto cursor-pointer ${
                          activeStep === step.number
                            ? "bg-gray-700 text-white"
                            : "border border-gray-300"
                        }`}
                      >
                        {step.number}
                      </div>
                      <p className="text-sm mt-2 font-medium">{step.name}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="border-t-2 border-gray-300 flex-1 pb-5"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex flex-col  px-8 pb-8 bg-gray-50 font-sans">
            <div className="w-full p-4">
              <h2 className="text-2xl font-bold mb-6">
                {steps.find((step) => step.number === activeStep)?.name}
              </h2>
              {renderStepContent()}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handlePreviousStep}
                disabled={activeStep === 1}
                className={`px-4 py-1 rounded-md border ${
                  activeStep === 1
                    ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-gray-200 text-black border-gray-400 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>
              {activeStep === steps.length ? (
''
              ):(
              <button
                onClick={handleNextStep}
                // disabled={activeStep === steps.length}
                className={`px-4 py-1 rounded-md ${
                  activeStep === steps.length
                    ? "display:none"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {activeStep === steps.length ? "" : "Next"}
              </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal confirm={true} handleConfirm={handleActivateCampaign}   open={isConfirmModalOpen} children={<div>Are you sure you want to Activate this campaign?</div>}  handleClose={handleCloseConfirmModal} title="Confirm Campaign"/>
    </>
  );
};

export default TextBlast;
