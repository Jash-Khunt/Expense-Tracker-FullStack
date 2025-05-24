import Income from "../models/income.model.js";

export const addIncome = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, amount, category, description, date } = req.body;
    const parsedAmount = Number(amount);

    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be positive" });
    }

    const newIncome = new Income({
      userId,
      title,
      amount,
      category,
      description,
      date,
    });
    await newIncome.save();

    res.status(200).json(newIncome);
  } catch (error) {
    console.log("Error in addIncome Controller : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const income = await Income.findByIdAndDelete(userId);

    if (!income) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted", income });
  } catch (error) {
    console.log("Error in deleteIncome Controller : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getIncome = async (req, res) => {
  try {
    const userId = req.user._id;
    const income = await Income.find({ userId: userId });

    res.status(200).json(income);
  } catch (error) {
    console.log("Error in getIncome Controller : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { title, amount, category, description, date } = req.body;

    const incomeUpdate = await Income.findById(userId);
    if (!incomeUpdate) {
      return res.status(404).json({ message: "Income not found" });
    }

    if (amount !== undefined) {
      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be a positive number",
        });
      }
      incomeUpdate.amount = parsedAmount;
    }

    incomeUpdate.title = title || incomeUpdate.title;
    incomeUpdate.category = category || incomeUpdate.category;
    incomeUpdate.description = description || incomeUpdate.description;
    incomeUpdate.date = date || incomeUpdate.date;

    await incomeUpdate.save();

    res.status(200).json({ message: "Income Updated", data: incomeUpdate });
  } catch (error) {
    console.log("Error in updateIncome Controller : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
