import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineCopy, AiOutlineShareAlt, AiOutlineSend } from "react-icons/ai";
import { FaUser, FaRobot } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

type ConversationKey = 'general' | 'benefit_0' | 'benefit_1' | 'benefit_2' | 'benefit_3' | 'talk_to_hype';

interface ChatMessage {
  text: string;
  type: "question" | "answer";
  image?: string; // New property for image URLs
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  conversationType?: ConversationKey; 
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose, conversationType = 'general' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationMap: Record<ConversationKey, ChatMessage[]> = {
    general: [
      { 
        text: "Welcome to Jai Info Way, official website.", 
        type: "question" 
      },
      { 
        text: "At Jai Info Way, we specialize in **AI-powered tools** and **digital solutions** that help businesses evolve in the digital era.", 
        type: "answer",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      { 
        text: "How can I help you with AI tools?", 
        type: "question" 
      },
      { 
        text: "We provide a variety of **AI services**, including **chatbot integration**, where we automate communication processes for enhanced customer experiences.", 
        type: "answer",
        image: "https://images.unsplash.com/photo-1655720828012-9bd98774ff0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
    ],
    benefit_0: [
      { 
        text: "You asked about reducing development time by up to 40%", 
        type: "question" 
      },
      { 
        text: "Our AI-Powered Code Generation tools can significantly reduce development time by automating repetitive coding tasks.", 
        type: "answer",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
    ],
    benefit_1: [
      { 
        text: "You asked about improving software quality by 30-50%", 
        type: "question" 
      },
      { 
        text: "Our Automated Testing with AI solution goes beyond traditional testing frameworks.", 
        type: "answer",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
    ],
    benefit_2: [
      { 
        text: "You asked about speeding up delivery by 25%", 
        type: "question" 
      },
      { 
        text: "Our Modular & Reusable Components library is built on years of experience.", 
        type: "answer",
        image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
    ],
    benefit_3: [
      { 
        text: "You asked about reducing deployment pipeline effort by up to 60%", 
        type: "question" 
      },
      { 
        text: "Our Continuous Integration with AI Monitoring system not only automates your deployment pipeline but also uses AI to optimize it.", 
        type: "answer",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
    ],
    talk_to_hype: [
      { 
        text: "Hello! I'm Hype, your AI assistant from Jai Info Way.", 
        type: "question",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      { 
        text: "I'm here to help you with any questions about our services.", 
        type: "answer" 
      },
    ]
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Reset state when the chat is closed or conversationType changes
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setCurrentMessage("");
      setMessageIndex(0);
      setIsTyping(false);
      setShowPrompt(false);
      setInputMessage("");
    } else {
      // Reset conversation when type changes
      setMessages([]);
      setCurrentMessage("");
      setMessageIndex(0);
      setIsTyping(true); // Start typing new conversation
    }
  }, [isOpen, conversationType]);

  useEffect(() => {
    if (isOpen && messageIndex < conversationMap[conversationType].length && !isTyping) {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index <= conversationMap[conversationType][messageIndex].text.length) {
          setCurrentMessage(conversationMap[conversationType][messageIndex].text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setMessages((prev) => [...prev, conversationMap[conversationType][messageIndex]]);
          setMessageIndex((prev) => prev + 1);
          setCurrentMessage("");
          setIsTyping(false);
          if (messageIndex === conversationMap[conversationType].length - 1) {
            setShowPrompt(true);
          }
        }
      }, 20); 
    }
  }, [isOpen, messageIndex, isTyping, conversationType]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: ChatMessage = {
        text: inputMessage,
        type: "question"
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <div
      className={`fixed bottom-0 right-0 h-[100vh] bg-white shadow-xl rounded-tl-lg rounded-tr-lg transition-all duration-300 ease-in-out z-[999] flex flex-col ${isOpen ? "w-full md:w-96" : "w-0 h-0"}`}
      style={{
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.1)"
      }}
    >
      {isOpen && (
        <>
          {/* Chat Header */}
          <div className=" text-white p-4 rounded-tl-lg rounded-tr-lg flex justify-between items-center" style={{
            background: 'linear-gradient(135deg, rgba(0, 97, 209, 0.82) 0%, rgba(49, 84, 118, 0.78) 100%)'
          }}>
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <FaRobot className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">JAI Assistant</h3>
                <p className="text-xs text-blue-100">AI-powered support</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-white/80 hover:text-white transition-colors">
                <BsThreeDotsVertical />
              </button>
              <button
                onClick={onClose}
                className="cursor-pointer text-white/80 hover:text-white transition-colors text-xl"
              >
                <AiOutlineClose />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 && !isTyping && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <FaRobot className="text-blue-600 text-2xl" />
                </div>
                <h4 className="text-lg font-medium text-gray-700">JAI InfoWay Assistant</h4>
                <p className="text-gray-500 mt-2">How can I help you today?</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${msg.type === "question" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] flex ${msg.type === "question" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`flex-shrink-0 mt-1 ${msg.type === "question" ? "ml-3" : "mr-3"}`}>
                    {msg.type === "question" ? (
                      <div className="p-2 rounded-full" style={{
                        background: 'linear-gradient(135deg, rgba(0, 97, 209, 0.82) 0%, rgba(49, 84, 118, 0.78) 100%)'
                      }}>
                        <FaUser className="text-white text-sm" />
                      </div>
                    ) : (
                      <div className="bg-gray-200 p-2 rounded-full">
                        <FaRobot className="text-gray-700 text-sm" />
                      </div>
                    )}
                  </div>
                  <div>
                    {/* Image display if present */}
                    {msg.image && (
                      <div className={`mb-2 rounded-lg overflow-hidden ${msg.type === "question" ? "ml-auto" : "mr-auto"}`}>
                        <img 
                          src={msg.image} 
                          alt="Chat content" 
                          className="w-full h-auto max-h-48 object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-xl ${msg.type === "question"
                        ? "bg-gradient-to-br from-[rgba(0,97,209,0.82)] to-[rgba(49,84,118,0.78)] text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                        }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <div className={`flex mt-1 ${msg.type === "question" ? "justify-end" : "justify-start"}`}>
                      <button
                        onClick={() => handleCopy(msg.text)}
                        className="text-gray-500 hover:text-blue-600 transition-colors p-1"
                        title="Copy"
                      >
                        <AiOutlineCopy size={14} />
                      </button>
                      {typeof navigator.share === 'function' && (
                        <button
                          onClick={() => handleShare(msg.text)}
                          className="text-gray-500 hover:text-blue-600 transition-colors p-1 ml-1"
                          title="Share"
                        >
                          <AiOutlineShareAlt size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Effect */}
            {isTyping && (
              <div className="flex mb-4 justify-start">
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <FaRobot className="text-gray-700 text-sm" />
                  </div>
                </div>
                <div>
                  {/* Show image immediately if it exists in the current message */}
                  {conversationMap[conversationType][messageIndex]?.image && (
                    <div className="mb-2 rounded-lg overflow-hidden">
                      <img 
                        src={conversationMap[conversationType][messageIndex].image} 
                        alt="Chat content" 
                        className="w-full h-auto max-h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-xl rounded-bl-none shadow-sm max-w-[80%]">
                    <p className="text-sm">{currentMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Prompt for new message */}
            {showPrompt && (
              <div className="flex justify-center mt-4 mb-2">
                <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Ask me anything about our services
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="ml-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <AiOutlineSend />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;