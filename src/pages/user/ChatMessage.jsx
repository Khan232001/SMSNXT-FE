import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const ChatMessage = () => {
  const token = localStorage.getItem('token');
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const fetchChats = async () => {
    try {
      const response = await api.get('/communication', authHeaders);
      setChats(response.data);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat?.contact) {
      return;
    }

    try {
      const { _id } = selectedChat;
      console.log("Fetching communication with ID:", _id);

      const requestData = {
        message: message,
        phoneNumber: selectedChat.contact?.phoneNumber,
        mediaUrl: null, 
      };

      await api.post('/campaign/send-test-message', requestData, authHeaders);

      setMessage('');

      if (_id) {
        const updatedChat = await api.get(`/communication/${_id}`, authHeaders);
        setSelectedChat(updatedChat.data);  // Update the selected chat with the latest data
      }

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-1/4 bg-white border-r border-gray-200'>
        <div className='p-4 border-b border-gray-200'>
          <h2 className='text-xl font-semibold'>Chats</h2>
        </div>
        <div className='overflow-y-auto'>
          <div className='p-4'>
            <ul className='mt-2'>
              {chats.map((chat) => (
                <li
                  key={chat._id}
                  className={`py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    selectedChat?._id === chat._id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <span className='text-gray-700'>
                    {chat.contact ? chat.contact.name : 'Unknown'}
                  </span>
                  <p className='text-sm text-gray-500 truncate'>
                    {chat.messages[chat.messages.length - 1]?.textSegments[0]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className='flex-1 flex flex-col h-full'>
        <div className='flex-1 p-6 overflow-y-auto'>
          {selectedChat ? (
            <div className='space-y-4'>
              {selectedChat.messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${
                    message.type === 'sent' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.type === 'sent'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.textSegments[0]}
                    <div className='text-xs mt-1 opacity-70'>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center text-gray-500'>
              Select a chat to start messaging
            </div>
          )}
        </div>
        <div className='p-4 border-t border-gray-200 sticky bottom-0 bg-white'>
          <div className='flex items-center gap-2'>
            <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <button
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center justify-center"
                onClick={handleSendMessage}
              >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-5 h-5'
              >
                <path d='M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
