require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
const assetRoutes = require("./routes/assetRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/v1/assets", assetRoutes);
app.use("/api/v1/incidents", incidentRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Server started" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
