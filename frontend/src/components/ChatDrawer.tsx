import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Send, Bot } from 'lucide-react';

const ChatDrawer: React.FC = () => {
  const { chatDrawerOpen, setChatDrawerOpen, activeFlow } = useAppContext();
  const [messages, setMessages] = useState<{id: number, text: string, sender: 'user' | 'agent', timestamp: string}[]>([
    {
      id: 1,
      text: `Hi there! I'm your ${activeFlow?.name || 'Finley'} assistant. How can I help you today?`,
      sender: 'agent',
      timestamp: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatDrawerOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatDrawerOpen]);

  useEffect(() => {
    // Prevent body scrolling when drawer is open on mobile
    if (chatDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [chatDrawerOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    setMessages([...messages, {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: 'Just now'
    }]);
    
    // Simulate agent response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: `I'm analyzing your question about ${activeFlow?.name?.toLowerCase() || 'your finances'}. I'll provide some insights shortly.`,
        sender: 'agent',
        timestamp: 'Just now'
      }]);
    }, 1000);
    
    setInputMessage('');
  };

  if (!chatDrawerOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 z-20 transition-opacity duration-300 ease-in-out"
        onClick={() => setChatDrawerOpen(false)}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-30 bg-white shadow-lg dark:bg-gray-900 transform transition-transform duration-300 ease-in-out flex flex-col ${
          chatDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } w-[70%] lg:w-[40%]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center">
            <Bot className="mr-2 text-purple-600 dark:text-purple-400" size={20} />
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {activeFlow ? `${activeFlow.name} Assistant` : 'Finley Assistant'}
            </h2>
          </div>
          <button 
            onClick={() => setChatDrawerOpen(false)}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Messages - Flex grow to take available space */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-100' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
              }`}>
                <p className="text-sm">{message.text}</p>
                <span className="text-xs mt-1 block opacity-70">{message.timestamp}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area - Fixed at bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-purple-400"
            />
            <button
              onClick={handleSendMessage}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-700 dark:hover:bg-purple-600"
              disabled={inputMessage.trim() === ''}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDrawer; 