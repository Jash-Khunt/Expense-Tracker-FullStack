import React, { useEffect } from "react";
import Chart from "../components/Chart";
import { useAuthStore } from "../store/useAuthStore";

const Dashboard = () => {
  const {
    IncomeData,
    ExpenseData,
    fetchIncome,
    fetchExpense,
    authUser,
    isCheckingAuth,
  } = useAuthStore();

  // Fetch data on component mount
  useEffect(() => {
    if (authUser && !isCheckingAuth) {
      fetchIncome();
      fetchExpense();
    }
  }, [authUser, isCheckingAuth, fetchIncome, fetchExpense]);

  // Calculate totals
  const totalIncome = IncomeData.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );
  const totalExpense = ExpenseData.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );
  const totalBalance = totalIncome - totalExpense;
  const balanceColor = totalBalance < 0 ? "text-red-500" : "text-green-500";

  return (
    <div className="container mx-auto p-4">
      <Chart IncomeData={IncomeData} ExpenseData={ExpenseData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="font-bold text-xl">Total Income</h2>
          <p className="text-green-500 text-3xl font-bold mt-2">
            ${totalIncome.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="font-bold text-xl">Total Expense</h2>
          <p className="text-red-500 text-3xl font-bold mt-2">
            ${totalExpense.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow text-center mt-8">
        <h2 className="font-bold text-2xl underline mb-4">Total Balance</h2>
        <p className={`font-bold text-5xl ${balanceColor}`}>
          ${totalBalance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
