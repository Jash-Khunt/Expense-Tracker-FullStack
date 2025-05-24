import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import History from "./components/History.jsx";
import Expenses from "./pages/Expenses.jsx";
import Income from "./pages/Income.jsx";
import IncomeTransactions from "./pages/IncomeTransactions.jsx";
import ExpenseTransactions from "./pages/ExpenseTransactions.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ViewTransactions from "./pages/ViewTransactions.jsx";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, fetchIncome, fetchExpense, isCheckingAuth } =
    useAuthStore();
  const location = useLocation();

  const hideMainLayout = [
    "/login",
    "/signup",
    "/view-transaction",
    "/add-income",
    "/add-expense",
    "/income-transactions",
    "/expense-transactions",
  ].includes(location.pathname);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && authUser) {
      fetchIncome();
      fetchExpense();
    }
  }, [isCheckingAuth, authUser]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-row">
      <Sidebar />
      <ToastContainer />
      {!hideMainLayout ? (
        <div className="flex flex-row w-full overflow-auto">
          <div className="flex-1 w-1/2">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
          <div className="flex-2 flex-col md:w-1/3 hidden lg:flex overflow-auto">
            <Routes>
              <Route path="/" element={<History />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="flex-1 max-h-screen w-full overflow-auto">
          <Routes>
            <Route path="/view-transaction" element={<ViewTransactions />} />
            <Route path="/add-income" element={<Income />} />
            <Route path="/add-expense" element={<Expenses />} />
            <Route
              path="/income-transactions"
              element={<IncomeTransactions />}
            />
            <Route
              path="/expense-transactions"
              element={<ExpenseTransactions />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
