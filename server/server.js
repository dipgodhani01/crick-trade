require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { port, uri } = require("./config");
const { logger } = require("./utils");

const app = express();

mongoose
  .connect(uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => logger.info("successfully connected to database"))
  .catch((err) => logger.error(err));

app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());


app.listen(port, () => logger.info(`Server up at port ${port}`));
