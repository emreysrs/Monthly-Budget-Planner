import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Receipt, PiggyBank, Calendar, Save } from 'lucide-react';

function App() {
  // Get month and year from LocalStorage
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const saved = localStorage.getItem('selectedMonth');
    return saved || 'September';
  });
  
  const [selectedYear, setSelectedYear] = useState(() => {
    const saved = localStorage.getItem('selectedYear');
    return saved || '2024';
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = ['2024', '2025', '2026', '2027', '2028'];

  // Default budget data
  const defaultBudgetData = {
    income: {
      planned: 16500.00,
      items: [
        { id: 1, name: 'Paycheck 1', planned: 8000.00, actual: 8000.00, checked: true },
        { id: 2, name: 'Paycheck 2', planned: 8000.00, actual: 8000.00, checked: true },
        { id: 3, name: 'Other Income', planned: 500.00, actual: 500.00, checked: true },
      ]
    },
    expenses: {
      items: [
        { id: 1, name: 'Eating out', planned: 700.00, actual: 700.00, checked: true },
        { id: 2, name: 'Groceries', planned: 600.00, actual: 600.00, checked: true },
        { id: 3, name: 'Gas/Rides/Parking', planned: 350.00, actual: 350.00, checked: true },
        { id: 4, name: 'Entertainment', planned: 400.00, actual: 400.00, checked: true },
        { id: 5, name: 'Pet Supply', planned: 150.00, actual: 150.00, checked: true },
        { id: 6, name: 'Clothing', planned: 300.00, actual: 300.00, checked: true },
      ]
    },
    bills: {
      items: [
        { id: 1, name: 'Electricity', planned: 150.00, actual: 140.00, checked: true },
        { id: 2, name: 'Internet', planned: 80.00, actual: 80.00, checked: true },
        { id: 3, name: 'Water', planned: 60.00, actual: 55.00, checked: true },
        { id: 4, name: 'Cell Phone/Insurance', planned: 120.00, actual: 120.00, checked: true },
        { id: 5, name: 'Rent', planned: 1200.00, actual: 1200.00, checked: true },
        { id: 6, name: 'Car Insurance', planned: 250.00, actual: 250.00, checked: true },
      ]
    },
    savings: {
      items: [
        { id: 1, name: 'Emergency Fund', planned: 1500.00, actual: 1500.00, checked: true },
        { id: 2, name: 'Retirement acc.', planned: 2000.00, actual: 2000.00, checked: true },
        { id: 3, name: 'Investment acc.', planned: 1500.00, actual: 1500.00, checked: true },
        { id: 4, name: 'Christmas/shopping', planned: 500.00, actual: 500.00, checked: true },
        { id: 5, name: 'Checking acc.', planned: 595.00, actual: 595.00, checked: true },
      ]
    }
  };

  // Get budget data from LocalStorage
  const [budgetData, setBudgetData] = useState(() => {
    const saved = localStorage.getItem('budgetData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved data:', e);
        return defaultBudgetData;
      }
    }
    return defaultBudgetData;
  });

  // Save to LocalStorage when data changes
  useEffect(() => {
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
  }, [budgetData]);

  // Save month and year to LocalStorage when changed
  useEffect(() => {
    localStorage.setItem('selectedMonth', selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    localStorage.setItem('selectedYear', selectedYear);
  }, [selectedYear]);

  // Reset all data
  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone!')) {
      setBudgetData(defaultBudgetData);
      setSelectedMonth('September');
      setSelectedYear('2024');
      localStorage.clear();
      alert('Data has been successfully reset!');
    }
  };

  // Calculate totals
  const totals = useMemo(() => {
    const totalIncome = budgetData.income.items.reduce((sum, item) => sum + (item.checked ? item.actual : 0), 0);
    const totalExpenses = budgetData.expenses.items.reduce((sum, item) => sum + (item.checked ? item.actual : 0), 0);
    const totalBills = budgetData.bills.items.reduce((sum, item) => sum + (item.checked ? item.actual : 0), 0);
    const totalSavings = budgetData.savings.items.reduce((sum, item) => sum + (item.checked ? item.actual : 0), 0);
    
    const totalSpent = totalExpenses + totalBills + totalSavings;
    const amountLeft = totalIncome - totalSpent;
    
    return {
      income: totalIncome,
      expenses: totalExpenses,
      bills: totalBills,
      savings: totalSavings,
      totalSpent,
      amountLeft
    };
  }, [budgetData]);

  const updateActual = (category, itemId, value) => {
    setBudgetData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: prev[category].items.map(item =>
          item.id === itemId ? { ...item, actual: parseFloat(value) || 0 } : item
        )
      }
    }));
  };

  const updatePlanned = (category, itemId, value) => {
    setBudgetData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: prev[category].items.map(item =>
          item.id === itemId ? { ...item, planned: parseFloat(value) || 0 } : item
        )
      }
    }));
  };

  const updateName = (category, itemId, value) => {
    setBudgetData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: prev[category].items.map(item =>
          item.id === itemId ? { ...item, name: value } : item
        )
      }
    }));
  };

  const toggleChecked = (category, itemId) => {
    setBudgetData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: prev[category].items.map(item =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      }
    }));
  };

  // Summary Card Component
  const SummaryCard = ({ title, amount, bgColor, icon: Icon }) => (
    <div className={`${bgColor} rounded-lg p-6 shadow-sm border border-gray-200`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-700">{title}</h3>
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <p className="text-2xl font-bold text-gray-800">${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    </div>
  );

  // Budget Table Component
  const BudgetTable = ({ title, items, category, bgColor, headerBg }) => {
    const totalPlanned = items.reduce((sum, item) => sum + item.planned, 0);
    const totalActual = items.reduce((sum, item) => sum + (item.checked ? item.actual : 0), 0);
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className={`${bgColor} px-4 py-3 border-b border-gray-300`}>
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-700">{title}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${headerBg} text-xs font-semibold text-gray-700 border-b border-gray-300`}>
                <th className="px-3 py-2 text-center w-12"></th>
                <th className="px-3 py-2 text-left">ITEM</th>
                <th className="px-3 py-2 text-right">PLANNED</th>
                <th className="px-3 py-2 text-right">ACTUAL</th>
                <th className="px-3 py-2 text-right">PROGRESS</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const progress = item.planned > 0 ? Math.min((item.actual / item.planned) * 100, 100) : 0;
                const difference = item.planned - item.actual;
                
                return (
                  <tr key={item.id} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleChecked(category, item.id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateName(category, item.id, e.target.value)}
                        className="w-full text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <input
                        type="number"
                        value={item.planned}
                        onChange={(e) => updatePlanned(category, item.id, e.target.value)}
                        className="w-full text-right text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <input
                        type="number"
                        value={item.actual}
                        onChange={(e) => updateActual(category, item.id, e.target.value)}
                        className="w-full text-right text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2 text-right text-sm">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`font-medium ${progress >= 100 ? 'text-green-600' : 'text-gray-700'}`}>
                          {progress.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-semibold border-t-2 border-gray-400">
                <td className="px-3 py-3"></td>
                <td className="px-3 py-3 text-sm text-gray-800">TOTAL</td>
                <td className="px-3 py-3 text-right text-sm text-gray-800">
                  ${totalPlanned.toFixed(2)}
                </td>
                <td className="px-3 py-3 text-right text-sm text-gray-800">
                  ${totalActual.toFixed(2)}
                </td>
                <td className="px-3 py-3 text-right text-sm text-gray-800">
                  {totalPlanned > 0 ? ((totalActual / totalPlanned) * 100).toFixed(1) : 0}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Donut Chart Component
  const AmountLeftChart = () => {
    const chartData = [
      { name: 'Spent', value: totals.totalSpent, color: '#b4a7d6' },
      { name: 'Remaining', value: Math.max(totals.amountLeft, 0), color: '#d5a6bd' }
    ];

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="bg-[#dae3f3] px-4 py-3 -mx-6 -mt-6 mb-6 rounded-t-lg border-b border-gray-300">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-700">AMOUNT LEFT TO SPEND</h3>
        </div>
        <div className="relative h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">
                ${Math.max(totals.amountLeft, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500 mt-1">remaining</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-[#b4a7d6]"></div>
            <span className="text-xs text-gray-600">Spent: ${totals.totalSpent.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-[#d5a6bd]"></div>
            <span className="text-xs text-gray-600">Remaining: ${Math.max(totals.amountLeft, 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Monthly Budget Dashboard</h1>
            <button
              onClick={resetData}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
              Reset Data
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700 font-medium"
            >
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700 font-medium"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="ml-4 flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
              <Save className="w-4 h-4 text-green-600" />
              <span>Auto-saving</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SummaryCard
            title="I N C O M E"
            amount={totals.income}
            bgColor="bg-[#dae3f3]"
            icon={DollarSign}
          />
          <SummaryCard
            title="E X P E N S E S"
            amount={totals.expenses}
            bgColor="bg-[#dae3f3]"
            icon={TrendingUp}
          />
          <SummaryCard
            title="B I L L S"
            amount={totals.bills}
            bgColor="bg-[#dae3f3]"
            icon={Receipt}
          />
          <SummaryCard
            title="S A V I N G S"
            amount={totals.savings}
            bgColor="bg-[#dae3f3]"
            icon={PiggyBank}
          />
        </div>

        {/* Chart */}
        <div className="mb-8">
          <AmountLeftChart />
        </div>

        {/* Income Table */}
        <div className="mb-8">
          <BudgetTable
            title="I N C O M E"
            items={budgetData.income.items}
            category="income"
            bgColor="bg-[#dae3f3]"
            headerBg="bg-[#c5d9f1]"
          />
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Expenses Table */}
          <BudgetTable
            title="E X P E N S E S"
            items={budgetData.expenses.items}
            category="expenses"
            bgColor="bg-[#dae3f3]"
            headerBg="bg-[#c5d9f1]"
          />

          {/* Bills Table */}
          <BudgetTable
            title="B I L L S"
            items={budgetData.bills.items}
            category="bills"
            bgColor="bg-[#fff2cc]"
            headerBg="bg-[#ffe699]"
          />
        </div>

        {/* Savings Table */}
        <div className="mb-8">
          <BudgetTable
            title="S A V I N G S"
            items={budgetData.savings.items}
            category="savings"
            bgColor="bg-[#dae3f3]"
            headerBg="bg-[#c5d9f1]"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
