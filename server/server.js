require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { port, uri } = require("./config");
const { logger } = require("./utils");
const userAuthRouter = require('./routes/client/user');

const app = express();


mongoose
  .connect(uri)
  .then(() => logger.info("successfully connected to database"))
  .catch((err) => {
    logger.error("Error", {
      message: err?.message || "No error message",
      stack: err?.stack,
      fullError: err,
    });
  });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use('/api/auth',userAuthRouter)

app.listen(port, () => logger.info(`Server up at port ${port}`));
