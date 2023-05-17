const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/ErrorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;

connectDB();

const app = express();

//adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/expenses", require("./routes/ExpenseRoutes"));
app.use("/api/users", require("./routes/UserRoutes"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
