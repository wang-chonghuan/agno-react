import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowDown as FlowArrow, Plus, Bot, CheckCircle2, Brain } from 'lucide-react';

const FlowsPage: React.FC = () => {
  const { setActiveFlow } = useAppContext();

  const agents = [
    { 
      id: 1, 
      name: 'Revenue Analyzer', 
      description: 'Analyzes revenue streams and suggests optimization strategies',
      status: 'processing',
      progress: 45,
      lastRun: '2 min ago'
    },
    { 
      id: 2, 
      name: 'Expense Tracker', 
      description: 'Monitors expenses and identifies cost-saving opportunities',
      status: 'completed',
      progress: 100,
      lastRun: '1 hour ago'
    },
    { 
      id: 3, 
      name: 'Market Researcher', 
      description: 'Researches market trends and competitor analysis',
      status: 'queued',
      progress: 0,
      lastRun: 'Pending'
    },
  ];

  const completedTasks = [
    { 
      id: 1, 
      title: 'Monthly Financial Report', 
      result: 'Generated comprehensive financial analysis for March 2024',
      agent: 'Revenue Analyzer',
      timestamp: '2 hours ago'
    },
    { 
      id: 2, 
      title: 'Expense Optimization', 
      result: 'Identified potential savings of $2,300 in operational costs',
      agent: 'Expense Tracker',
      timestamp: '4 hours ago'
    }
  ];

  return (
    <div className="space-y-6 pb-16">
      <section className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center">
          <FlowArrow className="mr-2" size={20} />
          <h1 className="text-lg font-semibold">AI Business Agents</h1>
        </div>
        <p className="mt-1 text-sm text-purple-100">Automated business analysis and optimization</p>
      </section>

      <div className="space-y-4">
        {agents.map(agent => (
          <div 
            key={agent.id} 
            className="cursor-pointer rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-900"
            onClick={() => setActiveFlow(agent)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                    agent.status === 'processing' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                      : agent.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {agent.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{agent.description}</p>
              </div>
              
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
                <Bot size={18} />
              </div>
            </div>
            
            {agent.status === 'processing' && (
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">{agent.progress}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
                    style={{ width: `${agent.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Last run: {agent.lastRun}
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white">
            <CheckCircle2 className="mr-2" size={20} />
            Completed Tasks
          </h2>
          <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
            View All
          </button>
        </div>
        
        <div className="mt-4 space-y-4">
          {completedTasks.map(task => (
            <div 
              key={task.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{task.result}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Brain size={12} className="mr-1" />
                    <span>{task.agent}</span>
                    <span className="mx-1">•</span>
                    <span>{task.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center font-medium text-gray-500 transition-colors hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-400">
        <div className="flex items-center justify-center">
          <Plus size={18} className="mr-2" />
          Add New Agent
        </div>
      </button>
    </div>
  );
};

export default FlowsPage;