import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { FiTrash2, FiEdit } from "react-icons/fi";

const IncomeTransactions = () => {
  const { IncomeData, deleteIncome, updateIncome } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIncome, setCurrentIncome] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleDelete = async (id) => {
    try {
      await deleteIncome(id);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (income) => {
    setCurrentIncome(income);
    setFormData({
      title: income.title,
      amount: income.amount,
      category: income.category,
      date: income.date.split("T")[0], // Format date for input field
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateIncome(currentIncome._id, formData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="max-w-full p-4 mt-14">
      <h1 className="text-3xl font-semibold mb-6 text-start">
        Income Transactions
      </h1>

      <div className="overflow-x-auto pr-8">
        <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {IncomeData.map((transaction) => (
              <tr
                key={transaction._id}
                className="border-b last:border-none hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">{transaction.title}</td>
                <td className="p-4">{transaction.category}</td>
                <td className="p-4">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="p-4 text-left text-green-500 font-semibold">
                  ${transaction.amount}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    aria-label="Edit income"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Delete income"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Income</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeTransactions;
