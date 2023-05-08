const express = require("express");
const dotenv = require("dotenv").config;
const { errorHandler } = require("./middleware/ErrorMiddleware");
const port = process.env.PORT || 8000;

const app = express();

//adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/expenses", require("./routes/ExpenseRoutes"));
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
