const mongoose = require("mongoose");
const expenseSchema = mongoose.Schema({
  title: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
