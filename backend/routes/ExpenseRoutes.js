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

const { protect } = require("../middleware/AuthMiddleware");

router.route("/").get(protect, getExpenses).post(protect, setExpense);
router.route("/:id").put(protect, updateExpense).delete(protect, deleteExpense);

// router.put("/:id", updateExpense);
// router.delete("/:id", deleteExpense);
// router.get("/", getExpenses);
// router.post("/", setExpense);

module.exports = router;
