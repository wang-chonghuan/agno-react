import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MessageCircle, 
  Undo2, 
  Redo2, 
  Save, 
  Sparkles, 
  ChevronDown,
  Check
} from 'lucide-react';

interface Option {
  id: string;
  label: string;
  defaultChecked?: boolean;
}

interface FlowStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  details: string;
  inputType: 'checkbox' | 'dropdown' | 'radio' | 'text';
  options?: Option[];
  placeholder?: string;
  result: string;
}

const FlowDetailPage: React.FC = () => {
  const { activeFlow, setChatDrawerOpen } = useAppContext();

  if (!activeFlow) return null;

  const flowSteps: FlowStep[] = [
    {
      id: 1,
      title: 'Data Collection',
      description: 'Gathering financial data from connected accounts and services',
      status: 'completed',
      details: 'Select the data sources you want to include in your analysis.',
      inputType: 'checkbox',
      options: [
        { id: 'bank', label: 'Bank Accounts', defaultChecked: true },
        { id: 'credit', label: 'Credit Cards', defaultChecked: true },
        { id: 'investment', label: 'Investment Accounts', defaultChecked: false },
        { id: 'bills', label: 'Bills & Subscriptions', defaultChecked: true },
      ],
      result: 'Successfully connected to 3 accounts. Found 127 transactions totaling $3,450.78 in the last 30 days.'
    },
    {
      id: 2,
      title: 'Analysis',
      description: 'Analyzing spending patterns and identifying potential savings',
      status: 'in-progress',
      details: 'Select the categories you want to focus on for potential savings.',
      inputType: 'dropdown',
      options: [
        { id: 'all', label: 'All Categories' },
        { id: 'dining', label: 'Dining & Restaurants' },
        { id: 'entertainment', label: 'Entertainment' },
        { id: 'subscriptions', label: 'Subscriptions' },
        { id: 'shopping', label: 'Shopping' },
      ],
      result: 'Analysis in progress. Initial findings show higher than usual spending on dining and subscriptions compared to your average.'
    },
    {
      id: 3,
      title: 'Recommendations',
      description: 'Generating personalized recommendations for cost savings',
      status: 'pending',
      details: 'How aggressive would you like your savings recommendations to be?',
      inputType: 'radio',
      options: [
        { id: 'conservative', label: 'Conservative (5-10% savings)' },
        { id: 'moderate', label: 'Moderate (10-15% savings)' },
        { id: 'aggressive', label: 'Aggressive (15-20% savings)' },
      ],
      result: 'Waiting for analysis to complete before generating recommendations.'
    },
    {
      id: 4,
      title: 'Implementation',
      description: 'Helping you implement recommended changes',
      status: 'pending',
      details: 'Enter your monthly savings goal below:',
      inputType: 'text',
      placeholder: 'e.g. $500',
      result: 'Ready to help you implement changes once recommendations are generated.'
    }
  ];

  return (
    <div className="flex flex-col space-y-6 pb-16">
      {/* Header section */}
      <section className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="mr-2" size={20} />
            <h1 className="text-lg font-semibold">{activeFlow.name} Process</h1>
          </div>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            activeFlow.status === 'processing' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
              : activeFlow.status === 'completed'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}>
            {activeFlow.status === 'processing' ? 'In Progress' : 
             activeFlow.status === 'completed' ? 'Completed' : 'Queued'}
          </span>
        </div>
      </section>

      {/* Steps section */}
      <div className="space-y-6">
        {flowSteps.map((step, index) => (
          <div 
            key={step.id}
            className="rounded-lg bg-white shadow-sm dark:bg-gray-900 overflow-hidden"
          >
            {/* Step header */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step.status === 'completed' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                    : step.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle2 size={18} />
                  ) : step.status === 'in-progress' ? (
                    <Clock size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step content */}
            <div className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {step.details}
              </p>
              
              {/* Input controls based on type */}
              <div className="mb-6">
                {step.inputType === 'checkbox' && (
                  <div className="space-y-2">
                    {step.options?.map(option => (
                      <label key={option.id} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={option.id} 
                          defaultChecked={option.defaultChecked}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
                
                {step.inputType === 'dropdown' && (
                  <div className="relative">
                    <select 
                      className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      defaultValue="all"
                    >
                      {step.options?.map(option => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                )}
                
                {step.inputType === 'radio' && (
                  <div className="space-y-2">
                    {step.options?.map((option, i) => (
                      <label key={option.id} className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id={option.id} 
                          name={`step-${step.id}-radio`}
                          defaultChecked={i === 1} // Default to moderate
                          className="border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
                
                {step.inputType === 'text' && (
                  <input 
                    type="text" 
                    placeholder={step.placeholder} 
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                )}
              </div>
              
              {/* Results area */}
              <div className="mb-4 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-1">Results</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {step.result}
                </p>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button className="flex items-center rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700">
                  <Undo2 size={14} className="mr-1" /> Undo
                </button>
                <button className="flex items-center rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700">
                  <Redo2 size={14} className="mr-1" /> Redo
                </button>
                <button className="flex items-center rounded-md bg-white px-3 py-1.5 text-xs font-medium text-purple-700 shadow-sm ring-1 ring-inset ring-purple-300 hover:bg-purple-50 dark:bg-gray-800 dark:text-purple-300 dark:ring-purple-900/20 dark:hover:bg-purple-900/20">
                  <Save size={14} className="mr-1" /> Save
                </button>
                <button
                  onClick={() => setChatDrawerOpen(true)}
                  className="flex items-center rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
                >
                  <MessageCircle size={14} className="mr-1" /> Discuss with AI
                </button>
                <button className="flex items-center rounded-md bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 shadow-sm ring-1 ring-inset ring-purple-300 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:ring-purple-900/30 dark:hover:bg-purple-900/30">
                  <Sparkles size={14} className="mr-1" /> Let AI Decide
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowDetailPage; 