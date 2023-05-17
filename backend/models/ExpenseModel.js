const mongoose = require("mongoose");
const expenseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
