import Expense from "../models/expense.model.js";

export const addExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, amount, category, description, date } = req.body;
    const parsedAmount = Number(amount);

    if (!title || !category || !description || !date || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be positive" });
    }

    const newExpense = new Expense({
      userId,
      title,
      amount: parsedAmount,
      category,
      description,
      date,
    });
    await newExpense.save();

    res.status(200).json(newExpense);
  } catch (error) {
    console.log("Error in addExpense Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id: expenseId } = req.params;

    const expense = await Expense.findByIdAndDelete(expenseId);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted", expense });
  } catch (error) {
    console.log("Error in deleteExpense Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const expense = await Expense.find({ userId });

    res.status(200).json(expense);
  } catch (error) {
    console.log("Error in getExpense Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id: expenseId } = req.params;
    const { title, amount, category, description, date } = req.body;

    const expenseUpdate = await Expense.findById(expenseId);
    if (!expenseUpdate) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (amount !== undefined) {
      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be a positive number",
        });
      }
      expenseUpdate.amount = parsedAmount;
    }

    expenseUpdate.title = title || expenseUpdate.title;
    expenseUpdate.category = category || expenseUpdate.category;
    expenseUpdate.description = description || expenseUpdate.description;
    expenseUpdate.date = date || expenseUpdate.date;

    await expenseUpdate.save();

    res.status(200).json({ message: "Expense Updated", data: expenseUpdate });
  } catch (error) {
    console.log("Error in updateExpense Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
