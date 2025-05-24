import express from "express";
import { signup, login, checkAuth, logout } from "../controllers/auth.controller.js";
import {
  addIncome,
  deleteIncome,
  getIncome,
  updateIncome,
} from "../controllers/income.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  addExpense,
  deleteExpense,
  getExpense,
  updateExpense,
} from "../controllers/expense.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/add-income", protectRoute, addIncome);
router.put("/update-income/:id", protectRoute, updateIncome);
router.delete("/delete-income/:id", protectRoute, deleteIncome);
router.get("/get-income", protectRoute, getIncome);

router.post("/add-expense", protectRoute, addExpense);
router.put("/update-expense/:id", protectRoute, updateExpense);
router.delete("/delete-expense/:id", protectRoute, deleteExpense);
router.get("/get-expense", protectRoute, getExpense);

router.get("/check", protectRoute, checkAuth);

export default router;
