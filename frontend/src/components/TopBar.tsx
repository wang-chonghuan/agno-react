import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Bell, ArrowLeft, MessageCircle } from 'lucide-react';

const TopBar: React.FC = () => {
  const { user, activeFlow, setActiveFlow, setChatDrawerOpen } = useAppContext();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {activeFlow ? (
              <>
                <button
                  onClick={() => setActiveFlow(null)}
                  className="mr-3 rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeft size={20} />
                </button>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {activeFlow.name}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text lg:hidden">
                Finley
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {activeFlow && (
              <button 
                onClick={() => setChatDrawerOpen(true)} 
                className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" 
                aria-label="Open chat"
              >
                <MessageCircle size={20} />
              </button>
            )}
            
            {!activeFlow && (
              <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell size={20} />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            )}
            
            <button 
              className="rounded-full overflow-hidden h-8 w-8 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="User profile"
            >
              <img 
                src={user.avatar} 
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;