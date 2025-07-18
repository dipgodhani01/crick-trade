require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { port, uri } = require("./config");

const userAuthRouter = require("./routes/client/user");
const cookieParser = require("cookie-parser");

const app = express();

mongoose
  .connect(uri)
  .then(() => console.log("successfully connected to database"))
  .catch((err) => console.log("Error : ", err));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", userAuthRouter);

app.listen(port, () => console.log(`Server up at port ${port}`));
