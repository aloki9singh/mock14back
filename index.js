const express = require("express");
const { connection } = require("./config/db");
const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Welcome to Bug App");
});

app.listen(process.env.PORT, async (req, res) => {
    try {
      await connection;
      console.log("Server Connected to database");
    } catch (err) {
      console.log({ err: err });
    }
    console.log(`Server Running On Port ${process.env.PORT}`);
  });
  