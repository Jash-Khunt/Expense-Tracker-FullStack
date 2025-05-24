import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";
export const useAuthStore = create((set) => ({
  ExpenseData: [],
  IncomeData: [],
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in Check Auth : ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  handleSignUp: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  handleLogin: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  fetchIncome: async () => {
    try {
      const res = await axiosInstance.get("/auth/get-income");
      set({ IncomeData: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  fetchExpense: async () => {
    try {
      const res = await axiosInstance.get("/auth/get-expense");
      set({ ExpenseData: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  addIncome: async (income) => {
    try {
      const res = await axiosInstance.post("/auth/add-income", income);
      set((state) => ({
        IncomeData: [...state.IncomeData, res.data],
      }));
      toast.success("Income added successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  addExpense: async (expense) => {
    try {
      const res = await axiosInstance.post("/auth/add-expense", expense);
      set((state) => ({
        ExpenseData: [...state.ExpenseData, res.data],
      }));
      toast.success("Expense added successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  deleteExpense: async (id) => {
    try {
      await axiosInstance.delete(`/auth/delete-expense/${id}`);
      set((state) => ({
        ExpenseData: state.ExpenseData.filter((e) => e._id !== id),
      }));
      toast.success("Expense deleted!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting expense");
    }
  },
  deleteIncome: async (id) => {
    try {
      await axiosInstance.delete(`/auth/delete-income/${id}`);
      set((state) => ({
        IncomeData: state.IncomeData.filter((e) => e._id !== id),
      }));
      toast.success("Income deleted!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting income");
    }
  },
  updateExpense: async (id, updatedData) => {
    try {
      const res = await axiosInstance.put(
        `/auth/update-expense/${id}`,
        updatedData
      );
      set((state) => ({
        ExpenseData: state.ExpenseData.map((e) =>
          e._id === id ? res.data.data : e
        ),
      }));
      toast.success("Expense updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating expense");
    }
  },
  updateIncome: async (id, updatedData) => {
    try {
      const res = await axiosInstance.put(
        `/auth/update-income/${id}`,
        updatedData
      );
      set((state) => ({
        IncomeData: state.IncomeData.map((e) =>
          e._id === id ? res.data.data : e
        ),
      }));
      toast.success("Income updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating income");
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, ExpenseData: [], IncomeData: [] });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
