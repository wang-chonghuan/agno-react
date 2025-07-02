import React from 'react';
import { Calendar, Bell } from 'lucide-react';

const TodayPage: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const businessNews = [
    {
      id: 1,
      title: 'New Partnership Opportunity',
      description: 'Local business alliance seeking collaboration in tech sector',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Industry Networking Event',
      description: 'Tech meetup happening next week in downtown area',
      image: 'https://images.pexels.com/photos/2962135/pexels-photo-2962135.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '4 hours ago'
    },
    {
      id: 3,
      title: 'Market Trend Alert',
      description: 'Growing demand in sustainable tech solutions',
      image: 'https://images.pexels.com/photos/7567473/pexels-photo-7567473.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '6 hours ago'
    }
  ];

  return (
    <div className="space-y-6 pb-16">
      <section className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center">
          <Calendar className="mr-2" size={20} />
          <h1 className="text-lg font-semibold">{formattedDate}</h1>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {businessNews.map(news => (
          <div 
            key={news.id}
            className="overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-gray-900"
          >
            <div className="relative h-48 w-full">
              <img 
                src={news.image} 
                alt={news.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{news.title}</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">{news.description}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Bell size={14} className="mr-1" />
                <span>{news.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayPage