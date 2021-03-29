/* eslint-disable no-console */
/* eslint-disable quotes */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require("./middleware/error-handler");
const userRouter = require("./user/user-router");
const authRouter = require("./auth/auth-router");
const poemRouter = require("./poem/poem-router");
const libraryRouter = require("./library/library-router");
const collaborationRouter = require("./collaboration/collaboration-router");

const app = express();
app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);

app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/poem", poemRouter);
app.use("/api/library", libraryRouter);
app.use("/api/collaboration", collaborationRouter);
app.use(errorHandler);

module.exports = app;
