import React from 'react';
import { useAppContext } from '../context/AppContext';
import TodayPage from '../pages/TodayPage';
import MoneyPage from '../pages/MoneyPage';
import ChatPage from '../pages/ChatPage';
import GoalsPage from '../pages/GoalsPage';
import FlowsPage from '../pages/FlowsPage';
import FlowDetailPage from '../pages/FlowDetailPage';

const MainContent: React.FC = () => {
  const { activeTab, activeFlow } = useAppContext();

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {activeFlow ? (
          <FlowDetailPage />
        ) : (
          <>
            {activeTab === 'today' && <TodayPage />}
            {activeTab === 'money' && <MoneyPage />}
            {activeTab === 'chat' && <ChatPage />}
            {activeTab === 'goals' && <GoalsPage />}
            {activeTab === 'flows' && <FlowsPage />}
          </>
        )}
      </div>
    </main>
  );
};

export default MainContent;