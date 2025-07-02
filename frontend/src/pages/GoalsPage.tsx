import React from 'react';
import { Target, Play, Clock, Award } from 'lucide-react';

const GoalsPage: React.FC = () => {
  const videoLessons = [
    {
      id: 1,
      title: 'Understanding Investment Basics',
      duration: '5:30',
      thumbnail: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Investing'
    },
    {
      id: 2,
      title: 'Budgeting for Beginners',
      duration: '4:45',
      thumbnail: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Budgeting'
    },
    {
      id: 3,
      title: 'Emergency Fund Essentials',
      duration: '6:15',
      thumbnail: 'https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Savings'
    },
    {
      id: 4,
      title: 'Debt Management Strategies',
      duration: '7:20',
      thumbnail: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Debt'
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'investing', name: 'Investing' },
    { id: 'budgeting', name: 'Budgeting' },
    { id: 'savings', name: 'Savings' },
    { id: 'debt', name: 'Debt' }
  ];

  return (
    <div className="space-y-8 pb-16">
      <section className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white shadow-lg">
        <div className="flex items-center">
          <Target className="mr-2" size={24} />
          <h1 className="text-xl font-semibold">Financial Education</h1>
        </div>
        <p className="mt-2 text-purple-100">Learn from expert-curated video lessons</p>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
            <h3 className="font-medium">Completed</h3>
            <p className="mt-1 text-2xl font-bold">12</p>
          </div>
          <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
            <h3 className="font-medium">Hours Learned</h3>
            <p className="mt-1 text-2xl font-bold">4.5</p>
          </div>
        </div>
      </section>

      <div className="overflow-x-auto">
        <div className="flex space-x-2 pb-4">
          {categories.map(category => (
            <button
              key={category.id}
              className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-purple-50 hover:text-purple-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20 dark:hover:text-purple-300"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {videoLessons.map(lesson => (
          <div 
            key={lesson.id}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-gray-900"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <img 
                src={lesson.thumbnail} 
                alt={lesson.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-purple-600 transition-transform hover:scale-110 dark:bg-gray-800 dark:text-purple-400">
                    <Play size={24} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                  {lesson.category}
                </span>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={14} className="mr-1" />
                  {lesson.duration}
                </div>
              </div>
              
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                {lesson.title}
              </h3>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Award size={16} className="text-yellow-500" />
                  <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                    Earn Certificate
                  </span>
                </div>
                <button className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center font-medium text-gray-500 transition-colors hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-400">
        Load More Lessons
      </button>
    </div>
  );
};

export default GoalsPage;