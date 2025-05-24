import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  plugins,
} from "chart.js";
import { useAuthStore } from "../store/useAuthStore.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);
const History = () => {
  const { IncomeData, ExpenseData, authUser, isCheckingAuth } = useAuthStore();

  const parsePrice = (price) => {
    return typeof price === "number"
      ? price
      : parseFloat(price.replace(/[^0-9,-]+/g, ""));
  };

  const [minIncome, setMinIncome] = useState(0);
  const [maxIncome, setMaxIncome] = useState(0);
  const [minExpense, setMinExpense] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);

  useEffect(() => {
    if (authUser && !isCheckingAuth) {
      const incomePrices = IncomeData.map((item) => parseFloat(item.amount));
      const expensePrices = ExpenseData.map((item) => parseFloat(item.amount));

      setMinIncome(incomePrices.length ? Math.min(...incomePrices) : 0);
      setMaxIncome(incomePrices.length ? Math.max(...incomePrices) : 0);
      setMinExpense(expensePrices.length ? Math.min(...expensePrices) : 0);
      setMaxExpense(expensePrices.length ? Math.max(...expensePrices) : 0);
    }
  }, [IncomeData, ExpenseData, authUser, isCheckingAuth]);

  const chartData = {
    labels: [
      "Total Income",
      "Total Expense",
      "Min Income",
      "Max Income",
      "Min Expense",
      "Max Expense",
    ],
    datasets: [
      {
        data: [
          IncomeData.reduce((sum, item) => sum + parseFloat(item.amount), 0),
          ExpenseData.reduce((sum, item) => sum + parseFloat(item.amount), 0),
          minIncome,
          maxIncome,
          minExpense,
          maxExpense,
        ],
        backgroundColor: [
          "#36A2EB", // Total income
          "#FF6384", // Total expense
          "#4BC0C0", // Min income
          "#FFCE56", // Max income
          "#9966FF", // Min expense
          "#FF9F40", // Max expense
        ],

        hoverBackgroundColor: [
          "#66B3FF",
          "#FF6F91",
          "#70D8D8",
          "#FFD966",
          "#B38FFF",
          "#FFB673",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Income and Expense breakdown",
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="w-full hidden lg:block mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-2">
        Recent History
      </h1>

      {/* Wrap both lists in a side-by-side or stacked layout */}
      <div className="flex flex-col md:flex-row gap-4 h-72 mb-6">
        {/* Income List */}
        <div className="flex-1 overflow-y-auto space-y-2 bg-gray-50 p-2 rounded-lg shadow-inner">
          <h2 className="text-lg font-bold">Incomes</h2>
          {IncomeData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-white shadow-sm border border-gray-200"
            >
              <div className="flex flex-col">
                <h3 className="text-base font-medium text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">${item.amount}</p>
              </div>
              <div className="text-sm font-semibold text-green-500">
                +{item.amount}
              </div>
            </div>
          ))}
        </div>

        {/* Expense List */}
        <div className="flex-1 overflow-y-auto space-y-2 bg-gray-50 p-2 rounded-lg shadow-inner">
          <h2 className="text-lg font-bold">Expenses</h2>
          {ExpenseData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-white shadow-sm border border-gray-200"
            >
              <div className="flex flex-col">
                <h3 className="text-base font-medium text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">${item.amount}</p>
              </div>
              <div className="text-sm font-semibold text-red-500">
                -{item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pie Chart */}
      <div className="rounded-lg p-6 bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Spend Overview</h2>
        <div className="w-110 h-98 mx-auto">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default History;
