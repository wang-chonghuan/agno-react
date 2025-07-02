import React, { useState } from 'react';
import { Send, User, Bot, Image } from 'lucide-react';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your Finley financial assistant. How can I help you today?", isUser: false, timestamp: new Date(Date.now() - 3600000) },
    { id: 2, text: "Hi, can you help me with my budget?", isUser: true, timestamp: new Date(Date.now() - 3540000) },
    { id: 3, text: "Of course! I'd be happy to help with your budget. What specific aspects of budgeting are you looking for assistance with?", isUser: false, timestamp: new Date(Date.now() - 3480000) },
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    setTimeout(() => {
      const assistantMessage = {
        id: messages.length + 2,
        text: "I'm analyzing your financial patterns. Based on your spending history, you might want to consider reducing restaurant expenses, which account for 30% of your discretionary spending this month.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestionChips = [
    "How much did I spend this month?",
    "Set up a savings goal",
    "Analyze my investments",
    "Help me reduce expenses"
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-4 p-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.isUser 
                      ? 'bg-purple-100 text-purple-600 ml-2 dark:bg-purple-900/30 dark:text-purple-300' 
                      : 'bg-gray-100 text-gray-600 mr-2 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {message.isUser ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.isUser 
                      ? 'rounded-tr-none bg-gradient-to-r from-purple-500 to-indigo-600 text-white' 
                      : 'rounded-tl-none bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`mt-1 text-right text-xs ${
                      message.isUser ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl">
          <div className="mb-3 overflow-x-auto">
            <div className="flex space-x-2 pb-1">
              {suggestionChips.map((suggestion, index) => (
                <button
                  key={index}
                  className="whitespace-nowrap rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm text-purple-700 transition-colors hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/40"
                  onClick={() => setNewMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="mr-2 rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Image size={20} />
            </button>
            
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-purple-600 dark:focus:ring-purple-900"
            />
            
            <button 
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
              className={`ml-2 rounded-full p-2 ${
                newMessage.trim() === "" 
                  ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500' 
                  : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;