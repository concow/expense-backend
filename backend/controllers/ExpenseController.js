const asyncHandler = require("express-async-handler");
const Expense = require("../models/ExpenseModel");
//@description  Get Expenses
//@route    GET /api/expenses
//@access   Private
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find();
  res.status(200).json(expenses);
});

//@description  Set Expenses
//@route    POST /api/expenses
//@access   Private
const setExpense = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title");
  }
  const expense = await Expense.create({
    title: req.body.title,
    amount: req.body.amount,
  });
  res.status(200).json(expense);
});

//@description  Update Expense
//@route    PUT /api/expenses/:id
//@access   Private
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    res.status(400);
    throw new Error("Expense not found");
  }
  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedExpense);
});

//@description  Delete Expense
//@route    DELETE /api/expenses/:id
//@access   Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    res.status(400);
    throw new Error("Expense not found");
  }
  await expense.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
};
