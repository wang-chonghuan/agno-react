import React, { createContext, useContext, useState } from 'react';

type Tab = 'today' | 'money' | 'chat' | 'goals' | 'flows';

interface Flow {
  id: number;
  name: string;
  description: string;
  status: 'processing' | 'completed' | 'queued';
  progress: number;
  lastRun: string;
}

interface AppContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  user: {
    name: string;
    avatar: string;
  };
  activeFlow: Flow | null;
  setActiveFlow: (flow: Flow | null) => void;
  chatDrawerOpen: boolean;
  setChatDrawerOpen: (open: boolean) => void;
}

const defaultContext: AppContextType = {
  activeTab: 'today',
  setActiveTab: () => {},
  user: {
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  activeFlow: null,
  setActiveFlow: () => {},
  chatDrawerOpen: false,
  setChatDrawerOpen: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<Tab>('today');
  const [user] = useState(defaultContext.user);
  const [activeFlow, setActiveFlow] = useState<Flow | null>(null);
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);

  return (
    <AppContext.Provider value={{ 
      activeTab, 
      setActiveTab, 
      user,
      activeFlow,
      setActiveFlow,
      chatDrawerOpen,
      setChatDrawerOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};