const asyncHandler = require("express-async-handler");
const Expense = require("../models/ExpenseModel");
const User = require("../models/UserModel");

//@description  Get Expenses
//@route    GET /api/expenses
//@access   Private
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
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
    user: req.user.id,
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
  const user = await User.findById(req.user.id);

  //Check for User
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //Make sure logged in User matches the expense User
  if (expense.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
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
  //Not reaching this when put in dummy ID - gotta fix

  const user = await User.findById(req.user.id);

  //Check for User
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //Make sure logged in User matches the expense User
  if (expense.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  try {
    await expense.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Expense not found" });
  }
});

//   if (!expense) {
//     res.status(400);
//     throw new Error("Expense not found");
//   }
//   await expense.deleteOne();
//   res.status(200).json({ id: req.params.id });
// });

module.exports = {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
};
