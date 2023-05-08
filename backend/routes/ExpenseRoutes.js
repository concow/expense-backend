// Each resource in our API will have its own route file.
//commonJS syntax below

const express = require("express");
const router = express.Router();
const {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/ExpenseController");

router.route("/").get(getExpenses).post(setExpense);
router.route("/:id").put(updateExpense).delete(deleteExpense);

// router.put("/:id", updateExpense);
// router.delete("/:id", deleteExpense);
// router.get("/", getExpenses);
// router.post("/", setExpense);

module.exports = router;
