import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [chatCycle, setChatCycle] = useState(0);
  const chatContainerRef = useRef(null);

  const qaSets = [
    [
      { question: "What are your pricing plans?", answer: "Our pricing varies based on volume. Visit our pricing page for more details." },
      { question: "Do you have any offers?", answer: { type: "image", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuFTfCtFJirlKnnZ1NjUjxQ3l_KB3INPckHw&s" } },
    ],
    [
      { question: "Can I see a product demo?", answer: { type: "image", url: "https://www.yotpo.com/wp-content/uploads/2020/06/RECOMMENDED-FOR-YOU.png" } },
      { question: "How do I integrate with your API?", answer: "Our API documentation has all the details. Visit our dev page!" },
    ]
  ];

  useEffect(() => {
    function cycleChat() {
      setMessages([]);
      setChatCycle((prev) => (prev + 1) % qaSets.length);
      setTimeout(() => {
        startChatFlow();
      }, 500);
    }

    setShowChat(true);
    startChatFlow();

    const interval = setInterval(cycleChat, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const startChatFlow = () => {
    addMessage("Hello! How can I assist you today?", "text", false, () => {
      displayQAPairs(0);
    });
  };

  const addMessage = (content, type, isUser, callback = null) => {
    setMessages((prev) => {
      if (prev.some((msg) => msg.content === content && msg.isUser === isUser)) {
        return prev;
      }
      return [...prev, { id: prev.length + 1, content, type, isUser, read: isUser ? false : true }];
    });

    setTimeout(() => {
      if (callback) callback();
    }, 1000);
  };

  const displayQAPairs = (index) => {
    if (index < qaSets[chatCycle].length) {
      setTimeout(() => {
        addMessage(qaSets[chatCycle][index].question, "text", true, () => {
          setTimeout(() => {
            const answer = qaSets[chatCycle][index].answer;
            addMessage(answer.type === "image" ? answer.url : answer, answer.type || "text", false, () => {
              setMessages((prev) => prev.map((msg) => (msg.isUser ? { ...msg, read: true } : msg)));
              displayQAPairs(index + 1);
            });
          }, 1500);
        });
      }, 2000);
    }
  };

  return (
    <section className="relative  text-black py-24 overflow-hidden">
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between max-w-7xl mx-auto px-6 md:px-16 gap-12 text-center lg:text-left">

        <div className="max-w-lg">
          <h1 className="text-3xl md:text-5xl lg:text-8xl font-extrabold leading-tight mb-8 md:mb-12 mt-6">
            <span className="text-blue-600 font-poppins mb-8">SMS Marketing</span> Made Easy with  
            <span className="text-9xl">NXT</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-700 font-poppins">
            Get started today with a FREE 14-day trial and see why we are the easiest way to send bulk SMS messages in seconds.
          </p>
          <Link to='/contact'>
          
          <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-4 rounded-2xl font-bold w-40 h-14 sm:w-48 sm:h-16 transition-all duration-300 shadow-md hover:shadow-xl text-lg flex items-center justify-center">
            Start Free</button>
            </Link> 
        </div>
       
        <AnimatePresence>
          {showChat && (
           <motion.div
           key={chatCycle}
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.9 }}
           transition={{ duration: 1 }}
           className="shadow-lg rounded-2xl w-[320px] h-[560px] flex flex-col p-0 relative bg-cover bg-center"
           style={{ backgroundImage: `url('/imgs/chat-bg.png')` }}
         >
           {/* ✅ Chat Container with Auto-Scroll and Bottom Padding */}
           <div
             ref={chatContainerRef}
             className="flex flex-col gap-4 p-2 pb-6 justify-end mt-auto overflow-y-auto h-[450px]"
           >
             <AnimatePresence>
               {messages.map((msg) => (
                 <motion.div
                   key={msg.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                   className={`p-2 text-sm rounded-lg max-w-[75%] break-words flex items-center justify-between mt-2 ${
                    msg.isUser 
                      ? "bg-green-200 text-black font-medium self-end mr-10 mt-4" 
                      : "bg-white text-gray-900 self-start font-medium ml-10"
                  }`}
                >
                   {msg.type === "image" ? (
                     <img src={msg.content} alt="Image" className="max-w-[150px] rounded-lg" />
                   ) : (
                     msg.content
                   )}
                   {msg.isUser && (
                     <span className="ml-2 text-xs text-gray-600 flex items-center">
                       {msg.read ? <CheckCheck className="w-4 h-4 text-blue-500" /> : <Check className="w-4 h-4 text-gray-500" />}
                     </span>
                   )}
                 </motion.div>
               ))}
             </AnimatePresence>
           </div>
         </motion.div>
                 
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}