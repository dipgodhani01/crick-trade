require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { port, uri } = require("./config");

const userAuthRouter = require("./routes/client/user");
const auctionRouter = require("./routes/client/auction");

const app = express();

mongoose
  .connect(uri)
  .then(() => console.log("successfully connected to database"))
  .catch((err) => console.log("Error : ", err));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", userAuthRouter);
app.use("/api/auction", auctionRouter);

app.listen(port, () => console.log(`Server up at port ${port}`));
