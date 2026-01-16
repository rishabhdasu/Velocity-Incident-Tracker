require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");

const app = express();

app.use(express.json());

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Velocity is running" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
