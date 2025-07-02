import React from 'react';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import MainContent from './components/MainContent';
import ChatDrawer from './components/ChatDrawer';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 lg:flex-row">
        <div className="hidden lg:block lg:w-56 lg:flex-shrink-0">
          <BottomBar />
        </div>
        <div className="flex w-full flex-col">
          <TopBar />
          <MainContent />
          <div className="lg:hidden">
            <BottomBar />
          </div>
        </div>
        <ChatDrawer />
      </div>
    </AppProvider>
  );
}

export default App;