const express = require("express");
const routes = require("./app/routes");
const cors = require("cors");
const globalErrorHandler = require("./app/middlewares/globalErrorHandler");

const app = express();

app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("You can create ToDo here!");
});

// Application routes
app.use("/api/v1", routes);

// global error handler
app.use(globalErrorHandler);

// Handle not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [{ path: req.originalUrl, message: "API Not Found" }],
  });
});

module.exports = app;
