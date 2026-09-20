const express = require("express");
const errorHandler = require("./middleware/error.middleware");
const app = express();

app.use(express.json())

// route



//// error handler
app.use(errorHandler);

module.exports = app;