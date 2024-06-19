require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookiesParser = require("cookie-parser");
const path = require("path");
const app = express();

app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 9000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const connectDB = require("./config/dbConfig");
connectDB();

app.use("/", require("./routes/index"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "./client/build/index.html",
        "client",
        "build",
        "index.html"
      )
    );
  });
}

//SERVER LISTENING
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`server running on:${PORT}`);
  }
});
