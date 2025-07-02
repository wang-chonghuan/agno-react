import React from 'react';
import { DollarSign, TrendingUp, CreditCard, BarChart2, Brain } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MoneyPage: React.FC = () => {
  const chartData = [
    { date: 'Mar 1', balance: 2400 },
    { date: 'Mar 5', balance: 2800 },
    { date: 'Mar 10', balance: 2600 },
    { date: 'Mar 15', balance: 3200 },
    { date: 'Mar 20', balance: 3100 },
    { date: 'Mar 25', balance: 3400 },
    { date: 'Mar 30', balance: 3800 },
  ];

  const notableTransactions = [
    { id: 1, title: 'Largest Expense', description: 'Monthly Rent Payment', amount: -1200, date: 'Mar 15' },
    { id: 2, title: 'Unusual Activity', description: 'Multiple Coffee Purchases', amount: -42.50, date: 'Mar 18' },
    { id: 3, title: 'Recurring Payment', description: 'Netflix Subscription', amount: -15.99, date: 'Mar 20' },
  ];

  const categories = [
    { id: 1, name: 'Housing', amount: 1200, percentage: 40, color: 'bg-blue-500' },
    { id: 2, name: 'Food', amount: 600, percentage: 20, color: 'bg-green-500' },
    { id: 3, name: 'Transportation', amount: 450, percentage: 15, color: 'bg-yellow-500' },
    { id: 4, name: 'Entertainment', amount: 300, percentage: 10, color: 'bg-purple-500' },
    { id: 5, name: 'Others', amount: 450, percentage: 15, color: 'bg-gray-500' },
  ];

  const insights = [
    { id: 1, title: 'Spending Optimization', description: 'You could save $200 monthly by reducing food delivery expenses.' },
    { id: 2, title: 'Investment Opportunity', description: 'Based on your savings rate, you can invest an additional $300 monthly.' },
  ];

  return (
    <div className="space-y-6 pb-16">
      <section className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center">
          <DollarSign className="mr-2" size={24} />
          <h1 className="text-xl font-semibold">Financial Overview</h1>
        </div>
        <p className="mt-2 text-purple-100">Track your money flow and spending patterns</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="lg:col-span-2 rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white">
            <BarChart2 className="mr-2" size={20} />
            Balance Trend
          </h2>
          <div className="mt-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="balance" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white">
            <CreditCard className="mr-2" size={20} />
            Notable Transactions
          </h2>
          <div className="mt-4 space-y-4">
            {notableTransactions.map(transaction => (
              <div 
                key={transaction.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{transaction.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.description}</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
                  </div>
                  <span className={`font-medium ${
                    transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white">
            <TrendingUp className="mr-2" size={20} />
            Spending Categories
          </h2>
          <div className="mt-4 space-y-4">
            {categories.map(category => (
              <div key={category.id}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">${category.amount}</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{category.percentage}% of total</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white">
            <Brain className="mr-2" size={20} />
            AI Financial Insights
          </h2>
          <div className="mt-4 space-y-4">
            {insights.map(insight => (
              <div 
                key={insight.id}
                className="rounded-lg border border-purple-100 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-900/20"
              >
                <h3 className="font-medium text-purple-800 dark:text-purple-300">{insight.title}</h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{insight.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MoneyPage;