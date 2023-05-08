const asyncHandler = require("express-async-handler");

//@description  Get Expenses
//@route    GET /api/expenses
//@access   Private
const getExpenses = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Expenses" });
});

//@description  Set Expenses
//@route    POST /api/expenses
//@access   Private
const setExpense = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Set Expense" });
});

//@description  Update Expense
//@route    PUT /api/expenses/:id
//@access   Private
const updateExpense = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update expense ${req.params.id}` });
});

//@description  Delete Expense
//@route    DELETE /api/expenses/:id
//@access   Private
const deleteExpense = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete expense ${req.params.id}` });
});

module.exports = {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
};
