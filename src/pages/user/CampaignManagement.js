import React, { useState, Fragment } from 'react';
import UserNavbar from '../../components/UserNavbar';
import UserSidebar from '../../components/UserSidebar';
import Papa from 'papaparse';
import { Listbox, ListboxButton, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Tooltip from '../../components/Tooltip';

const tags = [
  { id: 1, name: 'Select an option', value: '' },
  { id: 2, name: 'Tag 1', value: 'tag1' },
  { id: 3, name: 'Tag 2', value: 'tag2' },
];

const textBlasts = [
  { id: 1, name: 'Select an option', value: '' },
  { id: 2, name: 'Text Blast 1', value: 'blast1' },
  { id: 3, name: 'Text Blast 2', value: 'blast2' },
];

const CustomSelect = ({
  options,
  selected,
  onChange,
  label,
  openUpward = false,
  isMulti = false,
}) => {
  const handleSelect = (option) => {
    if (isMulti) {
      if (option.id === 1) return;

      const isSelected = selected.some((item) => item.id === option.id);
      if (isSelected) {
        onChange(selected.filter((item) => item.id !== option.id));
      } else {
        onChange([...selected, option]);
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
    <div className='w-full relative'>
      <Listbox value={selected} onChange={handleSelect} multiple={isMulti}>
        {({ open }) => (
          <div className='relative mt-1'>
            <ListboxButton className='relative w-full cursor-default rounded-xl bg-white py-3 px-4 text-left border border-gray-300 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 min-h-[48px]'>
              <div className='flex flex-wrap gap-2'>
                {isMulti ? (
                  selected.length > 0 ? (
                    selected.map((item) => (
                      <span
                        key={item.id}
                        className='inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800'
                      >
                        {item.name}
                        <button
                          type='button'
                          onClick={(e) => removeTag(item.id, e)}
                          className='ml-1 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full'
                        >
                          <svg
                            className='h-3 w-3'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className='text-gray-500'>Select options...</span>
                  )
                ) : (
                  <span className='block truncate text-gray-700'>
                    {selected.name || 'Select an option'}
                  </span>
                )}
              </div>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </ListboxButton>
            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options
                className={`absolute ${
                  openUpward
                    ? 'bottom-[calc(100%+0.5rem)]'
                    : 'top-[calc(100%+0.5rem)]'
                } w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[100] max-h-60`}
                static
              >
                {options.slice(1).map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`
                    }
                    value={option}
                  >
                    {({ selected: isSelected }) => (
                      <div
                        className='flex items-center'
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelect(option);
                        }}
                      >
                        <input
                          type='checkbox'
                          checked={selected.some(
                            (item) => item.id === option.id
                          )}
                          className='mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          onChange={() => {}}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span
                          className={`block truncate ${
                            isSelected ? 'font-medium' : 'font-normal'
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

const CampaignManagement = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [textBlastName, setTextBlastName] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [uploadedRecipients, setUploadedRecipients] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedExcludeTags, setSelectedExcludeTags] = useState([]);
  const [selectedBlasts, setSelectedBlasts] = useState([]);
  const [message, setMessage] = useState(
    "Hi <FIRST_NAME>, it's <MANAGER_FIRST_NAME> at <COMPANY_NAME>. Reply Stop to Unsubscribe"
  );
  // Function to split the message into chunks of 160 characters
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
  const [sendTimeOption, setSendTimeOption] = useState('now');

  const steps = [
    { number: 1, name: 'Setup' },
    { number: 2, name: 'Compose' },
    { number: 3, name: 'Schedule' },
    { number: 4, name: 'Preview' },
  ];

  const handleCreateCampaign = () => {
    const campaignName = prompt('Enter Campaign Name');
    if (campaignName) {
      setCampaigns([
        ...campaigns,
        {
          id: campaigns.length + 1,
          name: campaignName,
          status: 'Draft',
          startDate: 'TBD',
          endDate: 'TBD',
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
          alert('Error parsing CSV: ' + error.message);
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
  };

  const handleSendTimeChange = (e) => {
    setSendTimeOption(e.target.value);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <form className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              {/* Text Blast Name */}
              <div className='col-span-2'>
                <label className='block'>
                  <span className='text-blue-900 font-semibold flex items-center'>
                    Text Blast Name
                    <Tooltip text='The Text Blast name is used to identify the name of the campaign easily. This is only for internal tracking purposes, your contacts will not see this information'>
                      <svg
                        className='w-4 h-4 ml-1 text-gray-500'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </Tooltip>
                  </span>
                  <input
                    type='text'
                    className='mt-2 w-2/4 block rounded-xl px-4 py-3 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                    placeholder='Text Blast Name'
                    required
                    value={textBlastName}
                    onChange={handleTextBlastNameChange}
                  />
                  <span className='text-red-500 text-sm mt-1'>
                    This field is required
                  </span>
                </label>
              </div>

              {/* Send To and Collapsible Section Container */}
              <div className='col-span-2 space-y-4'>
                {/* Send To */}
                <div>
                  <label className='block'>
                    <span className='text-blue-900 text-[1.25rem] font-[900] flex items-center mb-4'>
                      Send To
                      <Tooltip text='You can select one or multiple tags to send the text blast to.'>
                        <svg
                          className='w-4 h-4 ml-1 text-gray-500'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </Tooltip>
                    </span>
                    <span className='text-gray-700 font-bold block mb-2'>
                      Tag(s)
                    </span>
                    <div className='w-2/3'>
                      <CustomSelect
                        options={tags}
                        selected={selectedTags}
                        onChange={setSelectedTags}
                        label='Tags'
                        isMulti={true}
                      />
                    </div>
                    <span className='text-red-500 text-sm mt-1'>
                      This field is required
                    </span>
                  </label>
                </div>

                {/* Who Not To Send To - Collapsible Section */}
                <div className='border-t pt-4'>
                  <button
                    type='button'
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className='w-full flex items-center justify-between text-blue-900 text-[1.25rem] font-[900] focus:outline-none'
                  >
                    <span className='flex items-center'>
                      Who Not To Send To
                      <Tooltip text='You can select to have contacts with certain tags or who have received a previous text blast suppressed from receiving this text blast.'>
                        <svg
                          className='w-4 h-4 ml-1 text-gray-500'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </Tooltip>
                    </span>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-200 ${
                        isCollapsed ? '' : 'rotate-180'
                      }`}
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>

                  {/* Collapsible Content */}
                  <div
                    className={`transition-all duration-200 ease-in-out ${
                      isCollapsed ? 'max-h-0 opacity-0' : 'opacity-100 mt-4'
                    }`}
                  >
                    <div className='relative pt-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Tags */}
                        <div className='relative z-20'>
                          <span className='text-gray-700 font-bold block mb-2'>
                            Tag(s)
                          </span>
                          <CustomSelect
                            options={tags}
                            selected={selectedExcludeTags}
                            onChange={setSelectedExcludeTags}
                            label='Exclude Tags'
                            openUpward={true}
                            isMulti={true}
                          />
                        </div>

                        {/* Recipients */}
                        <div className='relative z-20'>
                          <span className='text-gray-700 font-bold block mb-2'>
                            Recipients of Text Blast(s)
                          </span>
                          <CustomSelect
                            options={textBlasts}
                            selected={selectedBlasts}
                            onChange={setSelectedBlasts}
                            label='Text Blasts'
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
          <div className='space-y-6'>
            <h3 className='text-lg font-medium'>Compose your message</h3>
            {/* Add your compose step content here */}
            <div className='flex flex-col lg:flex-row items-center md:items-start bg-gray-50 font-sans'>
              <div className='w-full p-4'>
                <div>
                  <textarea
                    id='messageInput'
                    rows='6'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='w-full p-4 border rounded-[1.375rem] focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                    {segmentCount > 1 && (
                      <span className="ml-2 text-red-500 font-medium">
                        Segments: {segmentCount}
                      </span>
                    )}
                  </p>
                </div>
                  {/* Add Media and Select Media Buttons */}
            <div className='flex flex-col gap-4 mt-4'>
                <button
                  // onClick={handleAddMedia}
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                >
                  Add Media
                </button>
                <button
                  // onClick={handleSelectMedia}
                  className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300'
                >
                  Select Media
                </button>
              </div>
              <div>
              <input
                type='file'
                id='mediaInput'
                accept='image/*,video/*'
                className='hidden'
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
                      <span>9726079081</span>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium'>Schedule your campaign</h3>

            {/* When To Send Section */}
            <div className='mt-8'>
              <div className='flex items-center mb-4'>
                <h4 className='text-blue-900 text-[1.25rem] font-[900] flex items-center'>
                  When To Send
                  <Tooltip text='You can set when your text blast will be sent out. If you choose now the message will go out out in the next 30 minutes. If you schedule the message, it will start going out and be completed during the allotted time you selected.'>
                    <svg
                      className='w-4 h-4 ml-1 text-gray-500'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </Tooltip>
                </h4>
              </div>

              {/* Radio Buttons in a row */}
              <div className='flex space-x-6'>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='sendTime'
                    value='now'
                    checked={sendTimeOption === 'now'}
                    onChange={handleSendTimeChange}
                    className='form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out'
                  />
                  <span className='ml-2 text-gray-700'>Now</span>
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='sendTime'
                    value='schedule'
                    checked={sendTimeOption === 'schedule'}
                    onChange={handleSendTimeChange}
                    className='form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out'
                  />
                  <span className='ml-2 text-gray-700'>Schedule</span>
                </label>
              </div>

              {/* Schedule Options */}
              {sendTimeOption === 'schedule' && (
                <div className='mt-6 space-y-6'>
                  {/* Date Input */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Date
                    </label>
                    <div className='relative'>
                      <input
                        type='date'
                        className='w-full bg-white rounded-xl px-4 py-3 border border-gray-300 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                   hover:border-blue-400 transition-colors duration-200'
                      />
                      <div className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
                        <svg
                          className='h-5 w-5 text-gray-400'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Time Range */}
                  <div className='grid grid-cols-2 gap-6'>
                    {/* From Time */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        From
                      </label>
                      <div className='relative'>
                        <input
                          type='time'
                          className='w-48 bg-white rounded-xl px-4 py-3 border border-gray-300 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                   hover:border-blue-400 transition-colors duration-200'
                        />
                      </div>
                    </div>

                    {/* To Time */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        To
                      </label>
                      <div className='relative'>
                        <input
                          type='time'
                          className='w-48 bg-white rounded-xl px-4 py-3 border border-gray-300 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                   hover:border-blue-400 transition-colors duration-200'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Time Zone */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Time Zone
                    </label>
                    <select
                      className='w-full bg-white rounded-xl px-4 py-3 border border-gray-300 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                 hover:border-blue-400 transition-colors duration-200'
                    >
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Daily TextBlast Limit */}
              <div className='mt-6'>
                <p className='text-sm'>
                  <span className='font-bold'>Daily TextBlast Limit:</span>{' '}
                  <span className='text-gray-600'>500</span>
                </p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium'>Preview your campaign</h3>
            {/* Add your preview step content here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 bg-white shadow-md lg:relative lg:w-64 lg:block ${
          isSidebarOpen ? 'w-64' : 'hidden'
        }`}
      >
        <UserSidebar />
      </div>

      <div className='flex-1 flex flex-col bg-gray-100 relative'>
        {/* Navbar */}
        <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-md flex justify-between items-center px-4 lg:px-6'>
          <button
            className='text-gray-600 focus:outline-none lg:hidden'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
          <UserNavbar />
        </div>

        {/* Main Content */}
        <div className='mt-16 flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <h1 className='text-2xl font-bold mb-4'>
            {textBlastName || 'Text Blasts'}
          </h1>

          {/* Stepper */}
          <div className='flex flex-col md:flex-row p-8 bg-gray-50 font-sans'>
            <div className='w-full p-4'>
              <div className='flex items-center'>
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className='flex-1 text-center'>
                      <div
                        onClick={() => setActiveStep(step.number)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full mx-auto cursor-pointer ${
                          activeStep === step.number
                            ? 'bg-gray-700 text-white'
                            : 'border border-gray-300'
                        }`}
                      >
                        {step.number}
                      </div>
                      <p className='text-sm mt-2 font-medium'>{step.name}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className='border-t-2 border-gray-300 flex-1 pb-5'></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className='flex flex-col md:flex-row p-8 bg-gray-50 font-sans'>
            <div className='w-full p-4'>
              <h2 className='text-2xl font-bold mb-6'>
                {steps.find((step) => step.number === activeStep)?.name}
              </h2>
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignManagement;
