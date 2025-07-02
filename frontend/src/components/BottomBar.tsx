import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, DollarSign, MessageSquare, Target, ArrowDown as FlowArrow } from 'lucide-react';

const BottomBar: React.FC = () => {
  const { activeTab, setActiveTab } = useAppContext();

  const navItems = [
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'money', label: 'Money', icon: DollarSign },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'flows', label: 'Flows', icon: FlowArrow },
  ];

  return (
    <nav className="lg:h-full lg:bg-white lg:dark:bg-gray-900 lg:shadow-lg">
      <div className="h-full">
        <div className="hidden lg:flex lg:h-16 lg:items-center lg:px-6 lg:border-b lg:border-gray-200 lg:dark:border-gray-700">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Finley
          </span>
        </div>
        <ul className="flex h-16 items-center justify-around lg:h-auto lg:flex-col lg:pt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id} className="flex-1 lg:w-full">
                <button
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex w-full flex-col items-center lg:flex-row lg:items-center lg:px-6 lg:py-3 transition-colors duration-200 ${
                    isActive 
                      ? 'text-purple-600 lg:bg-purple-50 lg:dark:bg-purple-900/20' 
                      : 'text-gray-500 hover:text-purple-500 lg:hover:bg-gray-100 lg:dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} className="lg:mr-3" />
                  <span className="text-xs mt-1 font-medium lg:text-sm lg:mt-0">{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full lg:hidden" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default BottomBar;